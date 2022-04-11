

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
    resultText = completeResult.toString();
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
    subResultEl.textContent = "";
}


for(let i = 0; i < operatorEl.length; i++){
    operatorEl[i].addEventListener("click",operatorClick,false);
}
for(let i = 0; i < operandEl.length; i++){
    operandEl[i].addEventListener("click",operandClick,false);
}

acEl.addEventListener("click",allClear,false);



//스택계산기
// 중위식 입력 -> 입력한 중위식을 후위식으로 변경 -> 후위식 연산

//연산자 우선순위
function operatorRank(operator){
    switch(operator){
        case "*":
        case "/":
            return 3;
        case "+":
        case "-":
            return 2;
        case "(":
            return 1;
        default:
            return -1;
    }
}

//연산자 우선순위 비교
function comparisonOperator(operator1,operator2){
    return Number(operator1) >= Number(operator2)
}


// 중위식 to 후위식
// stack : 배열,스택
// postFixAr : 후위식 배열
// infixAr : 중위식 배열(6 + 3 / 2)
function conversionPostFix(){
    // console.log("abc");
    let stack = [];
    let postFixAr = [];

    //계산식 분해
    let inFixAr = String("6+3*2").replace(/\s/g, '').match(/[\d\.]+|[^\d\.]/g).reverse(); 
    // console.log(inFixAr);
    for(let i = 0; i < inFixAr.length; i++){
        // postFixAr.push(inFixAr[i]);
        if(!isNaN(inFixAr[i])){
            //피연산자는 후위식 배열에 추가
            postFixAr.push(inFixAr[i]);
        }else{
            //연산자는 stack에 저장
            if(stack.length){
                let op1 = operatorRank(stack[stack.length-1]);
                let op2 = operatorRank(inFixAr[i]);
                if(comparisonOperator(op1,op2)){
                    postFixAr.push(stack[stack.length-1]);
                    stack.pop();
                }
            }
            stack.push(inFixAr[i]);
        }
    }
    for(let i = 0; i < stack.length; i++){
        postFixAr.push(stack[i]);
    }
    console.log(postFixAr);
    console.log(stack);
}

conversionPostFix();
