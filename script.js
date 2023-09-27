class Die {
  constructor() {
    this.value = 0;
    this.div = document.createElement('div');
    this.div.className = 'die';
    this.roll();

    document.getElementById('diceContainer').appendChild(this.div);
    this.div.addEventListener('click', () => this.roll());
    this.div.addEventListener('dblclick', () => this.removeDie());
  }

  roll() {
    this.value = Math.floor(Math.random() * 6) + 1;
    this.updateDisplay();
  }

  updateDisplay() {
    if (advancedMode) {
      const unicodeDice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      this.div.innerText = unicodeDice[this.value - 1];
    } else {
      this.div.innerText = this.value;
    }
  }

  removeDie() {
    this.div.remove();
    const index = diceArray.indexOf(this);
    if (index !== -1) {
      diceArray.splice(index, 1);
    }
  }
}

const diceArray = [];
let advancedMode = false;

document.getElementById('generateDie').addEventListener('click', () => {
  const die = new Die();
  diceArray.push(die);
});

document.getElementById('rollDice').addEventListener('click', () => {
  for (const die of diceArray) {
    die.roll();
  }
});

document.getElementById('sumDice').addEventListener('click', function () {
  let sum = 0;
  for (const die of diceArray) {
    sum += die.value;
  }
  alert(`The total sum of dice is: ${sum}`);
});

document.addEventListener('keydown', (event) => {
  if (event.key === "Shift") {
    document.getElementById('advancedButton').style.display = 'inline-block';
  }
});

document.getElementById('advancedButton').addEventListener('click', () => {
  advancedMode = !advancedMode; // Toggle advanced mode
  for (const die of diceArray) {
    die.updateDisplay(); // Update display of each die
  }
});
