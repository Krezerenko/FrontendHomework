"use strict"
let answer = prompt("Желаете пройти регистрацию на сайте?", "да");
let positive = ["да", "yes", "ага", "yeah", "наверное"];

while(true)
{
    if (positive.indexOf(answer.toLowerCase()) !== -1)
    {
        alert("Харош");
        break;
    }

    answer = prompt("НЕПРАВИЛЬНЫЙ ВВОД. ПОВТОРИТЕ ПОПЫТКУ: ", "ДА");
}

// window.onload = init;
//
// function init()
// {
//     let testLoginButton = document.getElementById("test-login");
//     testLoginButton.addEventListener("click", testLogin);
// }

function testLogin()
{
    let name = prompt("Введите логин");
    if (name === null || name === "")
    {
        alert("Отмена");
        return;
    }
    if (name === "Admin")
    {
        let password = prompt("Введите пароль");
        if (password === null || password === "")
        {
            alert("Отмена");
            return;
        }
        if (password.toLowerCase() === "я главный")
        {
            alert("Здравствуйте!");
            return;
        }
        alert("Неверный пароль");
        return;
    }
    alert("Ты кто");
}

const likeButtonPressedMap = new WeakMap();
const likeButtonCountMap = new WeakMap();
function onLikeButtonClick(button)
{
    let likeButtonPressed = likeButtonPressedMap.get(button);
    if (typeof likeButtonPressed !== "boolean")
    {
        likeButtonPressed = false;
    }
    likeButtonPressed = !likeButtonPressed;
    let counter = button.getElementsByClassName("counter")[0];
    let count = likeButtonCountMap.get(counter);
    if (typeof count !== "number")
    {
        count = 0;
    }
    if (likeButtonPressed)
    {
        button.classList.add("like-button-pressed");
        count++;
        counter.innerText = count;
    }
    else
    {
        button.classList.remove("like-button-pressed");
        count--;
        counter.innerText = count;
    }
    likeButtonCountMap.set(counter, count);
    likeButtonPressedMap.set(button, likeButtonPressed)
}

let picturesContainer = document.getElementById("pictures-container");
function drawPictureAtCursor(event)
{
    picturesContainer ??= document.getElementById("pictures-container");
    let x = event.clientX;
    let y = event.clientY;
    let image = document.createElement("img");
    image.src = "../images/Logo.png";
    image.style.position = "fixed";
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.width = '100px';
    image.style.height = '100px';
    image.style.zIndex = '-10';
    picturesContainer.appendChild(image);
}

let isDrawing = false;
function onDrawButtonPressed()
{
    isDrawing = !isDrawing;
    if (isDrawing)
    {
        addEventListener("mousemove", drawPictureAtCursor);
    }
    else
    {
        picturesContainer ??= document.getElementById("pictures-container");
        removeEventListener("mousemove", drawPictureAtCursor);
        picturesContainer.innerHTML = "";
    }
}