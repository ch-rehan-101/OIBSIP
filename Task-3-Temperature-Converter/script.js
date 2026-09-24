// =====================================
// GET HTML ELEMENTS
// =====================================

const converterForm =
    document.getElementById("converterForm");

const temperatureInput =
    document.getElementById("temperature");

const unitSelect =
    document.getElementById("unit");

const errorMessage =
    document.getElementById("errorMessage");

const celsiusResult =
    document.getElementById("celsiusResult");

const fahrenheitResult =
    document.getElementById("fahrenheitResult");

const kelvinResult =
    document.getElementById("kelvinResult");


// =====================================
// FORM SUBMIT
// =====================================

converterForm.addEventListener("submit", function (event) {

    // Stop page from refreshing
    event.preventDefault();


    // Get input value
    const temperature =
        temperatureInput.value.trim();


    // Get selected unit
    const unit =
        unitSelect.value;


    // Clear previous error
    hideError();


    // =================================
    // VALIDATE EMPTY INPUT
    // =================================

    if (temperature === "") {

        showError(
            "Please enter a temperature value."
        );

        clearResults();

        temperatureInput.focus();

        return;
    }


    // =================================
    // VALIDATE NUMERIC INPUT
    // =================================

    const value = Number(temperature);


    if (!Number.isFinite(value)) {

        showError(
            "Please enter a valid numeric temperature."
        );

        clearResults();

        temperatureInput.focus();

        return;
    }


    // =================================
    // ABSOLUTE ZERO VALIDATION
    // =================================

    if (
        unit === "celsius" &&
        value < -273.15
    ) {

        showError(
            "Temperature cannot be below absolute zero (−273.15°C)."
        );

        clearResults();

        return;
    }


    if (
        unit === "fahrenheit" &&
        value < -459.67
    ) {

        showError(
            "Temperature cannot be below absolute zero (−459.67°F)."
        );

        clearResults();

        return;
    }


    if (
        unit === "kelvin" &&
        value < 0
    ) {

        showError(
            "Kelvin cannot be below absolute zero (0 K)."
        );

        clearResults();

        return;
    }


    // =================================
    // CONVERSION
    // =================================

    let celsius;
    let fahrenheit;
    let kelvin;


    if (unit === "celsius") {

        // Celsius → Fahrenheit
        fahrenheit =
            (value * 9 / 5) + 32;

        // Celsius → Kelvin
        kelvin =
            value + 273.15;

        // Original value
        celsius = value;

    }


    else if (unit === "fahrenheit") {

        // Fahrenheit → Celsius
        celsius =
            (value - 32) * 5 / 9;

        // Celsius → Kelvin
        kelvin =
            celsius + 273.15;

        // Original value
        fahrenheit = value;

    }


    else if (unit === "kelvin") {

        // Kelvin → Celsius
        celsius =
            value - 273.15;

        // Celsius → Fahrenheit
        fahrenheit =
            (celsius * 9 / 5) + 32;

        // Original value
        kelvin = value;

    }


    // =================================
    // DISPLAY RESULTS
    // =================================

    celsiusResult.textContent =
        `${formatNumber(celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatNumber(fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatNumber(kelvin)} K`;

});


// =====================================
// FORMAT NUMBER
// =====================================

function formatNumber(number) {

    return Number(number.toFixed(2));

}


// =====================================
// SHOW ERROR
// =====================================

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.add("show");

}


// =====================================
// HIDE ERROR
// =====================================

function hideError() {

    errorMessage.textContent = "";

    errorMessage.classList.remove("show");

}


// =====================================
// CLEAR RESULTS
// =====================================

function clearResults() {

    celsiusResult.textContent = "—";

    fahrenheitResult.textContent = "—";

    kelvinResult.textContent = "—";

}
