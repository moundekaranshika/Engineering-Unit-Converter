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
  },
  Torque: {
    "Nm": 1,
    "lb-ft": 1.35582
  },
  Speed: {
    "m/s": 1,
    "km/h": 0.277778,
    "mph": 0.44704
  },
  Energy: {
    "Joule": 1,
    "kWh": 3600000,
    "kcal": 4184,
    "BTU": 1055.06
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

// Initialize dropdowns on page load
window.onload = updateUnits;

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
    const base = value * units[category][from]; // Convert to base unit
    result = base / units[category][to];        // Convert to target unit
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

