let balance = 5000;
const symbols = ['🍒', '🍋', '🍇', '🍊', '🍉'];
const slots = [
  document.getElementById('row1'),
  document.getElementById('row2'),
  document.getElementById('row3')
];
const resultDisplay = document.getElementById('result');
const balanceDisplay = document.getElementById('balance');

function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

function spin() {
  for (let i = 0; i < slots.length; i++) {
    slots[i].innerHTML = '';
    for (let j = 0; j < 3; j++) {
      const symbol = getRandomSymbol();
      const slotElement = document.createElement('div');
      slotElement.className = 'slot';
      slotElement.innerText = symbol;
      slots[i].appendChild(slotElement);
    }
  }

  checkResult();
}

function checkResult() {
  // Check horizontal lines
  for (let i = 0; i < slots.length; i++) {
    const symbolsSet = new Set([
      slots[i].children[0].innerText,
      slots[i].children[1].innerText,
      slots[i].children[2].innerText
    ]);

    if (symbolsSet.size === 1) {
      handleWin(symbolsSet.values().next().value);
      return;
    }
  }

  // Check vertical lines
  for (let j = 0; j < 3; j++) {
    const symbolsSet = new Set([
      slots[0].children[j].innerText,
      slots[1].children[j].innerText,
      slots[2].children[j].innerText
    ]);

    if (symbolsSet.size === 1) {
      handleWin(symbolsSet.values().next().value);
      return;
    }
  }

  // Check diagonals
  const diagonal1Set = new Set([
    slots[0].children[0].innerText,
    slots[1].children[1].innerText,
    slots[2].children[2].innerText
  ]);

  const diagonal2Set = new Set([
    slots[0].children[2].innerText,
    slots[1].children[1].innerText,
    slots[2].children[0].innerText
  ]);

  if (diagonal1Set.size === 1) {
    handleWin(diagonal1Set.values().next().value);
    return;
  }

  if (diagonal2Set.size === 1) {
    handleWin(diagonal2Set.values().next().value);
    return;
  }

  // If no win on horizontal, vertical, or diagonal lines
  handleLoss();
}

function handleWin(symbol) {
  switch (symbol) {
    case '🍒':
      updateBalance(2);
      break;
    case '🍋':
      updateBalance(5);
      break;
    // Add more cases for other symbols
  }

  resultDisplay.innerText = `Congratulations! You won $${getWinAmount(symbol)}!`;
}

function handleLoss() {
  updateBalance(-1); // Decrease by a fixed amount for each loss
  resultDisplay.innerText = 'Sorry, try again!';
}

function updateBalance(multiplier) {
  const amount = multiplier * 100;
  balance += amount;
  balanceDisplay.innerText = balance;
}

function getWinAmount(symbol) {
  switch (symbol) {
    case '🍒':
      return 2 * 100; // x2 times the money
    case '🍋':
      return 5 * 100; // x5 times the money
    // Add more cases for other symbols
  }
}

// ... (rest of your existing code)
