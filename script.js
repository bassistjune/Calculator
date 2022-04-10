

// eval 를 사용하면 더 간단하게 구현이 가능하지만
// 함수 성능,보안,디버깅의 문제가 있다


//변수 초기화
let operatorEl = document.getElementsByClassName("operator");
let operandEl = document.getElementsByClassName("operand");
let resultEl = document.getElementById("calculator_result_text");
let subResultEl = document.getElementById("calculator_sub_result_text");
let acEl = document.getElementById("allClear");

let resultText = "";
let isOperator = false;
let currentOperand = "";
let prevOperand = "";
let currentOperator = "";


//연산자 클릭 이벤트
let operatorClick = function(event){
    if(event.target.textContent == "="){
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


//피연산자 클릭 이벤트
let operandClick = function(event){
    if(event.target.textContent == "." && currentOperand.includes(".")){
        alert("잘못된 숫자 입니다.");
        return false;
    }
    isOperator = true;
    currentOperand += event.target.textContent;
    setResultText(event.target.textContent);
}


// 화면 표시
let setResultText = function(text){
    resultText += text;
    resultEl.textContent = resultText;
}


// 계산식 로직
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
    currentOperand = completeResult;
    subResultEl.textContent = `${prevNumber} ${currentOperator} ${currentNumber}`;
    resultEl.textContent = completeResult;
    currentOperator = "";
    
}

//AC 로직
let allClear = function(){
    resultText = "0";
    isOperator = false;
    currentOperand = "";
    prevOperand = "";
    currentOperator = "";
    resultEl.textContent = resultText;
}


for(let i = 0; i < operatorEl.length; i++){
    operatorEl[i].addEventListener("click",operatorClick,false);
}
for(let i = 0; i < operandEl.length; i++){
    operandEl[i].addEventListener("click",operandClick,false);
}

acEl.addEventListener("click",allClear,false);

