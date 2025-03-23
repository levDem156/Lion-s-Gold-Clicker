import { getCookie, setCookie } from "./coockie.js"
import { score_detected, gameState } from "./script.js"

window.open_menu_a = open_menu_a;
window.open_menu_sell_a = open_menu_sell_a;
window.sell_actions = sell_actions;
window.menuclose2 = menuclose2;
window.plus_variant_sell = plus_variant_sell;
window.minus_variant_sell = minus_variant_sell;
window.buy_actions = buy_actions;
window.menuclose = menuclose;
window.plus_variant = plus_variant;
window.minus_variant = minus_variant;
window.minus_variant = minus_variant;
window.minus_variant = minus_variant;

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let count_of_kurs = 0; // Счетчик для уникального ID
let count_del_of_kurs = 1; // Счетчик для delete уникального ID
let pos_brain_of_kurs = parseInt(getCookie('pos_brain_of_kurs')) || 0; //для запоминания прошлой высоты bottom
let pos_dauble = parseInt(getCookie('pos_dauble')) || 10;

let position_of_kurs_monitoring = parseInt(getCookie('position_of_kurs_monitoring')) || 100000; //первоначальная высота курса        переменная для измерения высоты самого курса
let log=getRandomInt(0,1);

// Функция для работы с элементами
window.onload = () => {
    for (let i = 1; i <= 8; i++) { // цикл для изменения текста элементов
        console.log(`Обрабатываем элемент ch${i}`);
        
        const block_check = document.getElementById(`ch${i}`); // Находим элемент с ID ch1, ch2 и т.д.
        if (!block_check) {
            console.warn(`Элемент с ID ch${i} не найден.`);
            continue; // Переходим к следующему элементу, если текущий не найден
        }

        // Получаем значение куки
        let block_n = parseInt(getCookie(`ch${i}`), 10);

        if (isNaN(block_n)) { // Если куки не существуют или их значение не число
            console.log(`Куки для ch${i} не найдены. Устанавливаем значение по умолчанию: ${i}`);
            block_n = i; // Устанавливаем значение по умолчанию
            setCookie(`ch${i}`, block_n, 100000); // Сохраняем это значение в куки
        }

        // Устанавливаем значение элемента на странице
        block_check.textContent = block_n;
    }

    cost_ac()
    count_ac()
};

//события

function rand_long(){  //функция для долгосрочных событий
    hep_long = getRandomInt(1,10);
}
setInterval(rand_long, 1000000) //1000000


function rand_h(){  //функция для случайных собтий
    if(hep_long == 3){                     //если 3 то преимущественно вверх
        let hep = getRandomInt(1,3);
        if( hep == 2 || hep == 3){
            log=0;
        }else{
            log=1;
        }
    }else   if(hep_long == 2){                //если 3 то преимцуественно вниз
        let hep = getRandomInt(1,3);
        if( hep == 2 || hep == 3){
            log=1;
        }else{
            log=0;
        }
    }else{                                      //всё остальное равномерно
        let hep = getRandomInt(1,2);      
        if( hep == 2){
            log=1;
        }else{
            log=0;
        }
    }

}
setInterval(rand_h, 1900)  //1900



let rnd_pos = 0; //двигаем курс изходя из  событий
let hep_long = 0;//двигаем курс изходя из long  событий





//блок для управления курсом

function km(){

    // Создаем новое поле для блока
    let block_back = document.createElement("div");
    // Создаем сам блок
    let block_end = document.createElement("div");

    count_of_kurs++;

    block_back.id = "bb-" + count_of_kurs;  // Присваиваем уникальный ID
    block_end.id = "be-" + count_of_kurs;  // Присваиваем уникальный ID

    block_back.classList.add('kurs_show');  // Применяем общий класс для стилей
    block_end.classList.add('kurs_block');  // Применяем общий класс для стилей

    const wd = getRandomInt(10,12);
    block_back.style.width = wd + "px";  // Устанавливаем ширину блока
    block_back.style.minWidth = wd + "px";  // Устанавливаем ширину блока


    //погнали пилить логику курса

    const pos = getRandomInt(20,38) + rnd_pos; // получаем рандомный подЪём или спад
    const hg = getRandomInt(pos,pos); // высота блока
    let cl = "";

    //определяем подъём или спад
    if (log==0){
        pos_brain_of_kurs += pos+ pos_dauble; 
        position_of_kurs_monitoring += hg*10;

        cl = "green"; //и устанавливаем цвет
    }else{
        pos_brain_of_kurs -= pos + pos_dauble;
        position_of_kurs_monitoring -= hg*10;


        cl = "red";
    }

    setCookie('position_of_kurs_monitoring', position_of_kurs_monitoring, 100000);

    setCookie('pos_dauble', pos_dauble, 100000);
    setCookie('pos_brain_of_kurs', pos_brain_of_kurs, 100000);


    block_end.style.height = hg + "px";  // Устанавливаем высоту блок

    block_end.style.marginBottom = pos_brain_of_kurs + "px";  // Устанавливаем position блока
    block_end.style.backgroundColor = cl;  // Устанавливаем цвет блока

    const targetBlock = document.getElementById('fon'); // Находим блок с определённым id
    targetBlock.appendChild(block_back);          // Добавляем новый элемент в блок


    const block_kurs = document.getElementById(`bb-${count_of_kurs}`); // Находим блок с определённым id
    block_kurs.appendChild(block_end);          // Добавляем новый элемент в блок



    if (pos_brain_of_kurs >= 130) {
        pos_brain_of_kurs -= pos + pos_dauble;
        setCookie('pos_dauble', pos_dauble, 100000);
        setCookie('pos_brain_of_kurs', pos_brain_of_kurs, 100000);
        for (let i = 1; i <= count_of_kurs; i++) { // цикл для изменения положения курса
            const block_of_kurs = document.getElementById(`be-${i}`); // Находим блок с определённым id
            if (block_of_kurs) {  // Проверяем, что элемент существует
                // Получаем значение margin-bottom и приводим его к числу
                const marginBottom = parseInt(window.getComputedStyle(block_of_kurs).marginBottom, 10); 
                
                // Устанавливаем новый margin-bottom
                block_of_kurs.style.marginBottom = (marginBottom - 20) + "px";

            }
        }
        // Обновление значений
        for (let i = 1; i <= 8; i++) {
            const block_check = document.getElementById(`ch${i}`); // Ищем элемент с ID ch1, ch2 и т.д.

            if (!block_check) {
                console.warn(`Элемент с id 'ch${i}' не найден.`);
                continue; // Пропускаем итерацию, если элемент не найден
            }

            let block_n = parseInt(getCookie(`ch${i}`), 10); // Получаем значение из куки и преобразуем его в число
            if (isNaN(block_n)) {
                // Если куки не существует или некорректное значение, используем `i` как значение по умолчанию
                block_n = i;
                setCookie(`ch${i}`, block_n, 100000); // Устанавливаем куки с этим значением
            }

            block_check.textContent = block_n; // Устанавливаем текстовое содержимое элемента
            setCookie(`ch${i}`, block_n + 1, 100000); // Обновляем куки, уменьшая значение на 1
        }
    }

    if (pos_brain_of_kurs <= -120) {
        pos_brain_of_kurs += pos + pos_dauble;
        setCookie('pos_dauble', pos_dauble, 100000);
        setCookie('pos_brain_of_kurs', pos_brain_of_kurs, 100000);
        for (let i = 1; i <= count_of_kurs; i++) { // цикл для изменения положения курса
            const block_of_kurs = document.getElementById(`be-${i}`); // Находим блок с определённым id
            if (block_of_kurs) {  // Проверяем, что элемент существует
                // Получаем значение margin-bottom и приводим его к числу
                const marginBottom = parseInt(window.getComputedStyle(block_of_kurs).marginBottom, 10); 
                
                // Устанавливаем новый margin-bottom
                block_of_kurs.style.marginBottom = (marginBottom + 20) + "px";
            }
        }

        // Обновление значений
        for (let i = 1; i <= 8; i++) {
            const block_check = document.getElementById(`ch${i}`); // Ищем элемент с ID ch1, ch2 и т.д.

            if (!block_check) {
                console.warn(`Элемент с id 'ch${i}' не найден.`);
                continue; // Пропускаем итерацию, если элемент не найден
            }

            let block_n = parseInt(getCookie(`ch${i}`), 10); // Получаем значение из куки и преобразуем его в число
            if (isNaN(block_n)) {
                // Если куки не существует или некорректное значение, используем `i` как значение по умолчанию
                block_n = i;
                setCookie(`ch${i}`, block_n, 100000); // Устанавливаем куки с этим значением
            }

            block_check.textContent = block_n; // Устанавливаем текстовое содержимое элемента
            setCookie(`ch${i}`, block_n - 1, 100000); // Обновляем куки, уменьшая значение на 1
        }
    }

    targetBlock.scrollLeft = targetBlock.scrollWidth;

    if (count_of_kurs>100){  //удаляем объекты если их больше ... (числом можно регулировать дальность продвижения курса)
        document.getElementById(`bb-${count_del_of_kurs}`).remove();
        count_del_of_kurs+=1;
    }

    cost_ac();

}

setInterval(km, 2000)    //2000

//изменение стоимости акции

function cost_ac() {
    const sizeElement = document.getElementById("VCH2");
    const costActionElement = document.getElementById("cost_action");

    if (!sizeElement || !costActionElement) {
        console.warn("Элементы не найдены");
        return;
    }

    const size = sizeElement.innerHTML;
    let del = 1;

    // Определяем множитель для валюты
    if (size === "K") {
        del = 1000;
    } else if (size === "M") {
        del = 1000000;
    } else if (size === "B") {
        del = 1000000000;
    }

    // Используем временную переменную для расчетов, без изменения `position_of_kurs_monitoring`
    let adjustedPosition = position_of_kurs_monitoring * del;
    setCookie('position_of_kurs_monitoring', position_of_kurs_monitoring, 100000);
    let formattedCost;

    // Форматируем стоимость, отсекая лишние знаки после запятой
    if (adjustedPosition >= 1000000000000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000000000000 * 10) / 10}T`;
    } else if (adjustedPosition >= 1000000000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000000000 * 10) / 10}B`;
    } else if (adjustedPosition >= 1000000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000000 * 10) / 10}M`;
    } else if (adjustedPosition >= 1000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000 * 10) / 10}K`;
    } else {
        formattedCost = Math.trunc(adjustedPosition).toString();
    }

    costActionElement.innerHTML = `Цена 1${size} акции: ${formattedCost}`;
}




/* Открытие и закрытие меню покупки акций */

function open_menu_a(){

    
    const buy_fon = document.getElementById(`buy_a_fon`); // Находим блок с определённым id
    buy_fon.style.display = "none";

    const fon_menu = document.getElementById(`menu_a_fon`); // Находим блок с определённым id
    fon_menu.style.display = "flex";
}

function menuclose(){
    const buy_fon = document.getElementById(`buy_a_fon`); // Находим блок с определённым id
    buy_fon.style.display = "flex";

    const fon_menu = document.getElementById(`menu_a_fon`); // Находим блок с определённым id
    fon_menu.style.display = "none";
}


/* Открытие и закрытие меню продажи акций */

function open_menu_sell_a(){
    const buy_fon = document.getElementById(`buy_a_fon`); // Находим блок с определённым id
    buy_fon.style.display = "none";

    const fon_menu = document.getElementById(`menu_a_fon2`); // Находим блок с определённым id
    fon_menu.style.display = "flex";
    
}

function menuclose2(){
    const buy_fon = document.getElementById(`buy_a_fon`); // Находим блок с определённым id
    buy_fon.style.display = "flex";

    const fon_menu = document.getElementById(`menu_a_fon2`); // Находим блок с определённым id
    fon_menu.style.display = "none";
}







/* Ввод денег и сменаразмера оплаты */

function limitInput(element) {
    if (element.value.length > 3) {
        element.value = element.value.slice(0, 3); // Обрезает ввод до 3 символов
    }
}

window.limitInput = limitInput;

let choose_num = 2;
const choose_text1 = ["","X","K","M","B",""];

function minus_variant(){
    if(choose_num > 1){
        choose_num -= 1;

        const text_size1 = document.getElementById("VCH1").innerHTML = choose_text1[choose_num+1];
        const text_size2 = document.getElementById("VCH2").innerHTML = choose_text1[choose_num];
        const text_size3 = document.getElementById("VCH3").innerHTML = choose_text1[choose_num-1];

        cost_ac()
        
        if (document.getElementById("VCH3").innerHTML == ""){
            document.getElementById("variants_of_money_block").style.paddingBottom = "14px";
        } 
        if (document.getElementById("VCH1").innerHTML != ""){
            document.getElementById("variants_of_money_block").style.paddingTop = "0px";
        }
    }
}

function plus_variant(){
    if(choose_num < 4){
        choose_num +=1 ;
        
        const text_size1 = document.getElementById("VCH1").innerHTML = choose_text1[choose_num+1];
        const text_size2 = document.getElementById("VCH2").innerHTML = choose_text1[choose_num];
        const text_size3 = document.getElementById("VCH3").innerHTML = choose_text1[choose_num-1];

        cost_ac()
  
        if (document.getElementById("VCH1").innerHTML == ""){
            document.getElementById("variants_of_money_block").style.paddingTop = "10px";
        }
        if (document.getElementById("VCH3").innerHTML != ""){
            document.getElementById("variants_of_money_block").style.paddingBottom = "0px";
        }
    }
}











/*покупаем акции */

function buy_actions(){

    let money_variant = choose_num;

    const money_input = document.getElementById("inputFieldMoney");

    let count = 0;
    let money = 0;
    if (money_variant == 1){
        count = (Number(money_input.value) * 1)
        money = (Number(money_input.value) * 1) * position_of_kurs_monitoring;
    } else if (money_variant == 2){
        count = (Number(money_input.value) * 1000)
        money = (Number(money_input.value) * 1000) * position_of_kurs_monitoring;
    } else if (money_variant == 3){
        count = (Number(money_input.value) * 1000000)
        money = (Number(money_input.value) * 1000000) * position_of_kurs_monitoring;
    } else if (money_variant == 4){
        count = (Number(money_input.value) * 1000000000)
        money = (Number(money_input.value) * 1000000000) * position_of_kurs_monitoring;
    } 
    setCookie('position_of_kurs_monitoring', position_of_kurs_monitoring, 100000);


    console.log(money)


    if (money != "" && money>0 && money <= gameState.score){
        gameState.score -= money;
        Count_Actions += count;
        count_ac()

        menuclose();
        money_input.value = "";
    }

    
    setCookie('Count_Actions', Count_Actions, 100000);
    score_detected();
}












let choose_sell = 2;
const choose_text_sell = ["","X","K","M","B",""];

function minus_variant_sell(){
    if(choose_sell > 1){
        choose_sell -= 1;

        const text_size1 = document.getElementById("SCH1").innerHTML = choose_text1[choose_sell+1];
        const text_size2 = document.getElementById("SCH2").innerHTML = choose_text1[choose_sell];
        const text_size3 = document.getElementById("SCH3").innerHTML = choose_text1[choose_sell-1];

        count_ac()
        
        if (document.getElementById("SCH3").innerHTML == ""){
            document.getElementById("variants_of_money_block_sell").style.paddingBottom = "14px";
        } 
        if (document.getElementById("SCH1").innerHTML != ""){
            document.getElementById("variants_of_money_block_sell").style.paddingTop = "0px";
        }
    }
}

function plus_variant_sell(){
    if(choose_sell < 4){
        choose_sell +=1 ;
        
        const text_size1 = document.getElementById("SCH1").innerHTML = choose_text1[choose_sell+1];
        const text_size2 = document.getElementById("SCH2").innerHTML = choose_text1[choose_sell];
        const text_size3 = document.getElementById("SCH3").innerHTML = choose_text1[choose_sell-1];

        count_ac()
  
        if (document.getElementById("SCH1").innerHTML == ""){
            document.getElementById("variants_of_money_block_sell").style.paddingTop = "10px";
        }
        if (document.getElementById("SCH3").innerHTML != ""){
            document.getElementById("variants_of_money_block_sell").style.paddingBottom = "0px";
        }
    }
}



let Count_Actions = parseInt(getCookie('Count_Actions')) || 0;

function count_ac() {
    const sizeElement = document.getElementById("SCH2");
    const costActionElement = document.getElementById("cost_action_sell");

    if (!sizeElement || !costActionElement) {
        console.warn("Элементы не найдены");
        return;
    }

    const size = sizeElement.innerHTML;
    let del = 1;

    // Определяем множитель для валюты
    if (size === "K") {
        del = 1000;
    } else if (size === "M") {
        del = 1000000;
    } else if (size === "B") {
        del = 1000000000;
    }

    // Используем временную переменную для расчетов, без изменения `position_of_kurs_monitoring`
    let adjustedPosition = Count_Actions / del;
    let formattedCost;

    // Форматируем стоимость, отсекая лишние знаки после запятой
    if (adjustedPosition >= 1000000000000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000000000000 * 10) / 10}T`;
    } else if (adjustedPosition >= 1000000000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000000000 * 10) / 10}B`;
    } else if (adjustedPosition >= 1000000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000000 * 10) / 10}M`;
    } else if (adjustedPosition >= 1000) {
        formattedCost = `${Math.trunc(adjustedPosition / 1000 * 10) / 10}K`;
    } else {
        formattedCost = `${Math.trunc(adjustedPosition).toString()}X`;
    }

    costActionElement.innerHTML = `У вас: ${formattedCost} Акций`;

    setCookie('Count_Actions', Count_Actions, 100000);
    score_detected();
}






/*продаём акции */

function sell_actions(){

    let money_variant = choose_sell;

    const money_input = document.getElementById("inputFieldMoneySell");


    let count = 0;
    let money = 0;
    if (money_variant == 1){
        count = (Number(money_input.value) * 1)
        money = (Number(money_input.value) * 1) * position_of_kurs_monitoring;
    } else if (money_variant == 2){
        count = (Number(money_input.value) * 1000)
        money = (Number(money_input.value) * 1000) * position_of_kurs_monitoring;
    } else if (money_variant == 3){
        count = (Number(money_input.value) * 1000000)
        money = (Number(money_input.value) * 1000000) * position_of_kurs_monitoring;
    } else if (money_variant == 4){
        count = (Number(money_input.value) * 1000000000)
        money = (Number(money_input.value) * 1000000000) * position_of_kurs_monitoring;
    } 

    console.log(count)


    if (count != "" && count > 0 && Count_Actions >= count){
        gameState.score += money;
        Count_Actions -= count;
        count_ac();

        menuclose2();
        money_input.value = "";
    }

    
    setCookie('Count_Actions', Count_Actions, 100000);
    score_detected();
}


