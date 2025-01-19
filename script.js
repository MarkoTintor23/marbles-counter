class MarblesApp {
  constructor() {
    this.totalMarbles = 0;
    this.totalBox = 0;
    this.boxCount = document.querySelector("#box-count");
    this.marbleCount = document.querySelector("#marbles-count");
    this.boxContainer = document.querySelector("#boxes-container");
    this.addBoxButton = document.querySelector("#adds-box-btn");

    this.initialize();
  }
  initialize() {
    this.addBoxButton.addEventListener("click", () => {
      const newBox = new MarbleBox(
        this.boxContainer,
        this.updateMarbles.bind(this)
      );

      this.totalBox++;
      this.boxCount.textContent = `Boxes: ${this.totalBox}`;

      this.updateMarbles();
    });
  }

  updateMarbles() {
    let totalMarbles = 0;

    const boxes = this.boxContainer.querySelectorAll(".marble-box");
    boxes.forEach((box) => {
      const marbleCount = parseInt(box.querySelector("span").textContent);
      totalMarbles += marbleCount;
    });

    this.totalMarbles = totalMarbles;
    this.marbleCount.textContent = `Marbles: ${this.totalMarbles}`;
  }
}
class MarbleBox {
  constructor(parentContainer, onMarbleChange) {
    this.parentContainer = parentContainer;
    this.onMarbleChange = onMarbleChange;
    this.marbleCount = 0;

    this.boxElement = null;
    this.minusButton = null;
    this.plusButton = null;
    this.marbleDisplay = null;

    this.createBox();
  }

  createBox() {
    this.boxElement = document.createElement("div");
    this.boxElement.classList.add("marble-box");

    this.marbleDisplay = document.createElement("span");
    this.marbleDisplay.textContent = this.marbleCount;
    this.boxElement.appendChild(this.marbleDisplay);

    this.minusButton = document.createElement("button");
    this.minusButton.textContent = "-";
    this.minusButton.addEventListener("click", () => this.decrementMarble());
    this.boxElement.appendChild(this.minusButton);

    this.plusButton = document.createElement("button");
    this.plusButton.textContent = "+";
    this.plusButton.addEventListener("click", () => this.incrementMarble());
    this.boxElement.appendChild(this.plusButton);

    this.parentContainer.appendChild(this.boxElement);
  }

  incrementMarble() {
    this.marbleCount++;
    this.updateDisplay();
    this.onMarbleChange();
  }

  decrementMarble() {
    if (this.marbleCount > 0) {
      this.marbleCount--;
      this.updateDisplay();
      this.onMarbleChange();
    }
  }

  updateDisplay() {
    this.marbleDisplay.textContent = this.marbleCount;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const app = new MarblesApp();
});
