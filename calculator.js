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
        //getting the length of the longer array
        const len = Math.max(this._numbers.length, this._operations.length);
        const result = [];

    // alternating the values pushed into the result array to make an equation
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
       
        //eval() solves a strings like a regular math equation
        return eval(stringEquation);

      
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

}