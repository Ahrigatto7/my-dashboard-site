// main.js
import { loadCards } from "./cards.js";
import { setupUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cards = await loadCards();
  setupUI(cards);

  document.getElementById("shuffleBtn").addEventListener("click", () => {
    setupUI(cards);
  });

  document.getElementById("category").addEventListener("change", () => {
    setupUI(cards);
  });
});
