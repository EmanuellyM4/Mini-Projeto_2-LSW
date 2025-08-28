document.addEventListener("DOMContentLoaded", () => {
  // 1. ACCORDION
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach(btn => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });

  // 2. BOTÃO VOLTAR AO TOPO
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

  // 3. BUSCA POR NOME
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

  // 4. CONTADOR DE CRIATURAS POR REGIÃO
  const regioes = document.querySelectorAll(".painel");
  regioes.forEach(painel => {
    const criaturas = painel.querySelectorAll(".criatura");
    const count = criaturas.length;
    const titulo = painel.previousElementSibling;
    titulo.innerText += ` (${count})`;
  });

  // 5. MODO ESCURO
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
