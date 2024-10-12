const userText = document.querySelector("#userText");
const molarMassText = document.querySelector("#molarMassText");
const registeredCharecters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890()";
const molarMasses = fetch('molarMass.txt').then((f) => f.text()).then((b) => {
  b = b.split(/\n/);
  return [b[0].split(' '), b[1].split(' ')];
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

  let userInput = userText.textContent;
  let multiplier = 1;

  if (!isNaN(userInput[0])) {
    multiplier = parseInt(userInput.slice(0, 1));
    userInput = userInput.slice(1);
  }
  
  const elements = [];
  for (const element of userInput.split(/([A-Z][a-z]*[0-9]*)/g)) {
    if (element != "" && element != " ") {
      elements.push(element);
    }
  }

  let molarMass = 0;

  for (const element of elements) {
    let [, symbol, count] = /([A-Z][a-z]*)([0-9]*)/.exec(element);
    console.log(symbol, count);
    if (count == "") {
      count = 1;
    } else {
      count = parseInt(count);
    }

    molarMass += getElementMolarMass(symbol, masses) * count;
  }
  return (molarMass * multiplier).toFixed(2).toString();
}

function getElementMolarMass(element, masses) {
  return masses[1][masses[0].indexOf(element)];
}
