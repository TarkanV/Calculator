
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


let operators = getBtnFromValue(btns, "+", "-", "×","÷");
let numbers = getBtnFromValue(btns, 1,2,3,4,5,6,7,8,9);
let currentNode = document.querySelector("#operation-str");
let totalNode = document.querySelector("#operation-total");

function logInputs(cur, total){
    console.log(cur, total);
}

let currentInput = "0";
let totalInput = "0";
let previousInput = "0";
let input;
let operator;
let isFirstInput = true;
let operationState = false;

logInputs(currentInput, totalInput);
let resume = true;
while(resume){
    input = prompt("Input : ", "0");
    
    if(!isNaN((+input))){ 
        if(isFirstInput) {
            currentInput = input; 
            isFirstInput = false;
        }
        else if(operationState == false) 
            currentInput += input;
        else{
            previousInput = currentInput;
            currentInput = input; 
            operationState = false;
        }

        totalNode.textContent = currentInput;
        continue;
    }
    if(input == "q") resume = false;

    operationState = true;
    switch(input){
        case "+":
            currentInput = +currentInput + +previousInput;
            console.log(currentInput); 
        break;
        case "=":
            currentInput = +currentInput + +previousInput;
            console.log(currentInput);
            operationState = false;
            previousInput = 0;

        break;

    }
    
    
        
}

function checkInputValue(){

}



function doAddition(a, b){
    return a + b;
}