//matriz de objetos
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "1.jpeg"

    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
]


//capturar elementos del DOM para trabajar con js

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const prevBton = document.getElementById("back")
const playBton = document.getElementById("play")
const nextBton = document.getElementById("next")

//cargar canciones y mostrar el listado de canciones
function loadSongs(){
        //index, para saber que cancion se va a rproducir
  songList.forEach((song, index) => {
    //crear li
    const li = document.createElement("li")
    //crear a
    const link = document.createElement("a")
    //hidratar a
    link.textContent = song.title
    link.href = "#"
    //escuchar clicks
    link.addEventListener("click", () => loadSong(index))
    //añadir a li
    li.appendChild(link)
    //añadir li a ul
    songs.appendChild(li)
  })
}
//cargar cancion seleccionada
function loadSong(songIndex){
  audio.src = "../audio/" + songList[songIndex].file
  audio.play()
}

//GO
loadSongs()

//verificar si esta reproduciendo la musica
let isPlaying = false

//funcion play
function PlaySong(){
  isPlaying = true
  playBton.setAttribute('title', 'pause')
  playBton.setAttribute('file', 'pause')
  songList.play()
  

}
//funcion pause
function pauseSong(){
  isPlaying = false
  playBton.setAttribute('title', 'play')
  playBton.setAttribute('file', 'play')
  songList.pause()
  

}

//al hacer click en el boton play activa las funciones play o pause
playBton.addEventListener('click', () => (isPlaying ? pauseSong() : PlaySong()))