



// eval 를 사용하면 더 간단하게 구현이 가능하지만
// 함수 성능,보안,디버깅의 문제가 있다


//변수 초기화
let operatorEl = document.getElementsByClassName("operator");
let operandEl = document.getElementsByClassName("operand");
let resultEl = document.getElementById("calculator_result_text");
let subResultEl = document.getElementById("calculator_sub_result_text");
let acEl = document.getElementById("allClear");

// let resultText = "";
// let isOperator = false;
// let currentOperand = "";
// let prevOperand = "";
// let currentOperator = "";


//연산자 클릭 이벤트
function operatorClick(event){
    if(event.target.textContent == "="){
        equls();
        return false;
    }
    setResultText(event.target.textContent);
}


//피연산자 클릭 이벤트
function operandClick(event){
    if(event.target.textContent == "." && currentOperand.includes(".")){
        alert("잘못된 숫자 입니다.");
        return false;
    }
    setResultText(event.target.textContent);
}


// 화면 표시
function setResultText(text){
    if(resultEl.value == "0"){
        resultEl.value = text;
    }else{
        resultEl.value += text;
    }
}

// 계산식 로직
function equls(){
    let infix = resultEl.value;
    let postfix = conversionPostFix(infix);
    let result = postFixCalculation(postfix);
    subResultEl.textContent = resultEl.value;
    resultEl.value = result;
    // console.log(result);
}

//AC 로직
function allClear(){
    resultEl.value = "0";
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
        case "×":
        case "÷":
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
function conversionPostFix(inFix){
    // console.log("abc");
    let stack = [];
    let postFixAr = [];

    //계산식 분해
    let inFixAr = String(inFix).replace(/\s/g, '').match(/[\d\.]+|[^\d\.]/g); 
    console.log(inFixAr);
    for(let i = 0; i < inFixAr.length; i++){
        // postFixAr.push(inFixAr[i]);
        if(!isNaN(inFixAr[i])){
            //피연산자는 후위식 배열에 추가
            postFixAr.push(inFixAr[i]);
        }else{
            //연산자는 stack에 저장
            // '(' 괄호는 스택에 저장
            if(inFixAr[i] == "("){
                stack.push(inFixAr[i]);
            }else if(inFixAr[i] == ")"){
                // ')' 괄호는 '(' 괄호가 나올때까지 후위식에 저장
                while(1){
                    let popOp = stack.pop();
                    if(popOp == "("){
                        break;
                    }
                    postFixAr.push(popOp);
                }
            }else{
                if(stack.length){
                    let op1 = operatorRank(stack[stack.length-1]);
                    let op2 = operatorRank(inFixAr[i]);
                    //우선순위가 높거나 같은연산자가 있으면
                    //후위배열에 푸시 후 스택 제거
                    if(comparisonOperator(op1,op2)){
                        postFixAr.push(stack[stack.length-1]);
                        stack.pop();
                    }
                }
                stack.push(inFixAr[i]);
            }
        }
    }
    while (stack.length) {
        postFixAr.push(stack.pop());
      }
    return postFixAr;
}

function postFixCalculation(postFixAr){
    let stack = [];
    for(let i = 0; i < postFixAr.length; i++){
        if(!isNaN(postFixAr[i])){
            //피연산자는 스택에 저장
            stack.push(postFixAr[i]);
        }else{
            //연산자 일경우 현재 스택에 저장되어있는 피연산자 두개 추출
            //계산후 결과를 다시 스택에 저장 해당 부분 반복
            let num2 = Number(stack.pop());
            let num1 = Number(stack.pop());
            if(postFixAr[i] == "+"){
                let result = num1 + num2;
                stack.push(result);
            }else if(postFixAr[i] == "-"){
                let result = num1 - num2;
                stack.push(result);
            }else if(postFixAr[i] == "×"){
                let result = num1 * num2;
                stack.push(result);
            }else if(postFixAr[i] == "÷"){
                let result = num1 / num2;
                stack.push(result);
            }
        }
    }
    console.log(stack);
    return stack.pop();
}

// postFixCalculation(conversionPostFix());

