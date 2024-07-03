import { scripts, scripts2 } from './con_data.js'

// 질문 화면의 각 요소를 찾아요!
// const progressValueEl = document.querySelector('.progress .value')
const numberEl = document.querySelector('.number');
const scriptEl = document.querySelector('.script');
const choice1El = document.querySelector('.choice1')
const choice2El = document.querySelector('.choice2')
const imgEl = document.querySelector('.question-box');
const overlay = document.querySelector('.overlay');
const button = document.getElementById('darken');

let currentNumber = 0; // 현재 질문 번호
let currentScriptSet=scripts; //현재 스크립트


// 화면에 질문을 랜더링하는 함수에요!
function renderQuestion() {
  const script = currentScriptSet[currentNumber]
  scriptEl.innerHTML = script.script
  numberEl.innerHTML = script.number
  // choice1El.innerHTML = question.choices[0].text
  // choice2El.innerHTML = question.choices[1].text
  // imgEl.style.backgroundImage = 'url(${script.img})';
  imgEl.style.backgroundImage = `url(${script.img})`; //img 경로 설정
  // progressValueEl.style.width = (currentNumber + 1) * 10 + '%'
  if(script.choices){
    choice1El.style.display = 'block';
    choice2El.style.display = 'block';
    choice1El.innerHTML = script.choices[0].text;
    choice2El.innerHTML = script.choices[1].text;
  }
  else{
    choice1El.style.display = 'none';
    choice2El.style.display = 'none';
  }
}

// 다음 질문으로 넘어가는 함수
function nextQuestion() {
  if (currentNumber === currentScriptSet.length - 1) {

    //2초 있다가 화면구성(script->script2)
    if(currentScriptSet===scripts){
      screenblack(true);
      setTimeout(()=>{
        currentScriptSet=scripts2;
        currentNumber=0;
        screenblack(false);
        renderQuestion();
      },2000);
      
    }
    else{
      //scripts2에서 끝에 도달할 경우
      screenblack(); 
    }
  }

  else{
    currentNumber++;
  }
  renderQuestion();
}

function handleChoice(choiceIndex) {
  const script = currentScriptSet[currentNumber];
  if (script.choices) {
    scriptEl.innerHTML = script.choices[choiceIndex].value;
    choice1El.style.display = 'none';
    choice2El.style.display = 'none';
    setTimeout(nextQuestion, 1000);
  } else {
    nextQuestion();
  }
}


// 클릭했을 때 동작하는 코드.
scriptEl.addEventListener('click', function () {
  nextQuestion();
})

// '답변1' 혹은 '답변2'를 클릭했을 때 동작하는 코드에요!
choice1El.addEventListener('click', function () {
  handleChoice(0);
})

choice2El.addEventListener('click', function () {
  handleChoice(1);
})


renderQuestion();


function screenblack(fadeToBlack) {
  //검은화면만들기
  if(fadeToBlack){
    overlay.style.opacity = '0.98';
  }
  //다시 복구
  else{
    overlay.style.opacity='0';
  }
  
}


