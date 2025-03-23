import {getRandomInt} from "./kurs_script.js";
import { gameState } from "./script.js";

// anim for click

let count = 0; // Счетчик для уникального ID

export function creatobj(event) {
    
    // Создаем новый div
    let newDiv = document.createElement("div");

    // Создаем новый h1 элемент
    let p_score = document.createElement("h1");

    count++;

    newDiv.id = "kl-" + count;  // Присваиваем уникальный ID

    p_score.id = "pscore-" + count;  // Присваиваем уникальный ID

    newDiv.classList.add('kl');  // Применяем общий класс для стилей
    p_score.classList.add('pscore');  // Применяем общий класс для стилей


    // Получаем координаты курсора относительно окна
    let x = event.clientX;
    let y = event.clientY;

    // Устанавливаем абсолютное позиционирование по координатам курсора
    newDiv.style.position = "absolute";

    let rnd_size = getRandomInt(1,3); // Добавил ключевое слово 'let'
    if (rnd_size == 1){

        newDiv.style.width = "40px"; // Устанавливаем ширину
        newDiv.style.height = "40px";  // Устанавливаем высоту

        newDiv.style.left = (x - 18) + "px"; // Устанавливаем координаты X
        newDiv.style.top = (y - 18) + "px";  // Устанавливаем координаты Y
    
    } else if (rnd_size == 2){

        newDiv.style.width = "35px"; // Устанавливаем ширину
        newDiv.style.height = "35px";  // Устанавливаем высоту

        newDiv.style.left = (x - 15) + "px"; // Устанавливаем координаты X
        newDiv.style.top = (y - 15) + "px";  // Устанавливаем координаты Y
    
    } else if (rnd_size == 3){

        newDiv.style.width = "30px"; // Устанавливаем ширину
        newDiv.style.height = "30px";  // Устанавливаем высоту

        newDiv.style.left = (x - 12) + "px"; // Устанавливаем координаты X
        newDiv.style.top = (y - 12) + "px";  // Устанавливаем координаты Y
    
    }

    const money_section = document.querySelector('#B_id');
    const rect = money_section.getBoundingClientRect();


    let score_x = getRandomInt(rect.left, (rect.left + rect.width)); // Добавил 'let'
    let score_y = getRandomInt(rect.top, (rect.top + rect.height)); // Добавил 'let'


    // Устанавливаем абсолютное позиционирование по координатам курсора
    p_score.style.position = "absolute";
    p_score.style.left = score_x + "px"; // Устанавливаем координаты X         
    p_score.style.top = score_y + "px";  // Устанавливаем координаты Y

    // Присваиваем текстовое значение для созданного элемента
    p_score.textContent = `+${parseFloat((gameState.dohod_click / 1).toFixed(1))}`; // Изменено на gameState.dohod_click


    document.body.appendChild(newDiv); // Добавляем div на страницу
    document.body.appendChild(p_score); // Добавляем h1 на страницу

    let rnd_x = getRandomInt(-40,40); // Добавил 'let'
    let rnd_y = getRandomInt(15,40); // Добавил 'let'

    // Анимация для 1 элемента
    anime({
        targets: `#kl-${count}`,  // Применяем анимацию к уникальному элементу
        left: `+=${rnd_x}px`,   //60
        easing: 'easeInOutSine',
        duration: 800,

        complete: function() {
            // Удаляем элемент после завершения анимации
            newDiv.remove();
        }
    });

    anime({
        targets: `#kl-${count}`,
        top: `-=${rnd_y}px`,  //40
        direction: 'alternate',
        duration: 300,
        easing: 'cubicBezier(0.420, 0.400, 0.515, 0.900)',
    });

    anime({
        targets: `#kl-${count}`,
        duration: 500,
        easing: 'easeInQuart',
        backgroundColor: 'rgba(255, 145, 0, 0)',
        opacity: [1, 0.0]
    });



    // Анимация для 2 элемента
    anime({
        targets: `#pscore-${count}`,  // Применяем анимацию к уникальному элементу
        top: `-=${getRandomInt(50,150)}px`,  
        easing: 'easeOutSine',
        duration: 1000,
        opacity: [1, 0.0],

        complete: function() {
            // Удаляем элемент после завершения анимации
            p_score.remove();
        }
    });

}

window.creatobj = creatobj;


/* анимация нажатия на BigMoney */

const coin = document.getElementById('M_btn');
let isAnimating = false;  // Флаг состояния анимации
let isHeld = false;  // Флаг для отслеживания зажатия ЛКМ

// Функция анимации увеличения
function animateCoinIncrease() {
    anime.remove('#M_btn');
    anime({
        targets: '#M_btn',
        scale: [1, 1.25],  // Увеличиваем масштаб до 1.25 для "тяжести"
        easing: 'easeOutCubic',  // Плавное замедление для ощущения веса
        duration: 200,  // Увеличиваем длительность для медленного движения
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'  // Добавляем тень
    });
}

// Функция анимации уменьшения
function animateCoinDecrease() {
    anime.remove('#M_btn');
    anime({
        targets: '#M_btn',
        scale: 1,  // Возвращаем размер
        boxShadow: '0 0px 10px rgba(0, 0, 0, 0.0)',  // Убираем тень
        easing: 'easeOutElastic(1, .5)',  // Эластичная анимация для возвращения
        duration: 500,  // Увеличиваем длительность для "инерции"
        complete: () => {
            isAnimating = false;  // Сбрасываем флаг после завершения анимации
        }
    });

    // Включаем дополнительный скор при вибрации
    anime({
        targets: '#M_btn',
        scale: [
            { value: 1, duration: 50 },  // Легкое увеличение
            { value: 1.1, duration: 50 },  // Легкое увеличение для инерции
            { value: 1, duration: 80 },  // Возвращение к нормальному размеру
            { value: 1.05, duration: 50 },  // Дополнительная вибрация
            { value: 1, duration: 50 },  // Возвращение
        ],
        easing: 'easeOutSine',  // Плавная анимация вибрации
        duration: 400,  // Общее время вибрации
    });
}

// Анимация при mousedown (увеличение размера)
coin.addEventListener('mousedown', () => {
    isHeld = true;  // Фиксируем зажатие
    if (!isAnimating) {
        isAnimating = true;  // Устанавливаем флаг анимации
        animateCoinIncrease();  // Запускаем анимацию увеличения
    }
});

// Анимация при mouseup (уменьшение размера и плавная вибрация)
coin.addEventListener('mouseup', () => {
    isHeld = false;  // Снимаем флаг зажатия
    if (isAnimating) {
        animateCoinDecrease();  // Запускаем анимацию уменьшения
    }
});



// Проверка на зажатие ЛКМ каждые 50 мс, чтобы гарантировать проигрывание анимации
setInterval(() => {
    if (isHeld && !isAnimating) {
        isAnimating = true;
        animateCoinIncrease();
    }
}, 50);


// Анимация при mouseout (уменьшение размера и плавная вибрация)
coin.addEventListener('mouseout', () => {
    isHeld = false;  // Снимаем флаг зажатия
    if (isAnimating) {
        animateCoinDecrease();  // Запускаем анимацию уменьшения
    }
    console.log("fdkvn")
});
