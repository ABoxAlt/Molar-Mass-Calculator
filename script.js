const userText = document.querySelector("#userText");
const molarMassText = document.querySelector("#molarMassText");
const registeredCharecters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890()";
const molarMasses = fetch('molarMass.txt').then((f) => f.text()).then((b) => {
  b = b.split(/\n/);
  console.log([b[0].split(' '), b[1].split(' ')]);
});


let typed = false;

window.addEventListener("keyup", type);

async function type(e) {
  if (e.keyCode == 8) {
    typed = true;
    userText.textContent = userText.textContent.slice(0, userText.textContent.lastIndexOf());
    if (userText.textContent == "") {
      userText.textContent = "?";
    }
    return;
  } else if (e.keyCode == 13) {
    molarMassText.textContent = "Molar Mass = " + await calculateMolarMass();
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

async function calculateMolarMass() {
  const masses = await molarMasses;
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
