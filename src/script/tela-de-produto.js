const botoes = document.querySelectorAll('.botaoAmarelo');


botoes.forEach(botao => {
    botao.onclick = function() {
        window.location.href = "https://unsplash.com/es/fotos/botella-de-plastico-blanca-y-amarilla-kEgH3e1Cdb4";
    };
});

const checkbox = document.getElementById('tema');
        const solImg = document.getElementById('sol');
        const luaImg = document.getElementById('lua');
        const html = document.querySelector("html");

        checkbox.addEventListener('change', function() {
            html.classList.toggle("dark");

            if (checkbox.checked) {
                solImg.style.opacity = '0';
                luaImg.style.opacity = '1';
            } else {
                solImg.style.opacity = '1';
                luaImg.style.opacity = '0';
            }
        });


   document.addEventListener('DOMContentLoaded', function() {
  const elementos = document.querySelectorAll('.composiçao, .qualidades, .maisDetalhes');

  elementos.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
      
      elementos.forEach(function(el) {
        el.classList.remove('active');
      });

      
      this.classList.add('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const seta = document.getElementById('seta');

  seta.addEventListener('click', function() {
    this.classList.toggle('left');
  });
});
