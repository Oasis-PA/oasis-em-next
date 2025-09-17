import { atualizarBotao } from "./funções/atualizarBotao.js";

var botao1 = document.getElementById('circulo1');
var botao2 = document.getElementById('circulo2');
var botao3 = document.getElementById('circulo3');
var page1Main = document.getElementById('page1Main');

// Corrija os caminhos das imagens de fundo:
page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem1.svg')";
setInterval(timeoutImagem, 5000);

botao1.addEventListener('click', function() {
    atualizarBotao(botao1, botao1, botao2, botao3);
    page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem1.svg')";
});

botao2.addEventListener('click', function() {
    atualizarBotao(botao2, botao1, botao2, botao3);
    page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem2.svg')";
});

botao3.addEventListener('click', function() {
    atualizarBotao(botao3, botao1, botao2, botao3);
    page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem3.svg')";
});

function timeoutImagem() {
    if (page1Main.style.backgroundImage.includes("/images/tela-principal/page1/page1-imagem1.svg")) {
        atualizarBotao(botao2, botao1, botao2, botao3);
        page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem2.svg')";
    }
    else if (page1Main.style.backgroundImage.includes("/images/tela-principal/page1/page1-imagem2.svg")) {
        atualizarBotao(botao3, botao1, botao2, botao3);
        page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem3.svg')";
    }
    else if (page1Main.style.backgroundImage.includes("/images/tela-principal/page1/page1-imagem3.svg")) {
        atualizarBotao(botao1, botao1, botao2, botao3);
        page1Main.style.backgroundImage = "url('/images/tela-principal/page1/page1-imagem1.svg')";
    }
}

