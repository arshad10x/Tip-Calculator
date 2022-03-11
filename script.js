
const bill = document.getElementById('cost');
const peopleNum = document.getElementById('peopleNum');
const btns = document.querySelectorAll('button');
const customTip = document.getElementById('customTip');
const resetBtn = document.getElementById('reset');
const tipTotalResult = document.getElementById('tipTotal');
const personTotalResult = document.getElementById('personTotal');

let billAmount = 0;
let tipAmount = 0;
let numOfPeople = 1;


function calculate() {
    if (billAmount && tipAmount && numOfPeople) {

        // calculate the total bill per person
        let billPerPerson = billAmount / numOfPeople;
        billPerPerson = parseFloat(billPerPerson.toFixed(2));
        
        // calculate the total tip per person
        let tipPerPerson = billPerPerson * tipAmount;
        tipPerPerson = parseFloat(tipPerPerson.toFixed(2));
        console.log(Math.floor(tipPerPerson))

        // calculate the total bill
        let totalAmount = billPerPerson + tipPerPerson;
        
        tipTotalResult.innerText = `$${tipPerPerson}`;
        personTotalResult.innerText = `$${totalAmount}`;
        resetBtn.classList.add('active');

        return;
    }
    
    tipTotalResult.innerText = '$0.00';
    personTotalResult.innerText = '$0.00';
}


function isValidInputValue(inputVal) {
    // if input is less than 0 in people's number, show error message
    if (inputVal < 1) {
        const invalidMsg = document.querySelector('.invalid-msg');
        invalidMsg.classList.add('invalid');
        peopleNum.classList.add('invalid');
    } else {
        const invalidMsg = document.querySelector('.invalid-msg');
        invalidMsg.classList.remove('invalid');
        peopleNum.classList.remove('invalid');
    }
}


btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const clicked = e.target;
        const btnEl = e.target.value;
        tipAmount = btnEl;

        clicked.classList.toggle('clicked');
        
        calculate();
    });
});

customTip.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const customValue = inputValue / 100;
    tipAmount = parseFloat(customValue);
    calculate();
})

bill.addEventListener('change', (e) => {
    let billValue = e.target.value.trim();
    // Check if the input value is valid
    billValue = billValue.replace(/[^0-9.]+/g, "");
    billValue = billValue || "";
    bill.value = billValue;
    billAmount = parseFloat(billValue).toFixed(2);
    calculate();
});

peopleNum.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    isValidInputValue(inputValue);

    peopleNum.value = inputValue;
    numOfPeople = parseInt(inputValue, 10);
    calculate();
});

resetBtn.addEventListener('click', () => {
    billAmount = 0;
    tipAmount = 0;
    numOfPeople = 1;
    bill.value = 0;
    peopleNum.value = 0;
    personTotalResult.innerText = '$0.00';
    tipTotalResult.innerText = '$0.00';

    resetBtn.classList.remove('active');
});