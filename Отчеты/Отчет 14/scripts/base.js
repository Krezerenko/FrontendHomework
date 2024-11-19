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
    eggsContainer = document.getElementById("colored-eggs-container");
    eggsContainer.addEventListener("mousedown", onEggPressed);
    document.body.addEventListener("mousemove", onEggDrag);
    window.addEventListener("mouseup", onEggDropped);
    eggAmount = document.getElementById("egg-amount").childNodes[1];

    centeredImageContainer = document.getElementById("centered-img");
    centeredImage = centeredImageContainer.children[0];
    centerImage();

    centeredImageContainer.addEventListener("click", onCenteredImageClick);
    window.addEventListener("resize", centerImage);

    window.addEventListener("resize", adjustParallaxSize);
    adjustParallaxSize();

    window.addEventListener("scroll", adjustParallax);
    adjustParallax();

    document.getElementById("contents").addEventListener("click", onLinkClick);

    document.getElementById("interactive-gallery").addEventListener("click", onGalleryClick);

    for (const slider of document.getElementsByClassName("slider"))
    {
        slider.addEventListener("mousedown", onSliderPressed);
    }
    document.body.addEventListener("mousemove", onSliderDrag);
    window.addEventListener("mouseup", onSliderDropped);
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

// Рисование картинками
let picturesContainer = document.getElementById("pictures-container");
function drawPictureAtCursor(event)
{
    picturesContainer ??= document.getElementById("pictures-container");
    let x = event.clientX;
    let y = event.clientY;
    let image = document.createElement("img");
    image.src = "images/Logo.png";
    image.style.position = "fixed";
    image.style.left = `${x - 50}px`;
    image.style.top = `${y + 50}px`;
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

let eggsContainer;
let eggsList = [];
let selectedEggs = [];
let eggAmount;
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
            eggAmount.innerText = parseInt(eggAmount.innerText) + 1 - this.amount;
            this.amount = 1;
            this.counterElement.style.visibility = "hidden";
        }
        else
        {
            eggAmount.innerText = parseInt(eggAmount.innerText) + amount;
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
    eggAmount.innerText = parseInt(eggAmount.innerText) + 1;
}
function removeEgg(eggElement)
{
    if (selectedEggs.includes(this))
    {
        selectedEggs.splice(selectedEggs.indexOf(this));
    }
    let i = eggsList.findIndex((egg) => egg.eggElement === eggElement);
    eggAmount.innerText = parseInt(eggAmount.innerText) - eggsList[i].amount;
    delete eggsList[i];
    eggsList.splice(i, 1);
    eggElement.remove();
}
function addToEggCounter(eggElement, amount)
{
    if (selectedEggs.length === 0) return;
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
    if (!event.ctrlKey && !event.metaKey)
    {
        selectedEggs.forEach((selectedEgg) => selectedEgg.classList.remove("selected"));
        selectedEggs = [];
        if (this.classList[0] !== "colored-egg" || selectedEggs.length === 1 && selectedEggs[0] === this)
        {
            return;
        }
        selectedEggs.push(this);
        this.classList.add("selected");
        return;
    }
    if (selectedEggs.includes(this))
    {
        selectedEggs.splice(selectedEggs.indexOf(this), 1);
        this.classList.remove("selected");
        return;
    }
    selectedEggs.push(this);
    this.classList.add("selected");
}

function onAddEggButtonPressed()
{
    addNewEgg(eggsContainer);
}
function onTrashBinButtonPressed()
{
    selectedEggs.forEach((selectedEgg) => removeEgg(selectedEgg));
}
function onPlusEggButtonPressed()
{
    selectedEggs.forEach((selectedEgg) => addToEggCounter(selectedEgg, 1));
}
function onMinusEggButtonPressed()
{
    selectedEggs.forEach((selectedEgg) => addToEggCounter(selectedEgg, -1));
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
    document.body.style.backgroundSize = (3.3 * screen.height).toString() + "px";
}

// Подтверждение перехода по ссылке
function onLinkClick(event)
{
    if (event.target.closest("A") === null) return;

    if (!confirm("Вы точно хотите перейти по ссылке?"))
    {
        event.preventDefault();
        return false;
    }
}

// Интерактивная галерея
function onGalleryClick(event)
{
    let li = event.target.closest("li");
    if (li === null) return;

    this.childNodes[1].innerHTML = li.innerHTML;
}

// Слайдер
let startingLeft;
let startingMouseX;
let startingMouseY;
let isDraggingSlider = false;
let thumb;
function onSliderPressed(event)
{
    event.preventDefault();
    thumb = event.target;
    if (thumb.classList[0] !== "thumb") return;

    startingLeft = thumb.style.left === "" ? 0 : parseInt(thumb.style.left.replace("px", ""));
    startingMouseX = event.clientX;
    isDraggingSlider = true;
}
function onSliderDrag(event)
{
    event.preventDefault();
    if (!isDraggingSlider) return;

    let newPos = event.clientX + startingLeft - startingMouseX;
    let trackRect = thumb.parentElement.getBoundingClientRect();
    let thumbRect = thumb.getBoundingClientRect();
    newPos = clamp(newPos, 0, trackRect.width - thumbRect.width);
    thumb.style.left = newPos.toString() + "px";
}
function onSliderDropped(event)
{
    isDraggingSlider = false;
}

function clamp(t, a, b)
{
    return Math.max(a, Math.min(t, b));
}

// Перетаскивание Яйца в корзину
let isDraggingEgg = false;
let draggedEgg;
let dragTimer;
function onEggPressed(event)
{
    draggedEgg = event.target;
    if (draggedEgg.classList[0] !== "colored-egg") return;

    startingMouseX = event.clientX;
    startingMouseY = event.clientY;
    startingLeft = draggedEgg.getBoundingClientRect().left - draggedEgg.parentElement.getBoundingClientRect().left;
    dragTimer = setTimeout(() =>
    {
        isDraggingEgg = true;
        draggedEgg.style.position = "absolute";
        draggedEgg.style.zIndex = "10";
    }, 400);
}
function onEggDrag(event)
{
    if (!isDraggingEgg) return;

    draggedEgg.style.left = (event.clientX - startingMouseX + startingLeft).toString() + "px";
    draggedEgg.style.top = (event.clientY - startingMouseY).toString() + "px";
}
function onEggDropped(event)
{
    if (!isDraggingEgg)
    {
        console.log(dragTimer);
        if (dragTimer !== undefined)
        {
            clearTimeout(dragTimer);
            dragTimer = undefined;
        }
        return;
    }

    draggedEgg.style.visibility = "hidden";
    if (document.elementFromPoint(event.clientX, event.clientY).id !== "trash-bin")
    {
        isDraggingEgg = false;
        draggedEgg.style.position = "static";
        draggedEgg.style.visibility = "visible";
        return;
    }

    removeEgg(draggedEgg);
}