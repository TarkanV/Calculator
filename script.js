
let btnBox = document.querySelector(".button-box");
console.log(btnBox);

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


let operators = getBtnFromValue(btns, "+", "-", "×","÷","=");
let numbers = getBtnFromValue(btns, 1,2,3,4,5,6,7,8,9);

let currentNode = document.querySelector("#operation-str");
let totalNode = document.querySelector("#operation-total");

function logInputs(cur, total){
    console.log(cur, total);
}

let currentInput = "0";
let totalInput = "0";
let previousInput = null;
let input;
let operator;
let isFirstInput = true;
let operationState = false;

logInputs(currentInput, totalInput);
let resume = true;

numbers.forEach( (number) => number.node.addEventListener("click", (e) =>{
 
    input = e.target.value;
    
    if(!isNaN((+input))){ 
        if(isFirstInput) {
            currentInput = input; 
            isFirstInput = false;
        }
        //fill up the input if no operator has been used just before
        else if(operationState == false) 
            currentInput += input;
        //Input new number to operate after the first    
        else{
            previousInput = currentInput;
            currentInput = input; 
            operationState = false;
            console.log("happened" + currentInput);
        }

        totalNode.textContent = currentInput;
    }
    })  
   
);
/*
        operationState = true;
        if(input == "="){
            
            currentInput = operate(+currentInput, +previousInput, operator);
            console.log("Equals : " + currentInput);
            //operationState = false;
            previousInput = null;
            operator = null;
        }
        //If an Operator is the input
        else{
            if(previousInput && operator) currentInput = operate(+currentInput, +previousInput, operator);
            operator = input;
             console.log(currentInput); 
        }

    
    
    
    */    


function checkInputValue(){

}

function operate(a, b, operation){
    switch(operation){
        case "+": return b+a;
        case "-": return b-a;
        case "*": return b*a;
        case "\/": 
        return b/a;
    }

}

