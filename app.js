const buttons = document.getElementsByTagName('button');
const buttonArr = [...buttons];

const answer = document.querySelector('.answer');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');

const equals = document.getElementById('equals');
const allClear = document.getElementById('all-clear');

answer.style.fontSize = '5em';

let pressedButtons = [];
let combinedNums;


const calculator = new Calculator();


buttonArr.forEach((button) => {
  
    button.addEventListener('click', () => {
        answer.innerText += button.value;

        if(button.className === 'numbers') {
            pressedButtons.push(button.value);
            calculator.numbers = button.value;       
        } 

    })
    
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(pressedButtons.length > 1) {
             combinedNums = pressedButtons.reduce((acc, curr) => acc + curr);
            
             if(combinedNums) {
                calculator.numbers = combinedNums;
                // console.log(calculator.numbers);
             }
        }

      
       
    })

})

equals.addEventListener('click', () => {    
       let nonNumbers = /[^0-9]/g;
       let numsRegex = /[0-9]/g;
    
       let allOperators = answer.innerText.replace(numsRegex, '');
       
       let splitNums = answer.innerText.split(nonNumbers);
       splitNums.splice(-1, 1); //removes last '' element

       let splitOperations = allOperators.split('');
       splitOperations.splice(-1, 1);  //removes last '=' element


      
        calculator._numbers = splitNums;
        calculator._operations = splitOperations;
        answer.innerText = calculator.calculate();

        if(splitOperations.length > 1) {
           answer.innerText = calculator.pmdas();
        }
})

allClear.addEventListener('click', () => {
    answer.innerText = '';
})











