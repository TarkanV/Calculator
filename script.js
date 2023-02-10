
let btnBox = document.querySelector(".button-box");


function Button(parent, value){
    this.value = value;
    this.node = document.createElement("button");
    this.node.classList.add("key");
    this.node.setAttribute("value", value);
    this.node.textContent = value;
    let toast = "test";
    parent.appendChild(this.node);  
      
}

function addClasses(cls, nodes){
    for (node of nodes){
        node.classList.toggle(cls);
    }
}


function makeButtons(parent, ...values){
    let length = values.length;
    let buttons = [];
    for(value of values)
        buttons[buttons.length] = new Button(parent, value);
    return buttons;      
}

function getBtnFromValue(buttons, ...values){

    return buttons.reduce((acc, cbutton) =>{
         return values.includes(cbutton.value) ? acc.concat(cbutton) : acc;
    }, []);
 }




let btns = makeButtons(btnBox,"C","⌫","÷"); 
btns = btns.concat(makeButtons(btnBox,1,2,3,"×",4,5,6,"-",7,8,9,"+", ));
btns = btns.concat(makeButtons(btnBox, 0,".","="));



let numbers = getBtnFromValue(btns, 1,2,3,4,5,6,7,8,9,0,"⌫","C",".");
let operators = getBtnFromValue(btns, "+", "-", "×","÷","=");

let currentNode = document.querySelector("#operation-str");
let totalNode = document.querySelector("#operation-total");

let currentInput = "0";
let totalInput = "0";

let previousInput = null;
let input;
let operator;
let isFirstInput = true;
let operationState = false;
let firstNbr = true;
let backspaceState = false;


let resume = true;

numbers.forEach( (number) => number.node.addEventListener("click", (e) =>{
 
    input = e.target.value;

    //Checking numbers, C and backspace inputs 
    if(!isNaN((+input))){ 
        if(isFirstInput) {
            currentInput = input; 
            isFirstInput = false;
            previousInput = 0;
            firstNbr = false;
        }
        //fill up the input if no operator has been used just before
        else if(!firstNbr && currentInput !== "0" && currentInput.length < 9) {
           
            currentInput += input;
            
        }
        //Input new number to operate after the first    
        else if (currentInput.length != 9 || operationState){
            if(!backspaceState) previousInput = currentInput;
            else backspaceState = false;
            currentInput = input; 
            operationState = false;
            firstNbr = false;
            
        }
    
    }
    else if(input == "⌫"){
        if(previousInput == null || firstNbr){

        }
        else if(currentInput.length != 1)
            currentInput = currentInput.slice(0, currentInput.length-1);
        else {
            currentInput = "0";
            backspaceState = true;
            
        }
    }
    else if(input == "C"){
        currentInput = "0";

        isFirstInput = true;
        previousInput = null;
        operator = null;
        operationState = false;
        currentNode.textContent = "0";
        
    }
    else if(input == "."){
        if(!currentInput.includes(".")){
            currentInput += ".";
            firstNbr = false;
            isFirstInput = false;
            
        }
    }

    totalNode.textContent = currentInput;
    })  
   
);
//Listening to operator inputs
operators.forEach(oprt => oprt.node.addEventListener("click", (e) => {
    
    input = e.target.value;
    
    if(input == "="){
        if(!operator){
            
        }
        else if(operationState == false && previousInput !== null ){
            
            currentNode.textContent = `${previousInput} ${operator} ${currentInput} = `;
            currentInput = operate(+previousInput, +currentInput, operator);

            //Checks if input is too big
            
            if(currentInput == Infinity){
                totalNode.textContent = "0 DIVISION";
                currentInput = 0;
            }
            else if(currentInput > 999999999){
                totalNode.textContent = "TOO LONG";
                currentInput = 0;
            }

            else{
                currentInput = currentInput.toString(); 
                while(currentInput.length >= 10)
                    currentInput = currentInput.slice(0, currentInput.length-1);
                currentInput = +currentInput;
                //currentNode.textContent += currentInput;
                totalNode.textContent = currentInput;
            }
            
            
            //operationState = false;
            previousInput = null;
            operator = null;
            operationState = true;
            firstNbr = true;
        }
    }
    //If an Operator is the input
    else{
        operationState = true;
        firstNbr = true;
         if(previousInput !== null && operator) {
            currentInput = operate(+previousInput, +currentInput, operator);
            previousInput = null;    
        }

        operator = input;
        

        if(currentInput == Infinity){
            totalNode.textContent = "DIVISION BY 0";
            currentInput = 0;
        }
        else if(currentInput > 999999999){
            totalNode.textContent = "TOO LONG";
            currentInput = 0;
        }
        
        else {   
            currentInput = currentInput.toString(); 
            while(currentInput.length >= 10)
                    currentInput = currentInput.slice(0, currentInput.length-1);
            currentInput = +currentInput;
            totalNode.textContent = currentInput;
            currentNode.textContent = `${currentInput} ${operator}`;
        }
        if(isFirstInput) isFirstInput = false;
    }

    
})
);   
    
 


function checkInputValue(){

}

function operate(a, b, operation){
    switch(operation){
        case "+": return a+b;
        case "-": return a-b;
        case "×": return a*b;
        case "÷": 
        return a/b;
    }

}
