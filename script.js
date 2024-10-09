const userText = document.querySelector("#userText");
const molarMassText = document.querySelector("#molarMassText");
const registeredCharecters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890()";
fetch('molarMass.txt').then((f) => {
  console.log(f);
});
//const molarMasses;
//molarMasses[0].split(" ");
//molarMasses[1].split(" ");
//console.log(molarMasses[0]);
//console.log(molarMasses[1]);

let typed = false;

window.addEventListener("keyup", type);

function type(e) {
  if (e.keyCode == 8) {
    typed = true;
    userText.textContent = userText.textContent.slice(0, userText.textContent.lastIndexOf());
    if (userText.textContent == "") {
      userText.textContent = "?";
    }
    return;
  } else if (e.keyCode == 13) {
    molarMassText.textContent = "Molar Mass = " + calculateMolarMass();
  }else {
    for (const char of registeredCharecters) {
      if (char == e.key) {
        if (typed == false) {
          userText.textContent = "";
          typed = true;
        } else if (userText.textContent == "?") {
          userText.textContent = "";
        }
        userText.textContent += e.key;
      }
    }
  }
}

function calculateMolarMass() {
  const multiplier = parseInt(userText.textContent.shift());
  const elements = [];
  for (const element of userText.textContent.split(/([A-Z][a-z]*[0-9]*)/g)) {
    if (element != "" && element != " ") {
      elements.push(element);
    }
  }
  
  for (const element of elements) {
    let [, symbol, count] = /([A-Z][a-z]*)([0-9]*)/.exec(element);
    if (count == "") {
      count = 1;
    }
    count = parseInt(count);
    molarmass += getElementMolarMass(symbol) * count;
  }
  userText.textContent = multiplier.toString() + userText.textContent
  return (molarMass * multiplier).toString();
}

function getElementMolarMass(element) {
  return molarMasses[periodicTable.indexOf(element)];
}
