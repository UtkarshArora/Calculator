
        class Calculator{
            constructor(previousOperandTextElement,currentOperandTextElement)
            {
                this.previousOperandTextElement=previousOperandTextElement;
                this.currentOperandTextElement=currentOperandTextElement;
                this.clear();
            }
            clear()
            {
                this.currentOperand='';
                this.previousOperand='';
                this.operation=undefined;
            }
            delete()
            {
                if(this.currentOperand==='')
                    return;
                this.currentOperand=this.currentOperand.toString().slice(0,-1);
                this.updateDisplay();
            }
            appendNumber(number)
            {
                if(number==='.' && this.currentOperand.includes('.'))
                    return;
                this.currentOperand=this.currentOperand.toString()+number.toString();
            }
            chooseOperation(operation)
            {
                if(this.currentOperand=='')
                    return;
                if(this.previousOperand!='')
                   {
                       compute();
                   }
                this.operation=operation;
                this.previousOperand=this.currentOperand;
                this.currentOperand='';
                
                // switch (operation){
                //     case '+':
                //         this.currentOperand=this.previousOperand+this.currentOperand;
                //         break;
                //     case '-':
                //         this.currentOperand=this.currentOperand+this.previousOperand;
                //         break;
                //     case '*':
                //         this.currentOperand=this.currentOperand*this.previousOperand;
                //         break;
                //     case '÷':
                //         this.currentOperand=this.previousOperand/this.currentOperand;
                //         break;
                //     default:
                //     }
            }
            compute()
            {
                let computation;
                const current=parseFloat(this.currentOperand);
                const prev=parseFloat(this.previousOperand);

                if(isNaN(this.previousOperand) || isNaN(this.currentOperand))
                    return;
                switch(this.operation){

                    case '+':
                        computation=prev+current;
                        break;
                    case '-':
                        computation=prev-current;
                        break;
                    case '*':
                        computation=prev*current;
                        break;
                    case '÷':
                        computation=prev/current;
                        break;
                }
                this.currentOperand=computation;
                this.operation=undefined;
                this.previousOperand='';
            }

            getDisplayNumber(number)
            {
                let stringNumber=number.toString();
                let integerDigits=parseFloat(stringNumber.split('.')[0]);
                let decimalDigits=stringNumber.split('.')[1];
                let integerDisplay;
                if(isNaN(integerDigits)){
                    integerDisplay='';
                }
                else{
                    integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0});
                }
                if(decimalDigits!=null){
                    return `${integerDisplay}.${decimalDigits}`;
                }
                else{
                    return integerDisplay;
                }
            }
            updateDisplay()
            {
                // if(this.currentOperand=='')
                //     return;
                this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand);
                if(this.operation!=null)
                {
                    this.previousOperandTextElement.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                }
                else{
                    this.previousOperandTextElement.innerText='';
                }
            }
        }
        
        
        const numberButtons=document.querySelectorAll('[data-number]');
        const operationButtons=document.querySelectorAll('[data-operation]');
        const equalsButton=document.querySelector('[data-equals]');
        const deleteButton=document.querySelector('[data-delete]');
        const allClearButton=document.querySelector('[data-all-clear]');
        const previousOperandTextElement=document.querySelector('[data-previous-operand]');
        const currentOperandTextElement=document.querySelector('[data-current-operand]');
        
        const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);
        
        
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText)
                calculator.updateDisplay()
            })
        })

        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText);
                calculator.updateDisplay();
            })
        })

        allClearButton.addEventListener('click',() =>{
            calculator.clear();
            calculator.updateDisplay();
        })

        equalsButton.addEventListener('click',()=>{
            calculator.compute();
            calculator.updateDisplay();
        })

        deleteButton.addEventListener('click',()=>{
            calculator.delete();
            calculator.updateDisplay();
        })