<<<<<<< HEAD:public/js/cronograma-capilar.js
const passando = document.querySelector('.passando');
if (passando) {
  let isDown = false, startX = 0, scrollLeft = 0, velX = 0, raf;

  passando.addEventListener('mousedown', (e) => {
    isDown = true;
    passando.classList.add('is-dragging');       // <--- NOVO
    cancelAnimationFrame(raf);
    startX = e.pageX - passando.offsetLeft;
    scrollLeft = passando.scrollLeft;
  });

  document.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    passando.classList.remove('is-dragging');     // <--- NOVO
    snapToClosest && snapToClosest();             // se você estiver usando o auto-encaixe
  });

  passando.addEventListener('mouseleave', () => { // <--- NOVO (segurança)
    if (!isDown) return;
    isDown = false;
    passando.classList.remove('is-dragging');
  });

  passando.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - passando.offsetLeft;
    const walk = (x - startX) * 2;
    passando.scrollLeft = scrollLeft - walk;
    velX = -walk;
  });

  passando.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      passando.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  }, { passive: false });

  // Impede arrastar a imagem “nativa” do browser
  passando.addEventListener('dragstart', (e) => e.preventDefault());
}
=======
// Espera o conteúdo da página carregar para garantir que o elemento exista
document.addEventListener('DOMContentLoaded', () => {

  const passando = document.querySelector('.passando');

  // Verifica se o elemento do carrossel foi encontrado na página
  if (passando) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Evento: O botão do mouse é pressionado no carrossel
    passando.addEventListener('mousedown', (e) => {
      isDown = true;
      // Adiciona uma classe para indicar que o arraste começou
      // O CSS usa essa classe para desativar o 'scroll-snap' e deixar o arraste suave
      passando.classList.add('is-dragging');
      // Posição inicial do mouse
      startX = e.pageX - passando.offsetLeft;
      // Posição inicial do scroll
      scrollLeft = passando.scrollLeft;
    });

    // Evento: O mouse sai da área do carrossel
    passando.addEventListener('mouseleave', () => {
      isDown = false;
      passando.classList.remove('is-dragging');
    });

    // Evento: O botão do mouse é solto em qualquer lugar da página
    document.addEventListener('mouseup', () => {
      isDown = false;
      passando.classList.remove('is-dragging');
    });

    // Evento: O mouse se move sobre o carrossel
    passando.addEventListener('mousemove', (e) => {
      // Só executa se o botão do mouse estiver pressionado
      if (!isDown) return;
      
      // Previne o comportamento padrão do navegador (como selecionar texto)
      e.preventDefault();
      
      const x = e.pageX - passando.offsetLeft;
      // Calcula a distância do arraste e multiplica para dar mais velocidade
      const walk = (x - startX) * 2.5; 
      // Atualiza a posição do scroll
      passando.scrollLeft = scrollLeft - walk;
    });
  }
});
>>>>>>> 2ab5f5e8ca755180bdbd84fe8d6c7f2d2ba2b096:src/script/cronograma-capilar.js
