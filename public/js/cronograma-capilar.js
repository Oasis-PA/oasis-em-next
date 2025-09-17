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
