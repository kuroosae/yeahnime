const list = document.getElementById("drama-list");
const searchInput = document.getElementById("search");

const proxy = "https://api.allorigins.win/raw?url=";
const target = "https://dramabos.asia";

let dramas = [];

fetch(proxy + target)
  .then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    dramas = [];

    doc.querySelectorAll(".item").forEach(item => {
      const title = item.querySelector(".title")?.innerText;
      const img = item.querySelector("img")?.src;

      if (title && img) {
        dramas.push({ title, img });
      }
    });

    renderDramas(dramas);
  })
  .catch(() => {
    list.innerHTML = "Gagal memuat data";
  });

function renderDramas(data) {
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>Drama tidak ditemukan</p>";
    return;
  }

  data.forEach(drama => {
    list.innerHTML += `
      <div class="card">
        <img src="${drama.img}">
        <h3>${drama.title}</h3>
      </div>
    `;
  });
}

// SEARCH REALTIME
searchInput.addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();

  const filtered = dramas.filter(d =>
    d.title.toLowerCase().includes(keyword)
  );

  renderDramas(filtered);
});
