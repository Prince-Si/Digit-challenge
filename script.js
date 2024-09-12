let lhs = "";
let rhs = 0;
let digits = [];
let currentEquation = {};
let usedDigits = new Set(); // Track used digits
const operators = ['+', '-', '*', '/']; // List of valid operators

function generateRandomEquation() {
  let validSolutionFound = false;

  while (!validSolutionFound) {
    const num1 = Math.floor(Math.random() * 10) + 1; // Avoid 0 to prevent division by zero
    const num2 = Math.floor(Math.random() * 10) + 1; // Avoid 0
    const randomOperator1 = operators[Math.floor(Math.random() * operators.length)];
    const randomOperator2 = operators[Math.floor(Math.random() * operators.length)];
    
    // Pre-calculate valid digit1 and digit2
    let validDigit1, validDigit2;

    // Evaluate the equation based on operators
    switch (randomOperator1) {
      case '+':
        validDigit1 = Math.floor(Math.random() * 10);
        if (randomOperator2 === '*') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 + (validDigit1 * validDigit2);
        } else if (randomOperator2 === '/') {
          validDigit2 = Math.floor(Math.random() * 9) + 1; // Prevent division by 0
          rhs = num1 + Math.floor(validDigit1 / validDigit2);
        } else {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 + validDigit1 + validDigit2;
        }
        break;

      case '-':
        validDigit1 = Math.floor(Math.random() * 10);
        if (randomOperator2 === '*') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 - (validDigit1 * validDigit2);
        } else if (randomOperator2 === '/') {
          validDigit2 = Math.floor(Math.random() * 9) + 1; // Prevent division by 0
          rhs = num1 - Math.floor(validDigit1 / validDigit2);
        } else {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 - validDigit1 - validDigit2;
        }
        break;

      case '*':
        validDigit1 = Math.floor(Math.random() * 10);
        if (randomOperator2 === '+') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 * validDigit1 + validDigit2;
        } else if (randomOperator2 === '-') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 * validDigit1 - validDigit2;
        } else if (randomOperator2 === '/') {
          validDigit2 = Math.floor(Math.random() * 9) + 1; // Prevent division by 0
          rhs = num1 * validDigit1 / validDigit2;
        } else {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = num1 * validDigit1 * validDigit2;
        }
        break;

      case '/':
        validDigit1 = Math.floor(Math.random() * 9) + 1; // Prevent division by 0
        if (randomOperator2 === '+') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = Math.floor(num1 / validDigit1) + validDigit2;
        } else if (randomOperator2 === '-') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = Math.floor(num1 / validDigit1) - validDigit2;
        } else if (randomOperator2 === '*') {
          validDigit2 = Math.floor(Math.random() * 10);
          rhs = Math.floor(num1 / validDigit1) * validDigit2;
        } else {
          validDigit2 = Math.floor(Math.random() * 9) + 1; // Prevent division by 0
          rhs = Math.floor(num1 / validDigit1) / validDigit2;
        }
        break;
    }

    // Ensure the equation is valid and rhs is an integer within reasonable bounds
    if (!isNaN(rhs) && rhs >= 0 && rhs <= 100) {
      validSolutionFound = true;
      currentEquation = {
        num1: num1,
        num2: num2,
        op1: randomOperator1,
        op2: randomOperator2,
        digit1: validDigit1,
        digit2: validDigit2,
        result: rhs
      };
    }
  }

  resetGame();
  document.getElementById('lhs').innerText = `${currentEquation.num1} ${currentEquation.op1} ? ${currentEquation.op2} ?`;
  document.getElementById('rhs').innerText = rhs;
}

function checkEquation() {
  const [digit1, digit2] = digits;
  const equation = `${currentEquation.num1} ${currentEquation.op1} ${digit1} ${currentEquation.op2} ${digit2}`;
  const calculated = eval(equation); // This will automatically apply BODMAS

  if (Math.floor(calculated) === currentEquation.result) {
    alert("Correct! Proceeding to next level.");
    generateRandomEquation();
  } else {
    alert("Incorrect! Try again.");
  }
}

function handleDigitClick(e) {
  const digit = parseInt(e.target.innerText);

  if (usedDigits.has(digit)) {
    alert("You already used this digit.");
    return;
  }

  if (digits.length < 2) {
    digits.push(digit);
    usedDigits.add(digit); // Add to used digits
    updateEquationDisplay();
    
    if (digits.length === 2) {
      checkEquation();
    }
  }
}

function handleDelete() {
  if (digits.length > 0) {
    const removedDigit = digits.pop();
    usedDigits.delete(removedDigit); // Allow reuse of deleted digit
    updateEquationDisplay();
  }
}

function updateEquationDisplay() {
  const [digit1, digit2] = digits;
  document.getElementById('lhs').innerText = `${currentEquation.num1} ${currentEquation.op1} ${digit1 || "?"} ${currentEquation.op2} ${digit2 || "?"}`;
}

function handleSkipLevel() {
  alert("Skipping to next level.");
  generateRandomEquation();
}

function resetGame() {
  digits = [];
  usedDigits.clear();
  document.getElementById('lhs').innerText = "";
}

document.querySelectorAll('.digit-btn').forEach(btn => {
  btn.addEventListener('click', handleDigitClick);
});

document.getElementById('delete-btn').addEventListener('click', handleDelete);
document.getElementById('skip-btn').addEventListener('click', handleSkipLevel);

// Start the game
generateRandomEquation();
