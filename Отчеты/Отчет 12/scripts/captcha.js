"use strict"
function onCaptchaButtonPressed()
{
    let letterCaptcha = generateLetterCaptcha();
    if (showCaptcha(null, "Введите символы:\n", letterCaptcha, letterCaptcha))
    {
        return;
    }
    alert("Неверно. Попробуйте еще раз.");
    let arithmeticCaptcha = generateArithmeticCaptcha();
    if (showCaptcha(null, "Введите результат выражения:\n", arithmeticCaptcha[0], arithmeticCaptcha[1]))
    {
        return;
    }
    alert("Неверно.");
}

function showCaptcha(captchaBox, message, question, answer)
{
    let take = prompt(message + "\n" + question);
    return take === answer;
}

function generateLetterCaptcha()
{
    let result = "";
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let maxLen = 10;
    let minLen = 3;
    let len = minLen + Math.floor(Math.random() * (maxLen - minLen));
    for (let i = 0; i < len; i++)
    {
        let letterNum = Math.floor(Math.random() * alphabet.length);
        result += alphabet[letterNum];
    }
    return result;
}

let operations = ["+", "-"];
function doOperation(opNum, a, b)
{
    switch (opNum)
    {
        case 0:
            return a + b;
        case 1:
            return a - b;
    }
}

function generateArithmeticCaptcha()
{
    const maxNum = 30;
    let a = Math.floor(Math.random() * maxNum);
    let b = Math.floor(Math.random() * maxNum);
    let opNum = Math.floor(Math.random() * 2);
    return [`${a} ${operations[opNum]} ${b}`, String(doOperation(opNum, a, b))];
}