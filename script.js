
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

function makeButtons(parent, ...values){
    let length = values.length;
    let buttons = [];
    for(value of values)
        buttons[buttons.length] = new Button(parent, value);
    return buttons;      
}

let btns = makeButtons(btnBox,"C","⌫","÷"); 
btns += makeButtons(btnBox,1,2,3,"×",4,5,6,"-",7,8,9,"+", );
btns += makeButtons(btnBox, 0,".","=");


