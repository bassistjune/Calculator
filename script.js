

// eval 를 사용하면 더 간단하게 구현이 가능하지만
// 함수 성능,보안,디버깅의 문제가 있다

let operatorEl = document.getElementsByClassName("operator");
let operandEl = document.getElementsByClassName("operand");
let resultEl = document.getElementById("calculator_result_text");


let operatorClick = function(event){
    switch(event.target.textContent){
        case "÷":
            console.log("devic");
            break;
        case "×":
            console.log("times");
            break;
        case "-":
            console.log("마이너스");
            break;
        case "+":
            console.log("플러스");
            break;
        case "=":
            console.log("결과");
            break;
        default:
            console.log("OperatorErr");
    }
    resultEl.textContent = event.target.textContent;

}

let operandClick = function(event){
    resultEl.textContent = event.target.textContent;
}

for(let i = 0; i < operatorEl.length; i++){
    operatorEl[i].addEventListener("click",operatorClick,false);
}
for(let i = 0; i < operandEl.length; i++){
    operandEl[i].addEventListener("click",operandClick,false);
}


