'use strict';

const requiredAge = 18;

const form = document.getElementById('register-form');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone-number');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const dateOfBirth = document.querySelector('.date-of-birth-choice');
const dayOfBirth = document.getElementById('day-of-birth');
const monthOfBirth = document.getElementById('month-of-birth');
const yearOfBirth = document.getElementById('year-of-birth');
const genderContainer = document.querySelector('.gender-options');
const gender = document.querySelectorAll('.gender-option');
const womanBtn = document.getElementById('gender-button-woman');
const manBtn = document.getElementById('gender-button-man');
const registerBtn = document.getElementById('register-btn');

const nameRegex = new RegExp('^[A-ZŁŚŻ][a-zł]{1,}(\s[A-ZŁŚŻ][a-zł]{1,})?$');
const surnameRegex = new RegExp('^[A-ZŁŻŹ][a-ząćęłńóśźż]{1,}(-[A-ZŁŻŹ][a-ząćęłńóśźż]{1,})?$');
const emailRegex = new RegExp('^[A-Za-z0-9]{1}[A-Za-z0-9\.-_]{2,}@(wp|poczta.onet|o2|interia|op|tlen|gmail|poczta|gazeta|go2|yahoo|hotmail|vp)\.(pl|com|fm)$');
const phoneNumberRegex = new RegExp('^[0-9]{3}(-|\s)?[0-9]{3}(-|\s)?[0-9]{3}$');
const passwordRegex = new RegExp('^((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\-_\+=])[a-zA-Z0-9!@#\$%\^&\*\-_\+=]{8,})$');
// const passwordRegex = new RegExp('^((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%\^&\*\(\)_\-+=\{\}\[\]:;\|\\<,>\.\?/])[a-zA-Z0-9!@#$%\^&\*\(\)_\-+=\{\}\[\]:;\|\\<,>\.\?\/]{8,})$');

function createDaysList(select, minDay = 1, MaxDay = 31) {
    for (let i = minDay; i <= MaxDay; i++) {
        const newDay = `<option value="${i}">${i}</option>`;
        select.innerHTML += newDay;
    }
}

function createYearsList(select, minYear,
    maxYear = new Date().getFullYear()) {
    for (let i = maxYear; i >= minYear; i--) {
        const newYear = `<option value="${i}">${i}</option>`;
        select.innerHTML += newYear;
    }
}

function showError(input, message) {
    const formElement = input.parentElement;
    const error = formElement.querySelector('.error-message');
    error.classList.remove('hidden');
    error.innerText = message;
    input.classList.remove('correct');
    input.classList.add('incorrect');
}


function hideErrorMessage(input) {
    const formElement = input.parentElement;
    const error = formElement.querySelector('.error-message');
    error.classList.add('hidden');
    error.innerText = "x";
}

function showSuccess(input) {
    input.classList.remove('incorrect');
    input.classList.add('correct');
    hideErrorMessage(input);
}

function getFormElementName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function checkIfEmpty(input) {
    if (input.value.length === 0) {
        return true;
    }
    else {
        return false;
    }
}

function checkIfInputIsValid(input, regex) {
    if (regex.test(input.value))
        return true;
    else
        return false;
}

function checkIfRadioIsChecked(arrayOfRadios) {
    let result = false;
    arrayOfRadios.forEach(function (radio) {
        if (radio.checked) {
            result = true;
        }
    });
    return result;

}

function checkIfIsDifferenceBeetweenYears(givenDate, difference) {
    let todayDate = new Date();
    let yearsDifference = todayDate.getFullYear() - givenDate.getFullYear();
    if (yearsDifference >= 18) {
        return true;
    }
    else {
        return false;
    }
}

function checkForm() {
    let shouldSend = true;

    // // Check Name
    if (checkIfInputIsValid(name, nameRegex)) {
        showSuccess(name);
    }
    else if (checkIfEmpty(name)) {
        showError(name, "Type a name. Two-part name must be separated by a space.");
        shouldSend = false;
    }
    else {
        showError(name, "Name is incorrect. Two-part name must be separated by a space.");
        shouldSend = false;
    }

    // Check Surname
    if (checkIfInputIsValid(surname, surnameRegex)) {
        showSuccess(surname);
    }
    else if (checkIfEmpty(surname)) {
        showError(surname, "Type a surname. Two-part surname must be separated by a dash.");
        shouldSend = false;
    }
    else {
        showError(surname, "Surname is incorrect. Two-part surname must be separated by a dash.")
        shouldSend = false;
    }

    // Check email
    if (checkIfInputIsValid(email, emailRegex)) {
        showSuccess(email);
    }
    else if (checkIfEmpty(email)) {
        showError(email, "Typa an email address.");
        shouldSend = false;
    }
    else {
        showError(email, "Email address is incorrect.");
        shouldSend = false;
    }

    // Check phone number
    if (checkIfInputIsValid(phoneNumber, phoneNumberRegex)) {
        showSuccess(phoneNumber);
    }
    else if (checkIfEmpty(phoneNumber)) {
        showError(phoneNumber, "Typa a phone number.");
        shouldSend = false;
    }
    else {
        showError(phoneNumber, "Phone number is incorrect. Acceptable formats: DDDDDDDDD, DDD DDD DDD, DDD-DDD-DDD.");
        shouldSend = false;
    }

    // Check Password and confirm password
    if (checkIfInputIsValid(password, passwordRegex)) {
        showSuccess(password);
        // Check Confirm Password
        if (confirmPassword.value !== "" && confirmPassword.value === password.value) {
            showSuccess(confirmPassword);
        }
        else {
            showError(confirmPassword, "Passwords are different.");
            shouldSend = false;
        }
    }
    else if (checkIfEmpty(password)) {
        showError(password, "Type a password. Minimum 8 characters, at least one uppercase letter, at least one lowercase letter, at least one number and at least one special character.");
        showError(confirmPassword, "Password is wrong.");
        shouldSend = false;
    }
    else {
        showError(password, "Password is incorrect. Minimum 8 characters, at least one uppercase letter, at least one lowercase letter, at least one number and at least one special character.")
        showError(confirmPassword, "Password is wrong.");
        shouldSend = false;
    }

    // Check date (if at least 18 year)
    let day = dayOfBirth.value;
    let month = monthOfBirth.value;
    let year = yearOfBirth.value;
    let givenDate = new Date(year, month, day);

    if (checkIfIsDifferenceBeetweenYears(givenDate, requiredAge)) {
        dayOfBirth.classList.remove("incorrect");
        dayOfBirth.classList.add("correct");
        monthOfBirth.classList.remove("incorrect");
        monthOfBirth.classList.add("correct");
        yearOfBirth.classList.remove("incorrect");
        yearOfBirth.classList.add("correct");
        hideErrorMessage(dateOfBirth);
    }
    else {
        shouldSend = false;
        const formElement = dateOfBirth.parentElement;
        const error = formElement.querySelector('.error-message');
        error.classList.remove('hidden');
        error.innerText = "You must be at least 18 years old.";
        dayOfBirth.classList.remove('correct');
        dayOfBirth.classList.add('incorrect');
        monthOfBirth.classList.remove('correct');
        monthOfBirth.classList.add('incorrect');
        yearOfBirth.classList.remove('correct');
        yearOfBirth.classList.add('incorrect');
    }

    // Check if gender is checked
    if (checkIfRadioIsChecked(gender)) {
        hideErrorMessage(genderContainer);
    }
    else {
        shouldSend = false;
        const formElement = genderContainer.parentElement;
        const error = formElement.querySelector('.error-message');
        error.classList.remove('hidden');
        error.innerText = "You have to choose a gender.";
    }

    if (shouldSend) {
        alert("Your data are correct. Registration was successful.");
    }

};

// Event Listeners
womanBtn.addEventListener('click', function () {
    let radio = womanBtn.children[1];
    radio.checked = true;
});

manBtn.addEventListener('click', function () {
    let radio = manBtn.children[1];
    radio.checked = true;
});

// Main
createDaysList(dayOfBirth);
createYearsList(yearOfBirth, 1920);

registerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    checkForm();
});