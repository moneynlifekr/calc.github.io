// let $calcTable = document.querySelector('button');
let $calcTable = document.getElementById('calc');
let $clearTable = document.getElementById('clear');
let $commaMoney = document.getElementById('money');
let table = document.getElementById('calctable')
$calcTable.addEventListener('click', buildTable);
$clearTable.addEventListener('click', clearTable);
$commaMoney.addEventListener('blur', commaM);

function commaM() {
  let removeM = document.getElementById('money').value;
  let money = parseInt(removeM.replace(/[^0-9]/g,""));
  document.getElementById('money').value = money.toLocaleString();
}

// let method2 = document.getElementById('method').value;

function moneyChange(value) {
  let removeM = document.getElementById('money').value;
  let money = parseInt(removeM.replace(/,/g,""));
  value == 0 ? money = 0 : money += value;
  document.getElementById('money').value = money;
  commaM();
}

function interestChange(value) {
  let interest = parseFloat(document.getElementById('interest').value);
  value == 0 ? interest = 0 : interest += value;
  document.getElementById('interest').value = interest; 
}

function periodChange(value) {
  let period = parseInt(document.getElementById('period').value);
  value == 0 ? period = 0 : period += value;
  document.getElementById('period').value = period;
}

function period2Change(value) {
  let period = parseInt(document.getElementById('period').value);
  let period2 = parseInt(document.getElementById('period2').value);
  if (period2 > period) {
    // alert('거치기간은 대출기간보다 짧아야 합니다');
    period2 = period;
  }
  value == 0 ? period2 = 0 : period2 += value;
  document.getElementById('period2').value = period2;
}


function clearTable() {
  table.innerHTML = '';
  document.getElementById('method').value = 1;
  document.getElementById('money').value = 0;
  document.getElementById('interest').value = 0;
  document.getElementById('period').value = 0;
  document.getElementById('period2').value = 0;
}

function buildTable() {
  table.innerHTML = '';
  let method = document.getElementById('method').value;
  // let money = parseInt(document.getElementById('money').value);
  let interest = parseFloat(document.getElementById('interest').value);
  let period = parseInt(document.getElementById('period').value);
  let period2 = parseInt(document.getElementById('period2').value);
  
  let removeM = document.getElementById('money').value;
  let money = parseInt(removeM.replace(/,/g,""));

  //변수초기화
  let leftMoney = money;
  let addMoney = 0;
  let calcInterest;
  let divMoney;
  let repay;
  let covInterest = (interest/12) / 100 ;
  let period3 = period - period2;

  for (let i = 1; i <= period; i++) {
    if (period2 !=0) {
      repay = 0;
      calcInterest = Math.floor(money * covInterest);
      divMoney = 0;
    }
    //원리금균등상환
    if (method == 1) {
      if (period2 == 0) {
        repay = Math.floor((money * covInterest * Math.pow(1+covInterest,period3))/(Math.pow(1+covInterest,period3)-1));
        calcInterest = Math.floor(leftMoney * covInterest);
        divMoney = repay - calcInterest;
      }
    //원금균등상환
    } else if (method == 2) {
      if (period2 == 0) {
      calcInterest = Math.floor(leftMoney * covInterest);
      divMoney = Math.floor(money / period3);
      repay = calcInterest + divMoney;
      }
    //만기일시상환
    } else {
      calcInterest = Math.floor(money * covInterest);
      divMoney = i == period ? money : 0;
      repay = divMoney;
    }
    addMoney = addMoney + repay;
    leftMoney = (leftMoney - divMoney) > 0 ? (leftMoney - divMoney) : 0;
    period2 !=0 ? period2 -= 1 : period2 = 0 ;
    //잔금이 남을 경우
    if (i == period & leftMoney != 0) {
      divMoney += leftMoney;
      leftMoney = 0
    }
    //테이블생성
    let row = `<tr>
                <td>${i.toLocaleString()}회</td>
                <td>${calcInterest.toLocaleString()}원</td>
                <td>${divMoney.toLocaleString()}원</td>
                <td>${repay.toLocaleString()}원</td>
                <td>${addMoney.toLocaleString()}원</td>
                <td>${leftMoney.toLocaleString()}원</td>
                </tr>`
    table.innerHTML += row
  }
}
