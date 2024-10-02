import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/main.css';
import '../styles/util.css';

// get elements
const resetButton = document.querySelector('.reset-button');
const tipButtons = document.querySelectorAll('.tip-button');
const tipCustom = document.getElementById('custom-tip');
const billInput = document.getElementById('input-bill');
const peopleInput = document.getElementById('input-people');
const totalTipDisplay = document.getElementById('total-tip');
const totalPersonDisplay = document.getElementById('person-total-tip');
const invalidInput = document.getElementById('invalid-input-text');

// create elements
let selectedTip = 0;
// functions

function calcTip() {
  const bill = getBill();
  const tipTotal = (bill * selectedTip) / 100;
  totalTipDisplay.innerText = `$${tipTotal.toFixed(2)}`;
  const billTotal = bill + tipTotal;

  return billTotal;
}

function peopleTip() {
  const people = getPeople();

  if (people === 0) {
    invalidInput.style.display = 'block';
    return;
  } else {
    invalidInput.style.display = 'none';
  }
  const total = calcTip();
  const peopleTotal = total / people;
  totalPersonDisplay.innerText = `$${peopleTotal.toFixed(2)}`;
}

function getBill() {
  const bill = parseFloat(billInput.value.trim());
  if (isNaN(bill) || bill < 0) {
    return 0;
  }

  return bill;
}

function getPeople(e) {
  const people = parseInt(peopleInput.value.trim());
  if (isNaN(people) || people < 0) {
    return 0;
  }
  return people;
}

function customTip() {
  selectedTip = parseFloat(tipCustom.value) || 0;
  calcTip();
}

function getTip(e) {
  const tips = parseInt(e.target.value);
  return isNaN(tips) ? 0 : tips;
}

function resetCalculator() {
  billInput.value = '';
  peopleInput.value = '';
  tipCustom.value = '';

  totalPersonDisplay.innerText = '$0.00';
  totalTipDisplay.innerText = '$0.00';

  tipButtons.forEach((button) => {
    button.classList.remove('selected');
  });
  selectedTip = 0;
}

// event listeners
resetButton.addEventListener('click', resetCalculator);
billInput.addEventListener('input', calcTip);
peopleInput.addEventListener('input', peopleTip);
tipCustom.addEventListener('blur', customTip);
tipButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    selectedTip = getTip(e);
    calcTip();
  });
});
