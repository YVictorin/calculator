class Calculator {
    _operations = [];
    _numbers = [];
   

    constructor(number = '', operator = '') {
        this._number = number;
        this._operator = operator;
    }


    get numbers(){
        return this._numbers;
    }


    set numbers(value) {
        if(value === NaN) {
            throw new Error('That number is not allowed')
        } else {
            this._numbers.push(Number(value));
        }
        
    }

    get operations() {
       return this._operations
    }

    set operations(newOperation) {
        this._operations.push(newOperation);   
    }



    calculate() {
        if(this.errorCheck()){
            return this.errorCheck();
        }

        this._operations.forEach((operation) => {
            switch(operation) {
                case '−':
                    this._number = this.subtract();
                    break;
                case '+':
                    this._number = this.add();
                    break;
                case '÷':
                    this._number = this.divide();
                    break;
                case 'x':
                    this._number = this.multiply();
                    break;
                default:
                    return -1;
            } 
        })

        return this._number;
    }

    pmdas() {     
        if(this.errorCheck()){
            return this.errorCheck();
        }

        //getting the length of the longer array
        const len = Math.max(this._numbers.length, this._operations.length);
        const result = [];

    // alternating the values pushed into the result array in order to make an equation
        for(let i = 0; i < len; i++) {
            if(this._numbers[i]) {
                result.push(this._numbers[i])
            }

            if(this._operations[i]) {
                result.push(this._operations[i]);
            }

        }

        //removes the commas from the array named result and changes the symbols in the operators array to * / -
        let stringEquation = String(result).replace(/[,]/g , '').replace(/[x]/g, '*').replace(/[÷]/g, '/').replace(/[−]/g, '-');

        //eval() solves a string like a regular math equation, this is also rounding two decimal places
        return Math.round(eval(stringEquation) * 100) / 100;

      
    }


    add() {
        return this._numbers.reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue));
    }

    subtract() {
        return this._numbers.reduce((previousValue, currentValue) => previousValue - currentValue)
    }

   multiply() {
    return this._numbers.reduce((previousValue, currentValue) => previousValue * currentValue);
   }

   divide() {
    return this._numbers.reduce((previousValue, currentValue) => previousValue / currentValue);
   }


   

   errorCheck() {     
        //if the user entered nothing
        if(this._operations.length === 0 || this._numbers.length === 0) {
            return 'try again';
        }
        //check to see if the last number the user entered was 0 and a division sign
        if(this._operations[this._operations.length - 1] === '÷' && this._numbers[this._numbers.length - 1] === '0') {
            return "err DIV/0!";
        } 


   }

}