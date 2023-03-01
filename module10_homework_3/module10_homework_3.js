/* Задание 3 Модуль 10 */


/* Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

img
Добавить в чат механизм отправки гео-локации:
img
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести 
ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
Сообщение, которое отправит обратно эхо-сервер, не выводить. */

const wsUrl = "wss://echo-ws-service.herokuapp.com";

  function pageLoaded() {
    const textInput = document.querySelector(".text");
    const sendBtn = document.querySelector(".btn-send");
    const geoBtn = document.querySelector(".btn-geo");
    const connectOutput = document.querySelector(".connect");
    const historyWindow = document.querySelector(".history");
  
    const socket = new WebSocket(wsUrl);
   
    socket.onopen = () => {
        connectOutput.innerText = "Соединение установлено";
    };
    socket.onmessage = (event) => {
      writeToChat(event.data, true);
    };
    socket.onerror = () => {
        connectOutput.innerText = "Произошла ошибка!";
    };
  
  
    function writeToChat(message, isRecieved) {
      let messageHTML = `<div class="${
        isRecieved ? "recieved" : "sent"
      }">${message}</div>`;
      historyWindow.innerHTML += messageHTML;
    }
  
  
    function sendMessage() {
      if (!textInput.value) {
        connectOutput.innerText = "пустое сообщение";
        return;
      }
      socket.send(textInput.value);
      writeToChat(textInput.value, false);
      textInput.value === "";
    }
  
   
    sendBtn.addEventListener("click", sendMessage);
  
 
    const error = () => {
      writeOutput("При получении местоположения произошла ошибка");
    };
  
 
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      addLink(link);
    };
  
   
    function addLink(link) {
      let element = `
      <a  href='${link}'
          target='_blank'
          style='text-decoration: none;
          background: blue;
          margin: 25px 30px;
          padding: 10px 15px;
          color: white;'
          >
          Ссылка с вашей гео-локацией
          </a>
      `;
      historyWindow.innerHTML += element;
    }
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        connectOutput.textContent = "Geolocation не поддерживается вашим браузером";
      } else {
        connectOutput.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
      }
    });
  }
  document.addEventListener("DOMContentLoaded", pageLoaded);