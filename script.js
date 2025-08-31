document.addEventListener("DOMContentLoaded", () => {
 const API_URL = "http://localhost:3000/criaturas";

async function carregarCriaturas() {
  try {
    const resp = await fetch(API_URL);
    const criaturas = await resp.json();
    renderizarCriaturas(criaturas);
  } catch (erro) {
    console.error("Erro ao buscar criaturas:", erro);
  }
}

function renderizarCriaturas(lista) {
  const container = document.getElementById("lista-criaturas");
  container.innerHTML = "";
  lista.forEach(c => {
    const div = document.createElement("div");
    div.classList.add("criatura");
    div.innerHTML = `
      <span class="criatura-nome">${c.nome}</span>
      <img src="${c.imagem}" width="30%" alt="${c.nome}">
      <p>${c.descricao}</p>
      <button onclick="deletarCriatura(${c.id})">🗑️ Deletar</button>
    `;
    container.appendChild(div);
  });
}

async function adicionarCriatura(nova) {
  await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(nova)
  });
  carregarCriaturas();
}

async function deletarCriatura(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  carregarCriaturas();
}

document.addEventListener("DOMContentLoaded", carregarCriaturas);


  
  const btnTopo = document.createElement("button");
  btnTopo.id = "btnTopo";
  btnTopo.innerText = "↑ Topo";
  document.body.appendChild(btnTopo);

  btnTopo.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    background: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: none;
    z-index: 1000;
  `;

  window.addEventListener("scroll", () => {
    btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

 
  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "🔍 Buscar criatura...";
  searchBox.id = "buscaCriatura";
  document.body.insertBefore(searchBox, document.body.firstChild);

  searchBox.style.cssText = `
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    box-sizing: border-box;
  `;

  searchBox.addEventListener("input", () => {
    const termo = searchBox.value.toLowerCase();
    const criaturas = document.querySelectorAll(".criatura");

    criaturas.forEach(criatura => {
      const nome = criatura.querySelector(".criatura-nome")?.innerText.toLowerCase();
      if (nome && nome.includes(termo)) {
        criatura.style.display = "block";
      } else {
        criatura.style.display = "none";
      }
    });
  });

 

 
  const btnDarkMode = document.createElement("button");
  btnDarkMode.innerText = "🌙 Alternar Modo Escuro";
  btnDarkMode.id = "btnDarkMode";
  document.body.insertBefore(btnDarkMode, searchBox);

  btnDarkMode.style.cssText = `
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 16px;
    cursor: pointer;
    background: #222;
    color: white;
    border: none;
    border-radius: 5px;
  `;

  btnDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btnDarkMode.innerText = document.body.classList.contains("dark-mode")
      ? "☀️ Alternar Modo Claro"
      : "🌙 Alternar Modo Escuro";
  });
});

