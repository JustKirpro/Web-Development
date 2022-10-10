"use strict";

const RUSSIAN_LOCALIZATION = ['Форма', 'Привет, пользователь!', 'Войти', 'Выйти', 'Switch to EN', 'Первое поле:', 'Второе поле:', 'Плейсхолдер для нового поля:', 'Добавить поле'];
const ENGLISH_LOCALIZATION = ['Form', 'Hello, user!', 'Log in', 'Log out', 'Перевести на русский', 'First field:', 'Second field:', 'Placeholder for a new field:', 'Add new field'];

const Language = {
    Russian: 0,
    English: 1
};

let currentLanguage = Language.Russian;
let login = null;

function addInputElement() {
    const templateInputElement = document.getElementById('template-input');
    const newInputElement = document.createElement('input');
    newInputElement.classList.add('input-text');
    newInputElement.placeholder = templateInputElement.value;
    templateInputElement.value = '';

    const inputContainerElement = document.getElementById('input-container');
    const paragraphElement = document.createElement('p');
    paragraphElement.appendChild(newInputElement);
    inputContainerElement.append(paragraphElement);
}

function switchLanguage() {
    if (currentLanguage === Language.Russian){
        currentLanguage = Language.English;
        localizeElements(ENGLISH_LOCALIZATION);
    } else {
        currentLanguage = Language.Russian;
        localizeElements(RUSSIAN_LOCALIZATION);
    }

    function localizeElements(localization) {
        const localizableElements = document.getElementsByClassName('localizable');

        for (let i = 0; i < localizableElements.length; i++) {
            const currentElement = localizableElements[i];
            if (currentElement.hasAttribute('placeholder'))
                currentElement.placeholder = localization[i];
            else if (currentElement.hasAttribute('value'))
                currentElement.value = localization[i];
            else
                currentElement.textContent = localization[i];
        }

        if (login != null) {
            const greetingHeaderElement = document.getElementById('greeting-header');
            greetingHeaderElement.textContent = currentLanguage === Language.Russian ? `Привет, ${login}!` : `Hello, ${login}!`;
        }
    }
}

function signIn() {
    const promptMessage = currentLanguage === Language.Russian ? 'Введите имя пользователя:' : 'Enter login:';
    const enteredLogin = prompt(promptMessage);

    if (enteredLogin.trim() === '') {
        const errorMessage = currentLanguage === Language.Russian ? 'Недопустимое имя пользователя!' : 'Invalid login!';
        alert(errorMessage);
    } else {
        login = enteredLogin;
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';

        const greetingHeaderElement = document.getElementById('greeting-header');
        greetingHeaderElement.textContent = currentLanguage === Language.Russian ? `Привет, ${login}!` : `Hello, ${login}!`;
    }
}

function signOut() {
    login = null;
    loginButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';

    const greetingHeaderElement = document.getElementById('greeting-header');
    greetingHeaderElement.textContent = currentLanguage === Language.Russian ? RUSSIAN_LOCALIZATION[1] : ENGLISH_LOCALIZATION[1];
}

const addInputElementButton = document.getElementById('add-input-element-button');
addInputElementButton.addEventListener('click', addInputElement);

const switchLanguageButton = document.getElementById('switch-language-button');
switchLanguageButton.addEventListener('click', switchLanguage);

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', signIn);

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', signOut);