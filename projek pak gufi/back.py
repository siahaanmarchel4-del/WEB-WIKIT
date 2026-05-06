import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

DATA_FILE = Path(__file__).with_name('data.json')

SAMPLE_ARTICLES = [
    {
        'title': 'WikiIT',
        'slug': 'wikiit',
        'content': 'WikiIT adalah ensiklopedia bebas yang dikembangkan secara kolaboratif oleh sukarelawan dari seluruh dunia.',
    },
    {
        'title': 'Pemrograman',
        'slug': 'pemrograman',
        'content': 'Pemrograman adalah proses menulis serangkaian instruksi agar komputer dapat melakukan tugas tertentu.',
    },
]


def load_articles():
    if not DATA_FILE.exists():
        save_articles({article['slug']: article for article in SAMPLE_ARTICLES})
    try:
        with DATA_FILE.open('r', encoding='utf-8') as f:
            data = json.load(f)
            return {slug: article for slug, article in data.items()}
    except (json.JSONDecodeError, OSError):
        save_articles({article['slug']: article for article in SAMPLE_ARTICLES})
        return {article['slug']: article for article in SAMPLE_ARTICLES}


def save_articles(articles):
    with DATA_FILE.open('w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)


def slugify(text):
    slug = ''.join(ch.lower() if ch.isalnum() else '-' for ch in text)
    slug = '-'.join(part for part in slug.split('-') if part)
    return slug or 'artikel'


class WikipediaBackendHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _send_json(self, data, status=200):
        payload = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def _send_error(self, status, message):
        self._send_json({'error': message}, status=status)

    def _read_json_body(self):
        length = int(self.headers.get('Content-Length', 0))
        if length == 0:
            return None
        content = self.rfile.read(length).decode('utf-8')
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return None

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)
        articles = load_articles()

        if path == '/':
            html = (
                '<html><head><title>WikiIT Backend</title></head>'
                '<body><h1>WikiIT Backend</h1>'
                '<p>Gunakan API di <code>/api/articles</code> dan <code>/api/search?q=...</code>.</p>'
                '</body></html>'
            ).encode('utf-8')
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(html)))
            self.end_headers()
            self.wfile.write(html)
            return

        if path == '/api/articles':
            q = query.get('q', [''])[0].strip().lower()
            items = list(articles.values())
            if q:
                items = [article for article in items if q in article['title'].lower() or q in article['content'].lower()]
            self._send_json({'articles': items})
            return

        if path.startswith('/api/articles/'):
            slug = unquote(path[len('/api/articles/'):])
            article = articles.get(slug)
            if not article:
                self._send_error(404, 'Artikel tidak ditemukan')
                return
            self._send_json(article)
            return

        if path == '/api/search':
            q = query.get('q', [''])[0].strip().lower()
            if not q:
                self._send_error(400, 'Parameter query diperlukan')
                return
            results = [article for article in articles.values() if q in article['title'].lower() or q in article['content'].lower()]
            self._send_json({'query': q, 'results': results})
            return

        self._send_error(404, 'Rute tidak ditemukan')

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        if path != '/api/articles':
            self._send_error(404, 'Rute tidak ditemukan')
            return

        body = self._read_json_body()
        if not body or 'title' not in body or 'content' not in body:
            self._send_error(400, 'Kirim JSON dengan field title dan content')
            return

        articles = load_articles()
        slug = slugify(body['title'])
        if slug in articles:
            self._send_error(409, 'Artikel dengan judul ini sudah ada')
            return

        article = {
            'title': body['title'].strip(),
            'slug': slug,
            'content': body['content'].strip(),
        }
        articles[slug] = article
        save_articles(articles)
        self._send_json(article, status=201)

    def do_PUT(self):
        parsed = urlparse(self.path)
        path = parsed.path
        if not path.startswith('/api/articles/'):
            self._send_error(404, 'Rute tidak ditemukan')
            return

        slug = unquote(path[len('/api/articles/'):])
        articles = load_articles()
        if slug not in articles:
            self._send_error(404, 'Artikel tidak ditemukan')
            return

        body = self._read_json_body()
        if not body:
            self._send_error(400, 'Kirim JSON valid untuk pembaruan')
            return

        article = articles[slug]
        if 'title' in body:
            article['title'] = body['title'].strip()
        if 'content' in body:
            article['content'] = body['content'].strip()

        new_slug = slugify(article['title'])
        if new_slug != slug:
            if new_slug in articles:
                self._send_error(409, 'Artikel baru dengan judul ini sudah ada')
                return
            articles.pop(slug)
            article['slug'] = new_slug
            slug = new_slug
        articles[slug] = article
        save_articles(articles)
        self._send_json(article)

    def do_DELETE(self):
        parsed = urlparse(self.path)
        path = parsed.path
        if not path.startswith('/api/articles/'):
            self._send_error(404, 'Rute tidak ditemukan')
            return

        slug = unquote(path[len('/api/articles/'):])
        articles = load_articles()
        if slug not in articles:
            self._send_error(404, 'Artikel tidak ditemukan')
            return

        removed = articles.pop(slug)
        save_articles(articles)
        self._send_json({'deleted': removed['slug']})


def run(server_class=HTTPServer, handler_class=WikipediaBackendHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting WikiIT backend on http://localhost:{port}')
    print('API endpoints:')
    print('  GET /api/articles')
    print('  GET /api/articles/{slug}')
    print('  POST /api/articles')
    print('  PUT /api/articles/{slug}')
    print('  DELETE /api/articles/{slug}')
    print('  GET /api/search?q=...')
    httpd.serve_forever()


if __name__ == '__main__':
    run()
