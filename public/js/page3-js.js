import { atualizarBotao } from "./funções/atualizarBotao.js";

const botao1 = document.getElementById('circulo4');
const botao2 = document.getElementById('circulo5');


const headerContainerImagens = document.querySelectorAll('.headerImg')
const headerSrcImagens = [
'/images/page3/img-figure1.png',
'/images/page3/img-figure2.png',
'/images/page3/img-figure3.png',
'/images/page3/img-figure4.png',
'/images/page3/img-figure5.png',
'/images/page3/img-figure6.png',
'/images/page3/img-figure7.png',
'/images/page3/img-figure8.png',
'/images/page3/img-figure9.png',
'/images/page3/img-figure10.png',
'/images/page3/img-figure11.png',
'/images/page3/img-figure12.png',
]
//não precisa colocar '../'para um arquivo que for puxar
const page3TextoCortes = document.getElementsByClassName('page3-texto-cortes')
const page3TextoCortesValores = ['Hair Care', 'Tendencias', 'VESTUÁRIO', 'skincare', 'tutoriais', 'produtos', 'tutoriais', 'produtos', 'Tinturas', 'Infantil', 'Alimentação', 'MAQUIAGEM']
function trocarTextoCortes1(){
    for(let i = 0; i<=5; i++)
    {
        page3TextoCortes[i].innerText = page3TextoCortesValores[i]  
    }
}
function trocarTextoCortes2(){
    for(let i = 0; i<=5; i++)
    {
        page3TextoCortes[i].innerText = page3TextoCortesValores[i+6]
    }
}
botao1.addEventListener('click', function() {
    atualizarBotao(botao1, botao1, botao2, botao2);
    trocarTextoCortes1()
     setaDireita.style.display = 'block'
    setaEsquerda.style.display = 'none'
    for(let i = 0; i<=5; i++)
    {
        headerContainerImagens[i].src = headerSrcImagens[i]
        
    }
});

botao2.addEventListener('click', function() {
    atualizarBotao(botao2, botao1, botao2, botao2);
    trocarTextoCortes2()
      setaDireita.style.display = 'none'
        setaEsquerda.style.display = 'block'
    for(let i = 0; i<=5; i++)
        {
            headerContainerImagens[i].src = headerSrcImagens[i+6]
        }
});

const setaDireita = document.getElementById('page3-seta-direita')
const setaEsquerda = document.getElementById('page3-seta-esquerda')
setaEsquerda.style.display = 'none'
setaDireita.style.display = 'block'
setaDireita.addEventListener('click', () => {
        botao2.click()
        setaDireita.style.display = 'none'
        setaEsquerda.style.display = 'block'
})
setaEsquerda.addEventListener('click', () => {
    botao1.click()
    setaDireita.style.display = 'block'
    setaEsquerda.style.display = 'none'
})




const cortesEmAltatext = document.getElementsByClassName('cortes-em-alta-text');
const cortesEmAltaContainer = document.getElementsByClassName('cortes-em-alta-container');
var linhaRoxa = document.createElement('div');
    linhaRoxa.classList.add('linhaRoxa');
    linhaRoxa.style.display = 'block';

    for(let contador = 0; contador<= 3; contador++)
  {
    cortesEmAltatext[contador].addEventListener('click', () => {
    
        cortesEmAltaContainer[contador].appendChild(linhaRoxa)
     
    })
  }

const containerCortesEmAlta = document.getElementsByClassName('page3-cortes')



 const cortesImagens = document.getElementsByClassName('cortesImagens');

cortesEmAltatext[0].addEventListener('click', () => {
  cortesImagens[0].src = '/images/page3/img-conheca1.png';
  cortesImagens[1].src = '/images/page3/img-conheca2.png';
  cortesImagens[2].src = '/images/page3/img-conheca3.png';
  cortesImagens[3].src = '/images/page3/img-conheca4.png';
  for (let contador = 0; contador <= 3; contador++) {
    containerCortesEmAlta[contador].style.background = "#5F0B38";
  }
});

cortesEmAltatext[1].addEventListener('click', () => {
  cortesImagens[0].src = '/images/page3/masculino/americano.png';
  cortesImagens[1].src = '/images/page3/masculino/lowFade.png';
  cortesImagens[2].src = '/images/page3/masculino/mullet.png';
  cortesImagens[3].src = '/images/page3/masculino/social.png';
  for (let contador = 0; contador <= 3; contador++) {
    containerCortesEmAlta[contador].style.background = "#5F0B38";
  }
});

cortesEmAltatext[2].addEventListener('click', () => {
  cortesImagens[0].src = '/images/page3/+50/bobAngular.png';
  cortesImagens[1].src = '/images/page3/+50/camadasBorboleta.png';
  cortesImagens[2].src = '/images/page3/+50/curto.png';
  cortesImagens[3].src = '/images/page3/+50/social.png';
  for (let contador = 0; contador <= 3; contador++) {
    containerCortesEmAlta[contador].style.background = "linear-gradient(180deg, #ECC46F 7.73%, #AA35B0 100%)";
  }
});

cortesEmAltatext[3].addEventListener('click', () => {
  cortesImagens[0].src = '/images/page3/img-conheca1.png';
  cortesImagens[1].src = '/images/page3/img-conheca2.png';
  cortesImagens[2].src = '/images/page3/img-conheca3.png';
  cortesImagens[3].src = '/images/page3/img-conheca4.png';
  for (let contador = 0; contador <= 3; contador++) {
    containerCortesEmAlta[contador].style.background = "linear-gradient(180deg, #ECC46F 7.73%, #AA35B0 100%)";
  }
});