const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const articleList = document.getElementById('articleList');
const articleDetail = document.getElementById('articleDetail');
const relatedLinks = document.getElementById('relatedLinks');
const pageTitle = document.getElementById('pageTitle');

const articles = {
  graph: {
    title: 'Pengertian Graph',
    content: `<a href="https://youtu.be/B8DlmPdV1LM" target="_blank">Link Video</a>

Graph adalah struktur data non-linear yang digunakan untuk merepresentasikan hubungan antar sekumpulan objek diskrit. 
Graph terdiri dari kumpulan vertex (node) dan edge (sisi) yang menghubungkan pasangan vertex tersebut.


Berbeda dengan struktur data tree, graph tidak memiliki aturan hierarki yang kaku seperti hubungan parent dan child. Untuk penjelasan lebih lanjut tentang Tree, silakan baca di halaman <a href="Tree.html" class="internal-link" onclick="return true;">Tree</a>. 
Dalam graph, hubungan antar node bersifat fleksibel dan dapat membentuk relasi many-to-many (banyak ke banyak), 
sehingga lebih cocok untuk merepresentasikan sistem kompleks di dunia nyata.

Graph menjadi salah satu struktur data yang sangat penting dalam ilmu komputer modern karena kemampuannya dalam 
memodelkan berbagai sistem seperti jaringan komputer, rute transportasi, hubungan sosial, serta kecerdasan buatan.

Dengan menggunakan graph, suatu sistem dapat divisualisasikan dalam bentuk node sebagai entitas dan edge sebagai 
hubungan antar entitas tersebut.`
  },
  komponen: {
    title: 'Komponen Graph',
    content: `Graph memiliki dua komponen utama, yaitu vertex (node) dan edge (sisi).

Vertex adalah titik yang merepresentasikan suatu objek atau entitas dalam graph. Contoh vertex dalam dunia nyata 
adalah kota pada peta, pengguna pada media sosial, atau komputer dalam jaringan.

Edge adalah hubungan atau koneksi antara dua vertex. Edge menunjukkan adanya relasi antar objek dalam graph. 
Edge dapat bersifat berarah (directed) maupun tidak berarah (undirected).

Selain itu, edge juga dapat memiliki nilai atau bobot (weight), seperti jarak, waktu tempuh, atau biaya. 
Bobot ini digunakan dalam perhitungan tertentu seperti pencarian jalur tercepat.

Kombinasi antara vertex dan edge inilah yang membentuk sebuah graph yang dapat digunakan untuk berbagai kebutuhan analisis.`
  },
  analogi: {
    title: 'Analogi Graph di Dunia Nyata',
    content: `Graph sering digunakan untuk memodelkan berbagai sistem di dunia nyata karena kemampuannya dalam merepresentasikan 
hubungan antar objek.

Contoh penerapan graph dalam kehidupan sehari-hari antara lain:

1. Peta Lalu Lintas
Node merepresentasikan lokasi atau persimpangan jalan, sedangkan edge merepresentasikan jalan yang menghubungkan lokasi tersebut.

2. Rute Maskapai Udara
Node adalah bandara, sedangkan edge adalah jalur penerbangan antar bandara.

3. Sistem Transportasi KRL
Node adalah stasiun, sedangkan edge adalah jalur rel yang menghubungkan antar stasiun.

Melalui analogi ini, dapat dipahami bahwa graph merupakan model yang sangat fleksibel dan kuat untuk merepresentasikan 
hubungan dalam berbagai sistem kompleks.`
  },
  jenis: {
    title: 'Jenis-Jenis Graph',
    content: `Graph dapat diklasifikasikan berdasarkan arah dan bobot dari edge yang dimilikinya.

Berdasarkan arah:

1. Graph Berarah (Directed Graph)
Pada graph ini, setiap edge memiliki arah tertentu. Hubungan antara dua vertex tidak selalu bersifat dua arah. 
Contohnya adalah sistem follow pada media sosial.

2. Graph Tidak Berarah (Undirected Graph)
Pada graph ini, hubungan antar vertex bersifat dua arah. Jika vertex A terhubung dengan vertex B, 
maka B juga terhubung dengan A.

Berdasarkan bobot:

1. Graph Berbobot (Weighted Graph)
Setiap edge memiliki nilai tertentu seperti jarak, waktu, atau biaya. Graph ini digunakan dalam perhitungan 
optimasi seperti pencarian rute tercepat.

2. Graph Tidak Berbobot (Unweighted Graph)
Edge tidak memiliki nilai tambahan dan hanya menunjukkan ada atau tidaknya hubungan antar vertex.

Klasifikasi ini membantu dalam menentukan algoritma yang tepat untuk digunakan dalam pengolahan graph.`
  },
  representasi: {
    title: 'Representasi Graph',
    content: `Graph dapat direpresentasikan dalam memori komputer dengan beberapa cara, yaitu adjacency matrix, adjacency list, 
dan edge list.

1. Adjacency Matrix
Adjacency matrix adalah representasi graph dalam bentuk tabel atau array dua dimensi. Setiap baris dan kolom 
merepresentasikan vertex, sedangkan nilai dalam tabel menunjukkan hubungan antar vertex.

Jika terdapat hubungan, maka nilai diisi 1, dan jika tidak ada hubungan diisi 0. 
Representasi ini mudah dipahami, tetapi membutuhkan banyak memori terutama untuk graph besar.

2. Adjacency List
Adjacency list adalah representasi graph dalam bentuk daftar. Setiap vertex memiliki daftar vertex lain 
yang terhubung dengannya.

Representasi ini lebih efisien dalam penggunaan memori dibandingkan adjacency matrix, sehingga sering digunakan 
dalam implementasi graph yang besar.

3. Edge List
Edge list adalah representasi graph yang paling sederhana. Graph direpresentasikan sebagai daftar pasangan vertex 
yang saling terhubung.

Contohnya: (1,2), (2,3), (3,4). Representasi ini mudah digunakan, tetapi kurang efisien untuk operasi tertentu.

Pemilihan representasi graph tergantung pada kebutuhan dan kompleksitas masalah yang dihadapi.`
  },
  traversal: {
    title: 'Traversal Graph',
    content: `Traversal graph adalah proses mengunjungi semua node dalam graph secara sistematis. 
Traversal diperlukan untuk memastikan semua bagian graph dapat diakses tanpa terjadi pengulangan tak terbatas.

Dua metode traversal yang umum digunakan adalah Breadth-First Search (BFS) dan Depth-First Search (DFS).

Breadth-First Search (BFS)
BFS adalah metode traversal yang menjelajah graph secara melebar atau level per level. 
Algoritma ini menggunakan struktur data queue (antrean) dengan prinsip FIFO (First In First Out).

BFS sangat efektif digunakan untuk mencari jalur terpendek pada graph yang tidak berbobot karena menjelajah 
node secara berlapis dari titik awal.

Depth-First Search (DFS)
DFS adalah metode traversal yang menjelajah graph secara mendalam. 
Algoritma ini menggunakan stack atau rekursi untuk menelusuri satu jalur hingga mencapai ujung, 
kemudian melakukan backtracking untuk menjelajah jalur lainnya.

DFS sering digunakan untuk mendeteksi siklus dalam graph serta untuk proses topological sorting.

Kedua metode ini memiliki karakteristik dan kegunaan yang berbeda tergantung pada kebutuhan analisis graph.`
  },
  studi_kasus: {
    title: 'Studi Kasus Graph',
    content: `Graph banyak digunakan dalam berbagai aplikasi dunia nyata, terutama dalam bidang teknologi informasi.

1. Social Network
Dalam media sosial seperti Facebook, setiap pengguna direpresentasikan sebagai node, 
dan hubungan pertemanan sebagai edge.

Algoritma BFS digunakan untuk menemukan rekomendasi teman melalui konsep "teman dari teman".

2. Navigasi GPS
Dalam sistem navigasi seperti Google Maps, graph berbobot digunakan untuk menentukan rute tercepat. 
Node merepresentasikan lokasi, sedangkan edge merepresentasikan jalan dengan bobot seperti jarak atau waktu tempuh.

Algoritma seperti Dijkstra atau A* digunakan untuk menemukan jalur dengan bobot terkecil.

3. Sistem Akademik (DAG)
Graph digunakan untuk memodelkan sistem prasyarat mata kuliah. 
Model yang digunakan adalah Directed Acyclic Graph (DAG), yaitu graph berarah tanpa siklus.

Hal ini memastikan tidak terjadi looping dalam prasyarat mata kuliah yang dapat menyebabkan mahasiswa 
tidak dapat menyelesaikan studinya.

Penggunaan graph dalam berbagai studi kasus ini menunjukkan bahwa graph merupakan struktur data yang sangat 
penting dan fleksibel dalam menyelesaikan berbagai permasalahan kompleks.`
  }
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildLinkableText(text) {
  let linked = text;
  Object.values(articles).forEach(article => {
    const title = article.title;
    const slug = Object.keys(articles).find(key => articles[key].title === title);
    const regex = new RegExp(`\\b${escapeRegExp(title)}\\b`, 'g');
    linked = linked.replace(regex, `<a href="#${slug}" class="internal-link">${title}</a>`);
  });
  return linked;
}

function renderArticleList() {
  articleList.innerHTML = Object.entries(articles)
    .map(([slug, article]) => `
      <a href="#${slug}" class="sidebar-link">${article.title}</a>
    `)
    .join('');
}

function renderArticleSections() {
  articleDetail.innerHTML = Object.entries(articles)
    .map(([slug, article]) => `
      <section id="${slug}" class="article-section">
        <h2 class="article-title">${article.title}</h2>
        <div class="article-content">${buildLinkableText(article.content)}</div>
      </section>
    `)
    .join('');
}

function activateLinkForSlug(slug) {
  document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active-link'));
  const activeLink = document.querySelector(`.sidebar-link[href="#${slug}"]`);
  if (activeLink) activeLink.classList.add('active-link');
}

function handleHashChange() {
  const slug = window.location.hash.slice(1) || 'graph';
  activateLinkForSlug(slug);
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    alert('Silakan masukkan kata kunci pencarian.');
    return;
  }
  alert(`Fungsi pencarian sementara: "${query}"`);
});

window.addEventListener('DOMContentLoaded', () => {
  renderArticleList();
  renderArticleSections();
  handleHashChange();
});
window.addEventListener('hashchange', handleHashChange);
