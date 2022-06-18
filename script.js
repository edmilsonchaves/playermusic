
let musicas = [
    {titulo: "As You Fade Away", artista: "Neffex", src: "./music/As You Fade Away - NEFFEX.mp3", img: "./images/pop.jpg" },
    {titulo: "Winning", artista: "Dlk", src: "./music/Winning - NEFFEX.mp3", img: "./images/hiphop.jpg"},
    {titulo: "Your Love", artista: "Yung Logos", src: "./music/Your Love - Yung Logos.mp3", img: "./images/country.jpg"}
    
]
let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('.capa');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao em');

renderizarMusica(indexMusica);



// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica --;
    if (indexMusica < 0){
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);

});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica ++;
    if (indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});


musica.addEventListener('timeupdate', atualizarBarra);
    


// Funções

function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        pausarMusica();
        corDeFundo();

    });
}
function corDeFundo(){
    if (indexMusica == 0) {
        document.querySelector('body').style.backgroundColor = 'blue';
    } else if (indexMusica == 1) {
        document.querySelector('body').style.backgroundColor = '#333';
    } else if (indexMusica == 2) {
        document.querySelector('body').style.backgroundColor = 'saddlebrown';
    }

}
function tocarMusica() {
    musica.play()
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}


function pausarMusica() {
    musica.pause()
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}