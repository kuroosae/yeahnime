const list = document.getElementById("drama-list");

// proxy publik (bisa diganti)
const proxy = "https://api.allorigins.win/raw?url=";
const target = "https://dramabos.asia";

fetch(proxy + target)
  .then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    list.innerHTML = "";

    doc.querySelectorAll(".item").forEach(item => {
      const title = item.querySelector(".title")?.innerText;
      const img = item.querySelector("img")?.src;

      if (title && img) {
        list.innerHTML += `
          <div class="card">
            <img src="${img}">
            <h3>${title}</h3>
          </div>
        `;
      }
    });
  })
  .catch(err => {
    list.innerHTML = "Gagal memuat data";
    console.error(err);
  });
