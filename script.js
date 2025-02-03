const wsUrl = "wss://3764-2804-7f0-bd41-e73f-679a-add6-24db-8c8e.ngrok-free.app/ws ";
let ws;
let lastSentMessage = '';

function connectWebSocket() {
  messageInput = document.getElementById("messageInput")
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('Conectado ao servidor WebSocket');
    messageInput.disabled = false;
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.content !== lastSentMessage) {
      displayMessage(data.content, 'other');

    }
  };

  ws.onclose = () => {
    messageInput.disabled = true;
    const messagesContainer = document.getElementById("containerMessage");

    while (messagesContainer.firstChild) {
      messagesContainer.removeChild(messagesContainer.firstChild);
    }
    console.log('Conexão WebSocket fechada');
  };

  ws.onerror = (error) => {
    console.error('Erro WebSocket:', error);
    messageInput.disabled = true;
  };
}

function displayMessage(content, type) {
  if (content) {
    messagesContainer = document.getElementById("containerMessage")
    const newFrameWrapper = document.createElement('div');

    const frameMessage = document.createElement("div")

    if (type == "other") {
      frameMessage.classList.add("frame-66")
      newFrameWrapper.classList.add("frame-wrapper")
    } else {
      frameMessage.classList.add("frame-6")
      newFrameWrapper.classList.add("frame-7")
    }


    const newMessage = document.createElement('p');
    newMessage.classList.add('text-wrapper-2');
    newMessage.textContent = content;

    frameMessage.appendChild(newMessage);

    newFrameWrapper.appendChild(frameMessage);

    messagesContainer.appendChild(newFrameWrapper);
  }
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');

  const message = messageInput.value.trim();
  if (message !== '') {
    displayMessage(message, 'my');
    lastSentMessage = message;
    ws.send(message);
    messageInput.value = '';
  }
}

document.getElementById("stopButton").addEventListener("click", () => {
  if (ws) {
    ws.send("close")
    const messagesContainer = document.getElementById("containerMessage");

    while (messagesContainer.firstChild) {
      messagesContainer.removeChild(messagesContainer.firstChild);
    }
    ws.close();
    messageInput.disabled = true;
    console.log("Conexão WebSocket fechada.");
  }
});


document.getElementById("skip").addEventListener("click", () => {
  if (ws) {
    const messagesContainer = document.getElementById("containerMessage");

    while (messagesContainer.firstChild) {
      messagesContainer.removeChild(messagesContainer.firstChild);
    }
    ws.close();
    connectWebSocket()
  } else {
    connectWebSocket()
  }
})

sendMessageButton = document.getElementById('sendMessageButton')

sendMessageButton.addEventListener('click', sendMessage);

document.getElementById("messageInput").addEventListener("keydown", (e) => {
  if (e.key === 'Enter') sendMessage();

});

