//matriz de objetos
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "Imagenes/gatito.jpg"

    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "Imagenes/gatito2.jpg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "Imagenes/gatito3.jpg"
    },
]

let actualSong = null



//capturar elementos del DOM para trabajar con js

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const prev = document.getElementById("back")
const play = document.getElementById("play")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progressContainer")
progressContainer.addEventListener("click", setProgress)

//escuchar el eleneto audio
audio.addEventListener("timeUpdate", updateProgress)

//esuchar los clicks en los controles
play.addEventListener("click", () => {
  if(audio.paused){
    playSong()
  }
    else{
      pauseSong()
  }
  
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

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

    if(songIndex !== actualSong){
      changeActiveClass(actualSong, songIndex)
      actualSong = songIndex
      audio.src = "../audio/" + songList[songIndex].file
      playSong()
      changeTitle(songIndex)
      changeCover(songIndex)

    }
  
}

//actualizar la barra de progreso
function updateProgress(event){
  const {duration, currentTime} = event.srcElement
  const percent = (currentTime / duration ) * 100
  progress.style.width = percent + "%"
}



//hacer la barra de progreso clicable
function setProgress(event){
  const totalWith  = this.offsetWith
  const progressWith = event.offsetX
  const current = (progressWith / totalWith) * audio.duration
  audio.currentTime = current
}

//actualizar controles
function updateControls(){
  if(audio.paused){
    play.classList.remove("fa-pause")
    play.classList.add("fa-play")
  }
  else{
      play.classList.add("fa-pause")
      play.classList.remove("fa-play")
  }
}

//reproducir cancion
function playSong(){
  if(actualSong !== null){
    audio.play()
    updateControls()
  }
}

//pausar cancion
function pauseSong(){
  audio.pause()
  updateControls()
}

//cambiar clase activa
function changeActiveClass(lastIndex, newIndex){
     const links = document.querySelectorAll("a")
     if(lastIndex != null){
      links[lastIndex.classList.remove("active")]
     }
     links[newIndex].classList.add("active")

}

//cambiar cover de la cancion
function changeCover(songIndex){
   cover.src = "../Imagenes/" + songList[songIndex].cover
}

//cambiar titulo
function changeTitle(songIndex){
  title.innerText = songList[songIndex].title
}

//anterior cancion
function prevSong(){
  if(actualSong > 0){
    loadSong(actualSong - 1)
  }
  else{
    loadSong(songList.length - 1)
  }
}

//siguente cancion
function nextSong(){
  if(actualSong < songList.length - 1){
    loadSong(actualSong + 1)
  }
  else{
    loadSong(0)
  }
}

//lanzar siguente cancion cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())

//GO
loadSongs()