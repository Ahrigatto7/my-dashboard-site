// ui.js
import { filterCards, getRandomCards } from "./cards.js";

let pickedCount = 0;
const maxPick = 3;
let selectedCards = [];

export function setupUI(cards) {
  pickedCount = 0;
  selectedCards = [];
  const area = document.getElementById("cardArea");
  const result = document.getElementById("result");
  area.innerHTML = "";
  result.classList.remove("visible");
  result.innerHTML = "";

  const filtered = filterCards(document.getElementById("category").value);
  const frontCards = getRandomCards(filtered, maxPick);

  for (let i = 0; i < 6; i++) {
    const card = createCardElement(frontCards[i] || filtered[Math.floor(Math.random() * filtered.length)]);
    area.appendChild(card);
  }
}

function createCardElement(dataCard) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("inner");

  const back = document.createElement("div");
  back.classList.add("back");

  const front = document.createElement("img");
  front.classList.add("front");
  front.setAttribute("loading", "lazy");
  front.src = dataCard.image;
  front.style.display = "none";

  inner.appendChild(back);
  inner.appendChild(front);
  cardEl.appendChild(inner);

  cardEl.addEventListener("click", () => {
    if (pickedCount >= maxPick || cardEl.classList.contains("flipped")) return;

    const isReversed = Math.random() < 0.5;
    front.style.display = "block";
    if (isReversed) front.style.transform = "rotate(180deg)";
    cardEl.classList.add("flipped");

    selectedCards.push({ ...dataCard, isReversed });
    cardEl.classList.add("disabled");
    pickedCount++;

    showCardMeaning(pickedCount - 1, dataCard, isReversed);

    if (pickedCount >= maxPick) {
      document.querySelectorAll(".card:not(.flipped)").forEach(c => c.classList.add("disabled"));
      document.getElementById("result").classList.add("visible");
    }
  });

  return cardEl;
}

function showCardMeaning(index, card, isReversed) {
  const result = document.getElementById("result");
  const label = ["과거", "현재", "미래"][index];
  const dir = isReversed ? "역방향" : "정방향";
  const meaning = isReversed ? card.reversed : card.meaning;

  const line = document.createElement("p");
  line.innerHTML = `<strong>${label}</strong>: <a href="#" onclick='return showDetail("${card.name}", "${meaning}", "${card.image}", ${isReversed})'>${card.name}</a> (${dir}) - ${meaning}`;
  result.appendChild(line);
}

// 글로벌 함수 (onclick 대응)
window.showDetail = function(title, meaning, image, isReversed) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalText").innerText = meaning;
  const img = document.getElementById("modalImage");
  img.src = image;
  img.style.transform = isReversed ? "rotate(180deg)" : "rotate(0deg)";
  document.getElementById("modal").classList.add("show");
  document.getElementById("overlay").classList.add("show");
  return false;
};

document.getElementById("closeModalBtn").addEventListener("click", closeModal);
document.getElementById("overlay").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("modal").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}
