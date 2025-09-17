const categorias = document.querySelectorAll(".cartegorias");

categorias.forEach(categoria => {
    categoria.addEventListener('click', function() {
        categorias.forEach(c => c.classList.remove('ativo'));
        
        categoria.classList.add('ativo');
    });
});