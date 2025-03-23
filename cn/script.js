// script.js          --Version 0.7
import { getCookie, setCookie } from "./coockie.js";
import { getRandomInt } from "./kurs_script.js";
import { creatobj } from "./animations.js";

//Объявляем глобальные переменные

window.alerted = alerted;
window.inf = inf;
window.settings = settings;
window.close_inf = close_inf;
window.close_stngs = close_stngs;

// --- Инициализация объекта gameState ---
export const gameState = {
    score: parseInt(getCookie('score')) || 0,
    dohod: parseInt(getCookie('dohod')) || 0,
    dohod_time: parseInt(getCookie('dohod_time')) || 60,
    dohod_click: parseInt(getCookie('dohod_click')) || 1,

    mayning_size: parseInt(getCookie('mayning_size')) || 0,
    hack: parseInt(getCookie('hack')) || 0,
    router: parseInt(getCookie('router')) || 0,
    brocker: parseInt(getCookie('brocker')) || 0,

    hack_pay: parseInt(getCookie('hack_pay')) || 30,
    mayn_pay: parseInt(getCookie('mayn_pay')) || 1000,
    r_pay: parseInt(getCookie('r_pay')) || 70000,
    br_pay: parseInt(getCookie('br_pay')) || 1000000,




    hack_click_monitoring: parseInt(getCookie('hack_click_monitoring')) || 0,
    mayn_click_monitoring: parseInt(getCookie('mayn_click_monitoring')) || 0,
    r_click_monitoring: parseInt(getCookie('r_click_monitoring')) || 0,
    br_click_monitoring: parseInt(getCookie('br_click_monitoring')) || 0,
    
    hack_sec_monitoring: parseInt(getCookie('hack_sec_monitoring')) || 0,
    mayn_sec_monitoring: parseInt(getCookie('mayn_sec_monitoring')) || 0,
    r_sec_monitoring: parseInt(getCookie('r_sec_monitoring')) || 0,
    br_sec_monitoring: parseInt(getCookie('br_sec_monitoring')) || 0,




    hacker_ban: parseInt(getCookie('hacker_ban')) || 0,
    mayning_ban: parseInt(getCookie('mayning_ban')) || 0,
    router_ban: parseInt(getCookie('router_ban')) || 0,
    brocker_ban: parseInt(getCookie('brocker_ban')) || 0,

    SpellAndBuySize: 1
};

// --- Класс StoreAdd ---
class StoreAdd {
    constructor(options, gameState, updatePricesFunc) {
        this.gameState = gameState;
        this.tovarKey = options.tovar;       // Ключ для количества товара, например, 'hack'
        this.payKey = options.pay;           // Ключ для цены товара, например, 'hack_pay'
        this.factor = options.factor;
        this.text_tovar = options.text_tovar;
        this.text_pay = options.text_pay;
        this.text_sell = options.text_sell;
        this.text_num = options.text_num;
        this.text_fon = options.text_fon;
        this.banKey = options.ban;           // Ключ для счётчика банов, например, 'hacker_ban'
        this.text_ban = options.text_ban;
        this.text_block = options.text_block;

        this.tovarMonitoring_sec = options.tovarMonitoring_sec;
        this.tovarMonitoring_click = options.tovarMonitoring_click;

        this.updatePricesFunc = updatePricesFunc;

        this.init();
    }

    init() {
        this.updateDisplay();
        this.addEventListener();
        this.updateColor(); // Проверка доступности при инициализации
    }

    formatMonitor(dh_minus) {
        if (dh_minus>=1000000000){
            dh_minus = parseFloat((dh_minus/1000000000).toFixed(1)) + " B";

        }else
        if (dh_minus>=1000000){
            dh_minus = parseFloat((dh_minus/1000000).toFixed(1)) + " M";

        }else{
            if (dh_minus>=1000){
                dh_minus = parseFloat((dh_minus/1000).toFixed(1)) + " K";

            }else{
                dh_minus = dh_minus;

            }
        }

        return dh_minus;
    }

    tovar_press() {
        // Вычисляем общую стоимость и новую цену
        let currentPrice = this.gameState[this.payKey];
        let result = this.calculateTotalCost(currentPrice, this.gameState.SpellAndBuySize, this.factor);
        let total_cost = result.totalCost;
        let new_price = result.newPrice;

        console.log(`Score: ${this.gameState.score}, Price: ${currentPrice}`);

        if (this.gameState.score >= total_cost) {
            this.gameState.score -= total_cost;
            setCookie('score', this.gameState.score, 1000);

            score_detected();

            // Обновляем цену
            this.gameState[this.payKey] = new_price;
            setCookie(this.text_pay, this.gameState[this.payKey], 1000);

            // Обновляем отображение стоимости
            const sell = document.getElementById(this.text_sell);
            if (sell) {
                sell.innerText = this.formatPrice(this.gameState[this.payKey]);
            }



            switch (this.text_num) {
                case 'm':
                    this.MainPointScrap(1)
                    break;
                case 'r':
                    this.MainPointScrap(2)
                    break;
                case 'b':
                    this.MainPointScrap(3)
                    break;
            }



            // Обновляем количество товара
            this.gameState[this.tovarKey] += this.gameState.SpellAndBuySize;
            setCookie(this.text_tovar, this.gameState[this.tovarKey], 1000);

            // Обновляем отображение фона товара
            const sect = document.getElementById(this.text_fon);
            if (sect) {
                sect.style.display = "flex";
            }

            // Обновляем отображение изображений
            for (let i = 1; i <= 26; i++) {
                const imgElement = document.getElementById(`${this.text_num}${i}`);
                if (imgElement) {
                    imgElement.style.display = (i <= this.gameState[this.tovarKey]) ? "flex" : "none";
                }
            }


            //Обнавляем прибыль с товара
            switch (this.text_num) {
                case 'h':
                    this.gameState.hack_click_monitoring = parseInt((1.5 * gameState.hack).toFixed(1));
                    setCookie(`${this.tovarMonitoring_click}`, this.gameState.hack_click_monitoring, 1000);
                    break;
                case 'r':
                    this.gameState.r_click_monitoring = 4 * gameState.router;
                    setCookie(`${this.tovarMonitoring_click}`, this.gameState.r_click_monitoring, 1000);
                    break;
            }


            this.ChangePrib();


            // Обновляем цены и доступность других товаров
            this.updatePricesFunc();

            // Проверяем и обновляем доступность текущего и других товаров
            this.updateColor();
        } else {
            // Увеличиваем счётчик банов
            this.gameState[this.banKey] += 1;
            setCookie(this.text_ban, this.gameState[this.banKey], 1000);
        }
    }


    ChangePrib() {
        let priv_v_s = parseFloat((this.gameState[this.tovarMonitoring_sec]).toFixed(1));
        let priv_v_click = parseFloat((this.gameState[this.tovarMonitoring_click]).toFixed(1));

        console.log(priv_v_s)
        console.log(priv_v_click)

        priv_v_s = this.formatMonitor(priv_v_s);
        priv_v_click = this.formatMonitor(priv_v_click);

        

        document.getElementById(`${this.text_num}_inf_click`).innerHTML = `Прибыль за клик: +${priv_v_click}`;
        document.getElementById(`${this.text_num}_inf_sec`).innerHTML = `Прибыль в секунду: ${priv_v_s}`;
    }



    MainPointScrap(minus_dohod_time) {

        switch (this.text_num) {
            case 'm':
                if (this.gameState.dohod <= 0){
                    const plus_dohod = 1* this.gameState.SpellAndBuySize;
                    this.gameState.dohod += plus_dohod;
                    this.gameState[this.tovarMonitoring_sec] += plus_dohod;
                    console.log(1* this.gameState.SpellAndBuySize);
                }else{
                    const plus_dohod = 2+(this.gameState.dohod/10)* this.gameState.SpellAndBuySize;

                    this.gameState.dohod += plus_dohod;
                    this.gameState[this.tovarMonitoring_sec] += plus_dohod;
                }
                setCookie(`${this.tovarMonitoring_sec}`, this.gameState[this.tovarMonitoring_sec], 1000);
                break;
            case 'r':
                if (this.gameState.dohod <= 0){
                    const plus_dohod = 25* this.gameState.SpellAndBuySize;

                    this.gameState.dohod += plus_dohod;
                    this.gameState[this.tovarMonitoring_sec] += plus_dohod;
                }else{
                    const plus_dohod = 5+(this.gameState.dohod/9)* this.gameState.SpellAndBuySize;

                    this.gameState.dohod +=  plus_dohod;
                    this.gameState[this.tovarMonitoring_sec] += plus_dohod;
                }
                setCookie(`${this.tovarMonitoring_sec}`, this.gameState[this.tovarMonitoring_sec], 1000);
                break;
            case 'b':
                if (this.gameState.dohod <= 0){
                    const plus_dohod = 100* this.gameState.SpellAndBuySize;

                    this.gameState.dohod += plus_dohod;
                    this.gameState[this.tovarMonitoring_sec] += plus_dohod;
                }else{
                    const plus_dohod = 10+(this.gameState.dohod/8)* this.gameState.SpellAndBuySize;

                    this.gameState.dohod += plus_dohod;
                    this.gameState[this.tovarMonitoring_sec] += plus_dohod;
                }
                setCookie(`${this.tovarMonitoring_sec}`, this.gameState[this.tovarMonitoring_sec], 1000);
                break;
        }

        setCookie('dohod', this.gameState.dohod, 1000);

        if (this.gameState.dohod_time > 50) this.gameState.dohod_time -= minus_dohod_time;
        setCookie('dohod_time', this.gameState.dohod_time, 1000);

        let dohod_v_sek = document.getElementById("d_s");
        // let dh_minus = parseFloat((0.5+this.gameState.dohod/(this.gameState.dohod_time/100)).toFixed(1));
        let dh_minus = parseFloat((this.gameState.dohod).toFixed(1));
        console.log(`Прибыль в сек: ${dh_minus}     ${this.gameState.dohod}`)

    
        if (dh_minus>=1000000000){
            dohod_v_sek.innerHTML = parseFloat((dh_minus/1000000000).toFixed(1)) + " B";

        }else
        if (dh_minus>=1000000){
            dohod_v_sek.innerHTML = parseFloat((dh_minus/1000000).toFixed(1)) + " M";

        }else{
            if (dh_minus>=1000){
                dohod_v_sek.innerHTML = parseFloat((dh_minus/1000).toFixed(1)) + " K";

            }else{
                dohod_v_sek.innerHTML = dh_minus;

            }
        }  
    }

    calculateTotalCost(currentPrice, quantity, incrementFactor) {
        let totalCost = 0;
        let price = currentPrice;

        for (let i = 0; i < quantity; i++) {
            totalCost += price;
            price += parseFloat((price / incrementFactor).toFixed(1));
        }

        return { totalCost, newPrice: price };
    }

    updateDisplay() {
        // Обновляем отображение общей стоимости покупки на основе SpellAndBuySize
        const sell = document.getElementById(this.text_sell);
        if (sell) {
            const { totalCost } = this.calculateTotalCost(this.gameState[this.payKey], this.gameState.SpellAndBuySize, this.factor);
            sell.innerText = this.formatPrice(totalCost);
            // console.log(`Updated ${this.text_sell} to total cost: ${sell.innerText}`);
        }
    
        // Отображаем или скрываем секцию в зависимости от количества товара
        const sect = document.getElementById(this.text_fon);
        if (sect) {
            sect.style.display = (this.gameState[this.tovarKey] > 0) ? "flex" : "none";
        }
    
        // Обновляем отображение изображений товара
        for (let i = 1; i <= 26; i++) {
            const imgElement = document.getElementById(`${this.text_num}${i}`);
            if (imgElement) {
                imgElement.style.display = (i <= this.gameState[this.tovarKey]) ? "flex" : "none";
            }
        }
    }
    

    formatPrice(price) {
        if (price >= 1e24) {
            return (price / 1e24).toFixed(1) + " Y";
        } else if (price >= 1e21) {
            return (price / 1e21).toFixed(1) + " Z";
        } else if (price >= 1e18) {
            return (price / 1e18).toFixed(1) + " E";
        } else if (price >= 1e15) {
            return (price / 1e15).toFixed(1) + " P";
        } else if (price >= 1e12) {
            return (price / 1e12).toFixed(1) + " T";
        } else if (price >= 1e9) {
            return (price / 1e9).toFixed(1) + " B";
        } else if (price >= 1e6) {
            return (price / 1e6).toFixed(1) + " M";
        } else if (price >= 1e3) {
            return (price / 1e3).toFixed(1) + " K";
        } else {
            return price.toFixed(1);
        }
    }

    addEventListener() {
        const tovarElement = document.getElementById(this.text_block);
        if (tovarElement) {
            tovarElement.addEventListener('click', () => this.tovar_press());
        }
    }

    updateColor() {
        let currentPrice = this.gameState[this.payKey];
        let result = this.calculateTotalCost(currentPrice, this.gameState.SpellAndBuySize, this.factor);
        const total_cost = result.totalCost;
        const sect_b = document.getElementById(this.text_block);
        if (sect_b) {
            if (this.gameState.score >= total_cost) {
                sect_b.style.opacity = 1;
                sect_b.style.backgroundColor = "#5952b3";
            } else {
                sect_b.style.opacity = 0.4;
                sect_b.style.backgroundColor = "#3b3b3b";
            }
        }
    }
}

// --- Создание объектов магазина ---
const storeItemsData = [
    {
        tovar: 'hack',               // Ключ в gameState: 'hack'
        pay: 'hack_pay',             // Ключ в gameState: 'hack_pay'
        factor: 2.5,
        text_tovar: 'hack',
        text_pay: 'hack_pay',
        text_sell: 'h_sell',
        text_num: 'h',
        text_fon: 'h_sect',
        ban: 'hacker_ban',           // Ключ в gameState: 'hacker_ban'
        text_ban: 'hacker_ban',
        text_block: 'tovar_h',
        tovarMonitoring_sec: 'hack_sec_monitoring',
        tovarMonitoring_click: 'hack_click_monitoring'
    },
    {
        tovar: 'mayning_size',
        pay: 'mayn_pay',
        factor: 2,
        text_tovar: 'mayning_size',
        text_pay: 'mayn_pay',
        text_sell: 'm_sell',
        text_num: 'm',
        text_fon: 'mn_sect',
        ban: 'mayning_ban',
        text_ban: 'mayning_ban',
        text_block: 'tovar_m',
        tovarMonitoring_sec: 'mayn_sec_monitoring',
        tovarMonitoring_click: 'mayn_click_monitoring'
    },
    {
        tovar: 'router',
        pay: 'r_pay',
        factor: 2.6,
        text_tovar: 'router',
        text_pay: 'r_pay',
        text_sell: 'r_sell',
        text_num: 'r',
        text_fon: 'r_sect',
        ban: 'router_ban',
        text_ban: 'router_ban',
        text_block: 'tovar_r',
        tovarMonitoring_sec: 'r_sec_monitoring',
        tovarMonitoring_click: 'r_click_monitoring'
    },
    {
        tovar: 'brocker',
        pay: 'br_pay',
        factor: 3,
        text_tovar: 'brocker',
        text_pay: 'br_pay',
        text_sell: 'br_sell',
        text_num: 'b',
        text_fon: 'br_sect',
        ban: 'brocker_ban',
        text_ban: 'brocker_ban',
        text_block: 'tovar_br',
        tovarMonitoring_sec: 'br_sec_monitoring',
        tovarMonitoring_click: 'br_click_monitoring'
    }
];

const storeItems = storeItemsData.map(itemData => new StoreAdd(itemData, gameState, update_all_prices));

// --- Функции ---

/* Функция обработки клика по главной кнопке */
function alerted(){
    // Обновляем dohod_click через gameState
    gameState.dohod_click = 1 + parseInt((1.5 * gameState.hack).toFixed(1)) + 4 * gameState.router;
    setCookie('dohod_click', gameState.dohod_click, 1000);

    // Обновляем score через gameState
    gameState.score += gameState.dohod_click;
    setCookie('score', gameState.score, 100000);

    // Обновляем все элементы магазина
    storeItems.forEach(item => {
        item.updateDisplay();
        item.updateColor();
    });

    score_detected();
}


/* Функция обновления отображения счёта */
export function score_detected(){
    const p = document.getElementById("p");

    if (gameState.score >= 1000000000){
        p.innerHTML = parseFloat((gameState.score/1000000000).toFixed(3)) + " billion";
    }else
    if(gameState.score >= 1000000){
        p.innerHTML = parseFloat((gameState.score/1000000).toFixed(3)) + " million";
    }else
    if(gameState.score < 1000000){
        p.innerHTML = reFormat(parseInt((gameState.score/1).toFixed(1)));
    }

    // Обновляем все элементы магазина
    storeItems.forEach(item => {
        item.updateDisplay();
        item.updateColor();
    });
}


/* Функция обновления стоимости продажи */
function update_sell_price(price, element) {
    if (price >= 1e24) {
        element.innerHTML = (price / 1e24).toFixed(1) + " Y";
    } else if (price >= 1e21) {
        element.innerHTML = (price / 1e21).toFixed(1) + " Z";
    } else if (price >= 1e18) {
        element.innerHTML = (price / 1e18).toFixed(1) + " E";
    } else if (price >= 1e15) {
        element.innerHTML = (price / 1e15).toFixed(1) + " P";
    } else if (price >= 1e12) {
        element.innerHTML = (price / 1e12).toFixed(1) + " T";
    } else if (price >= 1e9) {
        element.innerHTML = (price / 1e9).toFixed(1) + " B";
    } else if (price >= 1e6) {
        element.innerHTML = (price / 1e6).toFixed(1) + " M";
    } else if (price >= 1e3) {
        element.innerHTML = (price / 1e3).toFixed(1) + " K";
    } else {
        element.innerHTML = price.toFixed(1);
    }
}

/* Функция расчёта общей стоимости */
function calculateTotalCost(currentPrice, quantity, incrementFactor) {
    let totalCost = 0;
    let price = currentPrice;

    for (let i = 0; i < quantity; i++) {
        totalCost += price;
        price += parseFloat((price / incrementFactor).toFixed(1));
    }

    return { totalCost, newPrice: price };
}

/* Функция обновления всех цен */
function update_all_prices() {
    storeItems.forEach(item => {
        const currentPrice = gameState[item.payKey];
        const result = item.calculateTotalCost(currentPrice, gameState.SpellAndBuySize, item.factor);
        const total_cost = result.totalCost;
        const sellElement = document.getElementById(item.text_sell);
        if (sellElement) {
            sellElement.innerHTML = item.formatPrice(total_cost);
        }
    });

    // После обновления всех цен, обновляем доступность каждого товара
    storeItems.forEach(item => {
        item.updateColor();
    });
}

function change_size_tovar(size) {
    // Преобразуем размер в целое число
    size = parseInt(size);
    console.log(`Selected buy size: ${size}`);

    // Проверка на допустимые значения
    if (![1, 10, 100].includes(size)) {
        console.warn(`Invalid buy size selected: ${size}`);
        return;
    }

    // Убираем все классы перед добавлением новых
    const sizeButtons = ['sizeTov1', 'sizeTov2', 'sizeTov3'];
    sizeButtons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.classList.remove('Tovar_SH', 'Tovar_SH_None');
        }
    });

    // Обновляем глобальную переменную количества
    gameState.SpellAndBuySize = size;
    setCookie('SpellAndBuySize', gameState.SpellAndBuySize, 1000);
    console.log(`SpellAndBuySize updated to: ${gameState.SpellAndBuySize}`);

    // Добавляем классы в зависимости от выбранного размера
    if (size === 1) {
        document.getElementById("sizeTov1").classList.add('Tovar_SH');
        document.getElementById("sizeTov2").classList.add('Tovar_SH_None');
        document.getElementById("sizeTov3").classList.add('Tovar_SH_None');
    } else if (size === 10) {
        document.getElementById("sizeTov1").classList.add('Tovar_SH_None');
        document.getElementById("sizeTov2").classList.add('Tovar_SH');
        document.getElementById("sizeTov3").classList.add('Tovar_SH_None');
    } else if (size === 100) {
        document.getElementById("sizeTov1").classList.add('Tovar_SH_None');
        document.getElementById("sizeTov2").classList.add('Tovar_SH_None');
        document.getElementById("sizeTov3").classList.add('Tovar_SH');
    }

    // Обновляем цены и доступность товаров
    update_all_prices();
    console.log(`Updated all prices after changing buy size to: ${size}`);
}

/* Привязка обработчиков событий к кнопкам выбора размера */
document.querySelectorAll('.num_of_buy .pg_ch').forEach(button => {
    button.addEventListener('click', () => {
        const size = parseInt(button.getAttribute('data-size'));
        change_size_tovar(size);
    });
});

/* Обработка достижений */
let dastd1 = false;
let dastd2 = false;
let dastd3 = false;
let dastd4 = false;
let dastd5 = false;

function dostij(){
    /* Первое достижение */
    if(gameState.score === 1 && dastd1 === false){
        dastd1 = true;
        var d_block = document.getElementById("dast_block1");
        d_block.style.display = "flex";
    }

    /* Второе достижение */
    if(gameState.hacker_ban === 100 && dastd2 === false){
        dastd2 = true;
        var d_block = document.getElementById("dast_block2");
        d_block.style.display = "flex";
        console.log("Вы 100-й раз попросили хакера за бесплатно к вам устроиться. Хакер от бешенства попытался взломать вас, но постыдился, увидев ваш счёт)");
    }

    /* Третье достижение */
    if(gameState.mayning_ban === 200 && dastd3 === false){
        dastd3 = true;
        var d_block = document.getElementById("dast_block3");
        d_block.style.display = "flex";
        console.log("У вас 200-й не хватило денег на RTX 4050 и вы от отчаяния застрелились, ваше место занял другой жизнеспособный идиот)");
    }

    /* Четвёртое достижение */
    if(gameState.router_ban === 300 && dastd4 === false){
        dastd4 = true;
        var d_block = document.getElementById("dast_block4");
        d_block.style.display = "flex";
        console.log("Вы 300-й раз попытались стащить роутер за бесплатно, но вас увидели и избили)");  /* Сделать достижение "бессмертный" */
    }

    /* Пятое достижение */
    if(gameState.brocker_ban === 400 && dastd5 === false){
        dastd5 = true;
        var d_block = document.getElementById("dast_block5");
        d_block.style.display = "flex";
        console.log("Брокер послал вас нахер)");
    }
}

setInterval(dostij, 50);

/* Доход в секунду */
function Dohod_T(){
    gameState.score += gameState.dohod;
    console.log(gameState.dohod)
    setCookie('score', gameState.score, 1000);
    score_detected();
}

setInterval(Dohod_T, gameState.dohod_time); // Переводим в миллисекунды

/* Вспомогательные функции */
function reFormat(num){
    return ('' + num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

/* Функции открытия и закрытия инфо и настроек */
function inf(){
    const inf_block = document.getElementById("inf_block");
    inf_block.style.display = "flex";
    console.log("open_inf");
}

function close_inf(){
    const inf_block = document.getElementById("inf_block");
    inf_block.style.display = "none";
    console.log("close_inf");
}

function settings(){
    const stngs_block = document.getElementById("stngs_block");
    stngs_block.style.display = "flex";
    console.log("open_settings");
}

function close_stngs(){
    const stngs_block = document.getElementById("stngs_block");
    stngs_block.style.display = "none";
    console.log("close_settings");
}

/* Кнопки удаления достижений */
['delete_d1', 'delete_d2', 'delete_d3', 'delete_d4', 'delete_d5'].forEach(id => {
    const deleteBtn = document.getElementById(id);
    if (deleteBtn) {
        deleteBtn.addEventListener('mouseup', () => {
            const d_block = document.getElementById(id.replace('delete_d', 'dast_block'));
            if (d_block) d_block.style.display = "none";
        });
    }
});

/* Функция обновления данных при загрузке страницы */
function update_data(){
    console.log("update....")

    // Обновляем все элементы магазина
    storeItems.forEach(item => {
        item.updateDisplay();
        item.updateColor();
        item.ChangePrib();
    });

    // Обновляем цены
    update_all_prices();

    // Обновляем отображение dohod
    const dohod_v_sek = document.getElementById("d_s");
    // let dh_minus = parseFloat((0.5 + gameState.dohod / (gameState.dohod_time / 100)).toFixed(1));
    let dh_minus = parseFloat((gameState.dohod).toFixed(1));
    console.log(`Прибыль в сек: ${dh_minus}     ${gameState.dohod}`)

    if (dh_minus === 0.5){
        dh_minus = 0;
    }

    if (dh_minus >= 1e9){
        dohod_v_sek.innerHTML = parseFloat((dh_minus / 1e9).toFixed(1)) + " B";
    } else if (dh_minus >= 1e6){
        dohod_v_sek.innerHTML = parseFloat((dh_minus / 1e6).toFixed(1)) + " M";
    } else if (dh_minus >= 1e3){
        dohod_v_sek.innerHTML = parseFloat((dh_minus / 1e3).toFixed(1)) + " K";
    } else {
        dohod_v_sek.innerHTML = dh_minus;
    }

    score_detected();
}

/* Инициализация отображения при загрузке страницы */
document.addEventListener('DOMContentLoaded', () => {
    update_data();
});





