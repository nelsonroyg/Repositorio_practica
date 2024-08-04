let number = 0;
let data = []; // Acá voy a almacenar los datos obtenidos de ajax.json
const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");

function getData() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      data = request.response; // Acá voy a almacenar los datos obtenidos en la variable data
      updateContent(); // Con este se actualiza el contenido con los datos obtenidos
        }
    }
    request.open("GET", "ajax.json");
    request.responseType = "json";
    request.send(null);
}

function updateContent() {
    titleArea.innerHTML = data[number].title;
    contentArea.innerHTML = data[number].content;
    videoArea.setAttribute("src", data[number].url);
    number == 2 ? number = 0 : number++;
}

function changeVideo() {
  // Este llama a getData solo si los datos no han sido obtenidos aún
    if (data.length === 0) {
    getData();
    } else {
    updateContent();
    }
}

button.addEventListener('click', changeVideo);
window.onload = changeVideo;
