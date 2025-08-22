const section = document.querySelector("#page2 > section");

let isDragging = false; // Estado para verificar se está arrastando
let startX; // Posição inicial do clique
let scrollLeft; // Posição inicial da rolagem

section.addEventListener("mousedown", (e) => {
  isDragging = true; // Ativa o arrasto
  section.classList.add("dragging"); // Estilo visual opcional
  startX = e.pageX - section.offsetLeft; // Registra a posição inicial do mouse
  scrollLeft = section.scrollLeft; // Registra a posição inicial de rolagem
});

section.addEventListener("mousemove", (e) => {
  if (!isDragging) return; // Só funciona se o mouse estiver pressionado
  e.preventDefault(); // Evita comportamento padrão
  const x = e.pageX - section.offsetLeft; // Posição atual do mouse
  const walk = (x - startX); // Calcula a distância percorrida pelo mouse
  section.scrollLeft = scrollLeft - walk; // Atualiza a posição de rolagem
});

section.addEventListener("mouseup", () => {
  isDragging = false; // Finaliza o arrasto ao soltar o botão do mouse
  section.classList.remove("dragging");
});

section.addEventListener("mouseleave", () => {
  isDragging = false; // Finaliza o arrasto ao sair da área
  section.classList.remove("dragging");
});
