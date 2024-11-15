/// Код для задания 9
// "use strict"
// let answer = prompt("Желаете пройти регистрацию на сайте?", "да");
// let positive = ["да", "yes", "ага", "yeah", "наверное"];
//
// while(true)
// {
//     if (positive.indexOf(answer.toLowerCase()) !== -1)
//     {
//         alert("Харош");
//         break;
//     }
//
//     answer = prompt("НЕПРАВИЛЬНЫЙ ВВОД. ПОВТОРИТЕ ПОПЫТКУ: ", "ДА");
// }
"use strict"

function init()
{
    centeredImageContainer = document.getElementById("centered-img");
    centeredImage = centeredImageContainer.children[0];
    centerImage();

    centeredImageContainer.addEventListener("click", onCenteredImageClick);
    window.addEventListener("resize", centerImage);

    window.addEventListener("resize", adjustParallaxSize);
    adjustParallaxSize();

    window.addEventListener("scroll", adjustParallax);
    adjustParallax();
}
window.onload = init;

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
const likeButtonTimerMap = new WeakMap();
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
        likeButtonTimerMap[counter] = setInterval(() =>
        {
            count = likeButtonCountMap.get(counter);
            count++;
            counter.innerText = count;
            likeButtonCountMap.set(counter, count);
        }, 2000);
    }
    if (likeButtonPressed)
    {
        button.classList.add("like-button-pressed");
        count++;
        counter.innerText = count;
    }
    else
    {
        setTimeout(() => { clearInterval(likeButtonTimerMap[counter]) }, 4000);
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

// Корзина цветных Яиц
function getRandomColor()
{
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

let eggsList = [];
let selectedEgg = null;
class ColoredEgg
{
    eggElement;
    amount;
    counterElement;
    closeElement;
    constructor(color, parentObject)
    {
        this.eggElement = document.createElement("div");
        this.eggElement.setAttribute("class", "colored-egg");
        this.eggElement.style.backgroundColor = color;
        this.eggElement.onclick = onEggClick.bind(this.eggElement);
        parentObject.appendChild(this.eggElement);

        this.amount = 1;
        this.counterElement = document.createElement("div");
        this.counterElement.setAttribute("class", "counter");
        this.counterElement.style.visibility = "hidden";
        this.counterElement.innerText = this.amount;
        this.eggElement.appendChild(this.counterElement);

        this.closeElement = document.createElement("img");
        this.closeElement.setAttribute("src", "images/close-cross.svg");
        this.closeElement.setAttribute("alt", "Закрыть Яйцо");
        this.closeElement.setAttribute("class", "close");
        this.eggElement.appendChild(this.closeElement);
    }
    add(amount)
    {
        if (this.amount + amount <= 1)
        {
            this.amount = 1;
            this.counterElement.style.visibility = "hidden";
        }
        else
        {
            this.amount += amount;
            this.counterElement.style.visibility = "visible";
        }
        this.counterElement.innerText = this.amount;
    }
}
function addNewEgg(parentObject)
{
    let color = getRandomColor();
    let egg = new ColoredEgg(color, parentObject);
    eggsList.push(egg);
}
function removeEgg(eggElement)
{
    let i = eggsList.findIndex((egg) => egg.eggElement === eggElement);
    delete eggsList[i];
    eggsList.splice(i, 1);
    eggElement.remove();
}
function addToEggCounter(eggElement, amount)
{
    if (selectedEgg == null) return;
    let i = eggsList.findIndex((egg) => egg.eggElement === eggElement);
    eggsList[i].add(amount);
}
function sortEggsList()
{
    if (eggsList.length === 0) return;

    let parentElement = eggsList[0].eggElement.parentElement;
    for (const egg of eggsList)
    {
        parentElement.removeChild(egg.eggElement);
    }
    eggsList.sort((egg1, egg2) => egg1.amount - egg2.amount);
    for (const egg of eggsList)
    {
        parentElement.appendChild(egg.eggElement);
    }
}

function onEggClick(event)
{
    if (event.target.classList[0] === "close")
    {
        removeEgg(this);
        return;
    }
    selectedEgg?.setAttribute("class", "colored-egg");
    if (selectedEgg === this)
    {
        selectedEgg = null;
        return;
    }
    selectedEgg = this;
    selectedEgg.setAttribute("class", "colored-egg selected");
}

function onAddEggButtonPressed()
{
    let container = document.getElementById("colored-eggs-container");
    addNewEgg(container);
}
function onTrashBinButtonPressed()
{
    removeEgg(selectedEgg);
}
function onPlusEggButtonPressed()
{
    addToEggCounter(selectedEgg, 1);
}
function onMinusEggButtonPressed()
{
    addToEggCounter(selectedEgg, -1);
}
function onSortEggsButtonPressed()
{
    sortEggsList();
}

// Картинка центрируемая с помощью javascript

let centeredImageContainer;
let centeredImage;

function centerImage()
{
    let parentRect = centeredImageContainer.parentElement.getBoundingClientRect();
    let containerRect = centeredImageContainer.getBoundingClientRect();
    let imgRect = centeredImage.getBoundingClientRect();
    let parentWidth = parentRect.right - parentRect.left;
    let containerWidth = containerRect.right - containerRect.left;
    let imgWidth = imgRect.right - imgRect.left;
    let margin = (parentWidth - containerWidth) / 2;
    let padding = (containerWidth - imgWidth) / 2;
    centeredImageContainer.style.marginLeft = margin.toString() + "px";
    centeredImageContainer.style.marginRight = margin.toString() + "px";
    centeredImage.style.marginLeft = padding.toString() + "px";
    centeredImage.style.marginRight = padding.toString() + "px";
}

function onCenteredImageClick(event)
{
    alert(event.clientX.toString() + " " + event.clientY.toString());
}

// Параллакс
let coefficients = [-0.1, -0.07, -0.05, -0.02];
function adjustParallax()
{
    let scroll = 80 - document.body.getBoundingClientRect().top;
    let newPositions = "";
    for (let i = 0; i < 3; i++)
    {
        newPositions += "0 ";
        newPositions += (scroll * coefficients[i]).toString() + "px, ";
    }
    newPositions += "0 ";
    newPositions += (scroll * coefficients[3]).toString() + "px";
    document.body.style.backgroundPosition = newPositions;
}
function adjustParallaxSize()
{
    document.body.style.backgroundSize = (3 * screen.height).toString() + "px";
}