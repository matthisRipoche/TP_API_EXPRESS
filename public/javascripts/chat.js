/* ===================== */
/* CHAT CLIENT SOCKET.IO */
/* ===================== */

// =======================
// VARIABLES
// =======================
const SERVER_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://tp-api.matthisripoche.com";

const socket = io(SERVER_URL);
const usernameModal = document.getElementById("usernameModal");
const usernameForm = document.getElementById("usernameForm");
const usernameInput = document.getElementById("usernameInput");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

let username = "";

// =======================
// MODAL USERNAME
// =======================
function showUsernameModal() {
    usernameModal.style.display = "flex";
}

function hideUsernameModal() {
    usernameModal.style.display = "none";
}

showUsernameModal();

/**
 * Gestion du formulaire de pseudo
 */
usernameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = usernameInput.value.trim();
    if (!name) return;

    username = name;
    hideUsernameModal();

    // Envoie événement "user:join" au serveur
    socket.emit("user:join", { username });

    addSystemMessage(`Bienvenue ${username} !`);
});

// =======================
// CHAT SOCKET.IO
// =======================

// Si on recupere l'historique des messages
socket.on("chat:history", (messages) => {
    messages.forEach((message) => {
        addMessage(
            message.author,
            message.message,
            message.author === username ? "sent" : "received"
        );
    });
});

// Réception d'un message
socket.on("chat:message", ({ author, message }) => {
    addMessage(author, message, author === username ? "sent" : "received");
});

// Système : utilisateur rejoint
socket.on("user:joined", ({ username }) => {
    addSystemMessage(`${username} a rejoint le chat`);
});

// Système : utilisateur quitté
socket.on("user:left", ({ username }) => {
    addSystemMessage(`${username} a quitté le chat`);
});

// =======================
// ENVOI MESSAGE
// =======================
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    socket.emit("chat:message", {
        author: username,
        message,
    });

    chatInput.value = "";
});

// =======================
// FONCTIONS D'AFFICHAGE
// =======================
function addMessage(author, message, type = "received") {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", type);

    const content = document.createElement("div");
    content.classList.add("message-content");

    const authorEl = document.createElement("span");
    authorEl.classList.add("author");
    authorEl.textContent = author;

    const messageElText = document.createElement("p");
    messageElText.textContent = message;

    content.appendChild(authorEl);
    content.appendChild(messageElText);
    messageEl.appendChild(content);

    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addSystemMessage(message) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", "system");

    messageEl.innerHTML = `
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;

    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
