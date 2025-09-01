document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://my-json-server.typicode.com/EmanuellyM4/criaturas-api/criaturas";

  
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
        <small><b>Região:</b> ${c.regiao}</small><br>
        <button onclick="editarCriatura(${c.id})">✏️ Editar</button>
        <button onclick="deletarCriatura(${c.id})">🗑️ Deletar</button>
      `;
      container.appendChild(div);
    });
  }

  async function adicionarCriatura(nova) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nova)
    });
    carregarCriaturas();
  }

  window.deletarCriatura = async function (id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarCriaturas();
  }

  window.editarCriatura = async function (id) {
    const nome = prompt("Novo nome:");
    const descricao = prompt("Nova descrição:");
    if (!nome || !descricao) return;
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao })
    });
    carregarCriaturas();
  }

  
  const form = document.getElementById("form-criatura");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nova = {
      nome: document.getElementById("nome").value,
      imagem: document.getElementById("imagem").value,
      regiao: document.getElementById("regiao").value,
      descricao: document.getElementById("descricao").value
    };
    adicionarCriatura(nova);
    form.reset();
  });

 
  document.getElementById("busca").addEventListener("input", async e => {
    const termo = e.target.value.toLowerCase();
    const resp = await fetch(API_URL);
    let criaturas = await resp.json();
    criaturas = criaturas.filter(c => c.nome.toLowerCase().includes(termo));
    renderizarCriaturas(criaturas);
  });

  
  document.getElementById("modo-escuro").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  
  const btnTopo = document.getElementById("voltar-topo");
  window.addEventListener("scroll", () => {
    btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
  });
  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  carregarCriaturas();
});


