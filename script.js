

// eval 를 사용하면 더 간단하게 구현이 가능하지만
// 함수 성능,보안,디버깅의 문제가 있다

let operatorEl = document.getElementsByClassName("operator");
let operandEl = document.getElementsByClassName("operand");
let resultEl = document.getElementById("calculator_result_text");

let resultText = "";
let isOperator = false;
let currentOperand = "";
let prevOperand = "";
let currentOperator = "";


let operatorClick = function(event){
    if(event.target.textContent == "="){
        console.log("equls");
        equls();
        return false;
    }
    currentOperator = event.target.textContent;
    if(isOperator){
        prevOperand = currentOperand;
        currentOperand = "";
        setResultText(event.target.textContent);
        isOperator = false;
    }
}

let operandClick = function(event){
    isOperator = true;
    currentOperand += event.target.textContent;
    setResultText(event.target.textContent);
}


let setResultText = function(text){
    resultText += text;
    resultEl.textContent = resultText;
    // console.log("resultText",resultText);
}

let equls = function(){

    let completeResult = "";
    let prevNumber = Number(prevOperand);
    let currentNumber = Number(currentOperand);
    switch(currentOperator){
        case "÷":
            completeResult = prevNumber / currentNumber;
            break;
        case "×":
            completeResult = prevNumber * currentNumber;
            break;
        case "-":
            completeResult = prevNumber - currentNumber;
            break;
        case "+":
            completeResult = prevNumber + currentNumber;
            break;
        default:
            console.log("operator err");
            break;
    }
    resultEl.textContent = completeResult;
}


for(let i = 0; i < operatorEl.length; i++){
    operatorEl[i].addEventListener("click",operatorClick,false);
}
for(let i = 0; i < operandEl.length; i++){
    operandEl[i].addEventListener("click",operandClick,false);
}


