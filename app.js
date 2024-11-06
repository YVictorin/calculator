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
            calculator.numbers = button.value;  //the calculator will push the button's value into its numbers array     
        } 

    })
    
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {

        //if there is more than one number concatenate them
        if(pressedButtons.length > 1) {
             combinedNums = pressedButtons.reduce((acc, curr) => acc + curr);
            
             if(combinedNums) {
                calculator.numbers = combinedNums;
             }
        }
   
       
    })

})

equals.addEventListener('click', () => {    
       let nonNumbers = /[^0-9]/g;
       let numsRegex = /[0-9]/g;
    
       //gets all operators that the user pressed and removes numbers
       let allOperators = answer.innerText.replace(numsRegex, '');
       
       //removes the operators from the numbers array
       let splitNums = answer.innerText.split(nonNumbers);
       splitNums.splice(-1, 1); //removes last '' element

       let splitOperations = allOperators.split('');
       splitOperations.splice(-1, 1);  //removes last '=' element


      
        calculator._numbers = splitNums;
        calculator._operations = splitOperations;
        answer.innerText = calculator.calculate();

        //for when the user presses more than one operator at a time
        if(splitOperations.length > 1) {
           answer.innerText = calculator.pmdas();
        }
})

//when the AC button is clicked the answer screen is reset
allClear.addEventListener('click', () => {
    answer.innerText = '';
})











