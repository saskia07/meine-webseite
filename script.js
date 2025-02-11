document.addEventListener("DOMContentLoaded", function () {






  


let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("./alarm.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display Time




function displayTimer() {
    let date = new Date();
    let [hours, minutes, seconds] = [
      appendZero(date.getHours()),
      appendZero(date.getMinutes()),
      appendZero(date.getSeconds()),
    ];
  

  //Display time
  
  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;
  

  //Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}
setInterval(displayTimer, 1000);

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Create alarm div

const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

//Set Alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

//Stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

function displayEssentialOil(oil) {
    const oilDisplay = document.getElementById("oilDisplay");
  
    if (!oilDisplay) {
        const newOilDisplay = document.createElement("div");
        newOilDisplay.id = "oilDisplay";
        document.querySelector(".container").appendChild(newOilDisplay);
    }
  
    const oilText = oil === "lavender" ? "Lavendelöl" : "Zirbelholzöl";
    document.getElementById("oilDisplay").textContent = `Ausgewähltes ätherisches Öl: ${oilText}`;
  }



  window.onload = () => {
    const bedTimeDisplay = document.getElementById("bedTimeDisplay");
    updateBedTimeDisplay(0, 0);
      setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;S
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
  };
  
  function updateBedTimeDisplay(hours, minutes) {
    const formattedHour = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
};
  
 





window.onload = () => {
  // Beispielhafte Variablen, die später vom Sensor geliefert werden
  let currentTemperature = 22;  // Temperatur in °C
  let currentCO2 = 350; // CO2 in µg/m³

  // Funktion, die die angezeigten Daten aktualisiert
  const updateEnvironmentalData = (temperature, co2) => {
    document.getElementById("temperature").textContent = `Temperatur: ${temperature}°C`;
    document.getElementById("co2").textContent = `CO2 Gehalt: ${co2} µg/m³`;
  };

  // Simulation: Daten alle 5 Sekunden aktualisieren
  setInterval(() => {
    // Hier kannst du den Sensor-Wert einfügen
    currentTemperature += (Math.random() - 0.5) * 2;  // Beispielhafte kleine Variation der Temperatur
    currentCO2 += Math.floor((Math.random() - 0.5) * 20);  // Beispielhafte kleine Variation des CO2-Gehalts

    // Werte aktualisieren
    updateEnvironmentalData(currentTemperature.toFixed(1), currentCO2);
  }, 5000); // Alle 5 Sekunden aktualisieren
};

// Beispiel-Daten (diese Werte sollten später vom Sensor kommen)
let currentTemperature = 21; // Beispielwert in °C
let currentCO2 = 800; // Beispielwert in ppm

// Funktion zur Aktualisierung des Temperaturstatus
function updateTemperatureStatus() {
  const temperatureStatus = document.getElementById("temperatureStatus");
  
  if (currentTemperature >= 18 && currentTemperature <= 22) {
    temperatureStatus.innerHTML = "Optimaler Temperaturbereich!";
    temperatureStatus.style.color = "green";
  } else if (currentTemperature < 18) {
    temperatureStatus.innerHTML = "Zu kalt! Erwärmen Sie den Raum.";
    temperatureStatus.style.color = "red";
  } else {
    temperatureStatus.innerHTML = "Zu warm! Kühlen Sie den Raum ab.";
    temperatureStatus.style.color = "red";
  }
}

// Funktion zur Aktualisierung des CO2-Status
function updateCO2Status() {
  const co2Status = document.getElementById("co2Status");
  
  if (currentCO2 >= 400 && currentCO2 <= 1000) {
    co2Status.innerHTML = "CO2-Wert im optimalen Bereich!";
    co2Status.style.color = "green";
  } else if (currentCO2 < 400) {
    co2Status.innerHTML = "CO2-Wert zu niedrig! Lüften Sie den Raum.";
    co2Status.style.color = "orange";
  } else {
    co2Status.innerHTML = "CO2-Wert zu hoch! Belüften Sie den Raum.";
    co2Status.style.color = "red";
  }
}

// Funktionen aufrufen, um die Statusanzeigen zu aktualisieren
updateTemperatureStatus();
updateCO2Status();


// Funktion zur Steuerung der Geräte
function controlDevice(device, action) {
  const url = `/control?device=${device}&action=${action}`;
  
  fetch(url)
    .then(response => response.text())
    .then(data => {
      console.log(data); // Erfolgsnachricht vom ESP8266
    })
    .catch(error => {
      console.error('Fehler bei der Steuerung des Geräts:', error);
    });
}

// Funktion zum Abrufen der Temperatur vom ESP8266
function fetchTemperature() {
  fetch('/temperature')
    .then(response => response.json())
    .then(data => {
      document.getElementById('temperature').textContent = data.temperature + ' °C';
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Temperatur:', error);
    });
}

// Hole die Temperatur alle 5 Sekunden
setInterval(fetchTemperature, 5000);
fetchTemperature();

});