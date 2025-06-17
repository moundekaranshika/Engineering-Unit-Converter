const units = {
  Length: {
    meter: 1,
    inch: 0.0254,
    foot: 0.3048
  },
  Pressure: {
    Pa: 1,
    bar: 100000,
    atm: 101325,
    psi: 6894.76
  },
  Temperature: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K"
  }
};

function updateUnits() {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  for (let unit in units[category]) {
    fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
  }
}

function convert() {
  const category = document.getElementById("category").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;

  if (isNaN(value)) {
    document.getElementById("result").textContent = "Please enter a valid number.";
    return;
  }

  let result;

  if (category === "Temperature") {
    result = convertTemperature(value, from, to);
  } else {
    const base = value * units[category][from];
    result = base / units[category][to];
  }

  document.getElementById("result").textContent = `Result: ${result.toFixed(4)} ${to}`;
}

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
  else if (from === "Kelvin") celsius = value - 273.15;

  if (to === "Celsius") return celsius;
  else if (to === "Fahrenheit") return celsius * 9 / 5 + 32;
  else if (to === "Kelvin") return celsius + 273.15;
}
