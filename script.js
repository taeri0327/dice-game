// 턴을 추적하는 변수 (1은 왼쪽 플레이어의 턴, 2는 오른쪽 플레이어의 턴)
let turn = 1;

// 왼쪽과 오른쪽 플레이어의 점수
let leftDiceValue = 0;
let rightDiceValue = 0;

// 각 플레이어가 주사위를 홀드했는지 여부
let leftPlayerHeld = false;
let rightPlayerHeld = false;

// 현재 주사위의 값을 저장
let currentDiceValue = 0;

// 주사위 이미지 요소를 선택
const diceImgLeft = document.querySelector(".dice-box-left #dice-img");
const diceImgRight = document.querySelector(".dice-box-right #dice-img");
const holdButton = document.querySelector("#hold-btn");

// 주사위 각 면에 해당하는 이미지 파일 경로
const diceImages = [
  "img/dice1.png", // 1
  "img/dice2.png", // 2
  "img/dice3.png", // 3
  "img/dice4.png", // 4
  "img/dice5.png", // 5
  "img/dice6.png", // 6
];

// 주사위를 굴려서 1부터 6까지의 랜덤 숫자를 반환하는 함수
function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

// 주사위 값에 맞는 이미지 파일 경로를 반환하는 함수
function getDiceImageSrc(value) {
  return diceImages[value - 1];
}

// 이미지 경로에서 주사위 값을 추출하는 함수
function getDiceValueFromSrc(src) {
  const match = src.match(/dice(\d)\.png$/);
  return match ? parseInt(match[1], 10) : 0;
}

// 주사위 이미지를 업데이트하는 함수
function updateDiceImage() {
  if (turn % 2 === 1) {
    // 홀수 턴: 왼쪽 주사위
    diceImgLeft.style.opacity = "1";
    currentDiceValue = getRandomDiceValue(); // 랜덤 주사위 값 생성
    diceImgLeft.src = getDiceImageSrc(currentDiceValue); // 왼쪽 주사위 이미지 업데이트
    diceImgRight.style.opacity = "0"; // 오른쪽 주사위 이미지는 숨김
  } else {
    // 짝수 턴: 오른쪽 주사위
    diceImgRight.style.opacity = "1";
    currentDiceValue = getRandomDiceValue(); // 랜덤 주사위 값 생성
    diceImgRight.src = getDiceImageSrc(currentDiceValue); // 오른쪽 주사위 이미지 업데이트
    diceImgLeft.style.opacity = "0"; // 왼쪽 주사위 이미지는 숨김
  }
}

// 주사위를 클릭했을 때 호출되는 함수
function handleDiceClick(event) {
  if (
    turn % 2 === 1 &&
    !leftPlayerHeld &&
    event.currentTarget === diceImgLeft
  ) {
    // 왼쪽 플레이어의 턴이고, 왼쪽 주사위를 클릭했으며 왼쪽 플레이어가 홀드하지 않은 경우
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      leftDiceValue = 0; // 주사위 값이 1 또는 2일 때 점수 초기화
    } else {
      leftDiceValue += currentDiceValue; // 점수에 현재 주사위 값을 추가
    }
  } else if (
    turn % 2 === 0 &&
    !rightPlayerHeld &&
    event.currentTarget === diceImgRight
  ) {
    // 오른쪽 플레이어의 턴이고, 오른쪽 주사위를 클릭했으며 오른쪽 플레이어가 홀드하지 않은 경우
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      rightDiceValue = 0; // 주사위 값이 1 또는 2일 때 점수 초기화
    } else {
      rightDiceValue += currentDiceValue; // 점수에 현재 주사위 값을 추가
    }
  }
  // 턴을 증가시키고 홀드된 플레이어를 건너뛰며 주사위 이미지와 점수를 업데이트
  turn++;
  skipHeldPlayers();
  updateDiceImage();
  updateValues();
}

// 홀드 버튼 클릭 시 호출되는 함수
function handleHoldClick() {
  if (turn % 2 === 1 && !leftPlayerHeld) {
    // 왼쪽 플레이어의 턴이고, 왼쪽 플레이어가 홀드하지 않은 경우
    leftPlayerHeld = true; // 왼쪽 플레이어를 홀드 상태로 변경
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      leftDiceValue = 0; // 주사위 값이 1 또는 2일 때 점수 초기화
    } else {
      leftDiceValue += currentDiceValue; // 점수에 현재 주사위 값을 추가
    }
  } else if (turn % 2 === 0 && !rightPlayerHeld) {
    // 오른쪽 플레이어의 턴이고, 오른쪽 플레이어가 홀드하지 않은 경우
    rightPlayerHeld = true; // 오른쪽 플레이어를 홀드 상태로 변경
    if (currentDiceValue === 1 || currentDiceValue === 2) {
      rightDiceValue = 0; // 주사위 값이 1 또는 2일 때 점수 초기화
    } else {
      rightDiceValue += currentDiceValue; // 점수에 현재 주사위 값을 추가
    }
  }

  // 턴을 증가시키고 홀드된 플레이어를 건너뛰며 주사위 이미지와 점수를 업데이트
  turn++;
  skipHeldPlayers();
  updateDiceImage();
  updateValues();
}

// 홀드된 플레이어의 턴을 건너뛰는 함수
function skipHeldPlayers() {
  while (
    (turn % 2 === 1 && leftPlayerHeld) || // 왼쪽 플레이어가 홀드된 경우
    (turn % 2 === 0 && rightPlayerHeld) // 오른쪽 플레이어가 홀드된 경우
  ) {
    console.log(
      `Skipping turn: ${turn}, Left Held: ${leftPlayerHeld}, Right Held: ${rightPlayerHeld}`
    );
    turn++; // 턴 증가
  }
}

// 점수와 화면을 업데이트하는 함수
function updateValues() {
  const leftValueDiv = document.querySelector(".current-value-left");
  const rightValueDiv = document.querySelector(".current-value-right");

  // 현재 점수를 화면에 표시
  if (leftValueDiv && rightValueDiv) {
    leftValueDiv.textContent = leftDiceValue.toString().padStart(2, "0");
    rightValueDiv.textContent = rightDiceValue.toString().padStart(2, "0");
  } else {
    console.error("Value div elements not found"); // 화면에 점수를 표시할 요소를 찾을 수 없을 때 에러 메시지
  }

  // 승리 조건 확인
  checkForWin();
}

// 승리 조건을 확인하고, 승리 시 게임을 리셋하는 함수
function checkForWin() {
  if (leftDiceValue >= 50) {
    alert("플레이어1이 승리했습니다! 게임이 리셋됩니다.");
    resetGame();
  } else if (rightDiceValue >= 50) {
    alert("플레이어2가 승리했습니다! 게임이 리셋됩니다");
    resetGame();
  }
}

// 게임을 리셋하는 함수
function resetGame() {
  leftDiceValue = 0;
  rightDiceValue = 0;
  leftPlayerHeld = false;
  rightPlayerHeld = false;
  turn = 1; // 턴을 1로 초기화
  updateDiceImage(); // 주사위 이미지를 초기화
  updateValues(); // 점수와 화면 업데이트
}

// 초기 상태를 설정하는 함수
function initialize() {
  updateDiceImage(); // 주사위 이미지 초기화
  updateValues(); // 점수와 화면 업데이트
}

// 주사위 이미지와 홀드 버튼에 클릭 이벤트 리스너 추가
diceImgLeft.addEventListener("click", handleDiceClick);
diceImgRight.addEventListener("click", handleDiceClick);
holdButton.addEventListener("click", handleHoldClick);

// 게임 초기화
initialize();
