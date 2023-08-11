console.log('chat_box.js loaded');

document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const openChatButton = document.getElementById("open-chat-box");
    const minimiseButton = document.getElementById("minimise-chat");
    const cutButton = document.getElementById("cut-chat-box");
    const chatSection = document.getElementById("chat-section");
    const chatInput = document.getElementById("chat-input");
  
    let isMinimized = false;
    let isCut = false;
  
    openChatButton.addEventListener("click", function () {
      chatBox.style.display = "block";
      openChatButton.style.display = "none";
      isMinimized = false;
      isCut = false;
    });
  
    minimiseButton.addEventListener("click", function () {
      isMinimized = !isMinimized;
      chatBox.style.height = isMinimized ? "3em" : "400px";
      chatBox.style.overflow = isMinimized ? "hidden" : "none";
      chatSection.style.display = isMinimized ? "none" : "block";
      chatInput.style.display = isMinimized ? "none" : "block";
      minimiseButton.innerHTML = isMinimized ? '<i class="fa-solid fa-expand"></i>' : '<i class="fa-solid fa-compress"></i>';
    });
  
    cutButton.addEventListener("click", function () {
        isCut = !isCut;
        openChatButton.style.display = "flex";
        chatBox.style.display = isCut ? "none" : "block";
    });
  });
  