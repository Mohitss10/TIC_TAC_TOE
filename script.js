const boxes = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");
const msgContainer = document.getElementById("msgBox");
const msg = document.getElementById("message");

let turnO = true;
const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

function resetGame() {
  turnO = true;
  msgContainer.classList.add("hide");
  boxes.forEach(box => {
    box.removeAttribute("data-symbol");
    box.disabled = false;
  });
}

function showWinner(winner) {
  msg.innerText = `🎉 Congratulations! Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  boxes.forEach(box => box.disabled = true);
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].getAttribute("data-symbol");
    const valB = boxes[b].getAttribute("data-symbol");
    const valC = boxes[c].getAttribute("data-symbol");

    if (valA && valA === valB && valB === valC) {
      showWinner(valA);
      return;
    }
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const symbol = turnO ? "O" : "X";
    box.setAttribute("data-symbol", symbol);
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
