const button = document.getElementById('M_btn');

let score = 0;
let dohod = 0;
let dohod_time = 60;
let dohod_click = 1;

let mayning_size = 0;
let hack = 0;
let router = 0;
let brocker = 0;

let hack_pay = 30;
let mayn_pay = 1000;
let r_pay = 70000;
let br_pay = 1000000;

function alerted(){
     
    dohod_click = 1 + 2*(hack) + 3*(router);

    score += dohod_click;

    console.log(score)

    var p = document.getElementById("p");

    score_detected();
  }


function score_detected(){
    // if (score >= 100000){
    //     p.innerHTML = parseFloat((score/1000).toFixed(1)) + " thousand";
    // }
    if(score >= 1000000){
        p.innerHTML = parseFloat((score/1000000).toFixed(3)) + " million";
    }
    if(score < 1000000){
        p.innerHTML = reFormat(parseInt((score/1).toFixed(1)));
    }
}

function hack_press(){

    console.log(score, hack_pay)

    if (score >= hack_pay){

        score-= hack_pay;

        score_detected();


        hack_pay += parseInt((hack_pay/2.1).toFixed(1)); 
        var hack_sell = document.getElementById("h_sell");

        if (hack_pay>=1000000000){
            hack_sell.innerHTML = parseFloat((hack_pay/1000000000).toFixed(1)) + " B";

        }else{
            if (hack_pay>=1000000){
                hack_sell.innerHTML = parseFloat((hack_pay/1000000).toFixed(1)) + " M";
                
            }else{
                if (hack_pay>=10000){
                    hack_sell.innerHTML = parseFloat((hack_pay/1000).toFixed(1)) + " K";

                }else{
                    hack_sell.innerHTML = hack_pay;
                }
            }
        }


        if(dohod_time>50){
            dohod_time -= 1;
        }

        hack += 1;
        hack_block = "h" + hack;
        if (hack==1){
            var h_sect = document.getElementById("h_sect");
            h_sect.style.display = "flex";
        }
        if (hack<=26){
            var hack_arr = document.getElementById(hack_block);
            hack_arr.style.display = "flex";
        }
    }else{
        console.log("Вы попросили хакера за бесплатно к вам устроиться. Хакер от бешенства попытался взламать вас, но постыдился, увидев ваш счёт)")
    }

}

function myning_press(){

    if (score >= mayn_pay){

        score-= mayn_pay;

        score_detected();


        mayn_pay += parseInt((mayn_pay/3).toFixed(1));
        var mayn_sell = document.getElementById("m_sell");

        if (mayn_pay>=1000000000){
            mayn_sell.innerHTML = parseFloat((mayn_pay/1000000000).toFixed(1)) + " B";

        }else{
            if (mayn_pay>=1000000){
                mayn_sell.innerHTML = parseFloat((mayn_pay/1000000).toFixed(1)) + " M";

            }else{
                if (mayn_pay>=10000){
                    mayn_sell.innerHTML = parseFloat((mayn_pay/1000).toFixed(1)) + " K";

                }else{
                    mayn_sell.innerHTML = mayn_pay;

                }
            }
        }

        if (dohod <= 0){
            dohod += 1;
        }else{
            dohod += 2+(dohod/10);
        }

        if(dohod_time>50){
            dohod_time -= 1;
        }

        var dohod_v_sek = document.getElementById("d_s");
        let dh_minus = parseFloat((0.5+dohod/(dohod_time/100)).toFixed(1));

 
        if (dh_minus>=1000000){
            dohod_v_sek.innerHTML = parseFloat((dh_minus/1000000).toFixed(1)) + " M";

        }else{
            if (dh_minus>=1000){
                dohod_v_sek.innerHTML = parseFloat((dh_minus/1000).toFixed(1)) + " K";

            }else{
                dohod_v_sek.innerHTML = dh_minus;

            }
        }  

        mayning_size +=1;
        
        mn_block = "m" + mayning_size;
        if (mayning_size==1){
            var mn_sect = document.getElementById("mn_sect");
            mn_sect.style.display = "flex";
        }
        if (mayning_size<=26){
            var mn_arr = document.getElementById(mn_block);
            mn_arr.style.display = "flex";
        }
    }else{
        console.log("У вас не хватило денег на RTX 4050 и вы от отчаяния застрелились, ваше место занял другой жизнеспособный идиот)")
    }
}

function router_press(){
    if (score >= r_pay){

        score-= r_pay;

        score_detected();


        r_pay += parseInt((r_pay/2.6).toFixed(1));
        var r_sell = document.getElementById("r_sell");

        if (r_pay>=1000000000){
            r_sell.innerHTML = parseFloat((r_pay/1000000000).toFixed(1)) + " B";

        }else{
            if (r_pay>=1000000){
                r_sell.innerHTML = parseFloat((r_pay/1000000).toFixed(1)) + " M";

            }else{
                if (r_pay>=10000){
                    r_sell.innerHTML = parseFloat((r_pay/1000).toFixed(1)) + " K";

                }else{
                    r_sell.innerHTML = r_pay;

                }
            }
        }

        if (dohod <= 0){
            dohod += 25;
        }else{
            dohod += 5+(dohod/9);
        }

        if(dohod_time>50){
            dohod_time -= 2;
        }

        var dohod_v_sek = document.getElementById("d_s");
        let dh_minus = parseFloat((0.5+dohod/(dohod_time/100)).toFixed(1));

 
        if (dh_minus>=1000000){
            dohod_v_sek.innerHTML = parseFloat((dh_minus/1000000).toFixed(1)) + " M";

        }else{
            if (dh_minus>=1000){
                dohod_v_sek.innerHTML = parseFloat((dh_minus/1000).toFixed(1)) + " K";

            }else{
                dohod_v_sek.innerHTML = dh_minus;

            }
        }  


        router += 1;
        rt_block = "r" + router;
        if (router==1){
            var r_sect = document.getElementById("r_sect");
            r_sect.style.display = "flex";
        }
        if (router<=26){
            var rt_arr = document.getElementById(rt_block);
            rt_arr.style.display = "flex";
        }
    }else{
        console.log("Вы попытались стащить роутер за бесплатно, но вас увидели и избили)")  /* сделать достижение "бессмертный" */
    }
}

function brocker_press(){
    if (score >= br_pay){

        score-= br_pay;

        score_detected();


        br_pay += parseInt((br_pay/2.3).toFixed(1));
        var br_sell = document.getElementById("br_sell");

        if (br_pay>=1000000000){
            br_sell.innerHTML = parseFloat((br_pay/1000000000).toFixed(1)) + " B";

        }else{
            if (br_pay>=1000000){
                br_sell.innerHTML = parseFloat((br_pay/1000000).toFixed(1)) + " M";

            }else{
                if (br_pay>=10000){
                    br_sell.innerHTML = parseFloat((br_pay/1000).toFixed(1)) + " K";

                }else{
                    br_sell.innerHTML = br_pay;

                }
            }
        }

        if (dohod <= 0){
            dohod += 100;
        }else{
            dohod += 10+(dohod/8);
        }

        if(dohod_time>50){
            dohod_time -= 3;
        }

        var dohod_v_sek = document.getElementById("d_s");
        let dh_minus = parseFloat((0.5+dohod/(dohod_time/100)).toFixed(1));

 
        if (dh_minus>=1000000){
            dohod_v_sek.innerHTML = parseFloat((dh_minus/1000000).toFixed(1)) + " M";

        }else{
            if (dh_minus>=1000){
                dohod_v_sek.innerHTML = parseFloat((dh_minus/1000).toFixed(1)) + " K";

            }else{
                dohod_v_sek.innerHTML = dh_minus;

            }
        }  


        brocker += 1;
        br_block = "b" + brocker;
        if (brocker==1){
            var br_sect = document.getElementById("br_sect");
            br_sect.style.display = "flex";
        }
        if (brocker<=26){
            var br_arr = document.getElementById(br_block);
            br_arr.style.display = "flex";
        }
    }else{
        console.log("Брокер послал вас нахер)")
    }
}




function Dohod_T(){
    score += dohod;
    score_detected();
}


setInterval(Dohod_T, dohod_time)


function reFormat(num){
        return ('' + num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')  
}
    









//anim for click

let count = 0; // Счетчик для уникального ID

function creatobj(event) {
    
    // Создаем новый div
    let newDiv = document.createElement("div");

    // Создаем новый div
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
    newDiv.style.left = x - 10 + "px"; // Устанавливаем координаты X
    newDiv.style.top = y - 10 + "px";  // Устанавливаем координаты Y


    const money_section = document.querySelector('#B_id');
    const rect = money_section.getBoundingClientRect();


    score_x = getRandomInt(rect.left, (rect.left+rect.width));
    score_y = getRandomInt(rect.top, (rect.top+rect.height));

    console.log(score_x)


    // Устанавливаем абсолютное позиционирование по координатам курсора
    p_score.style.position = "absolute";
    p_score.style.left = score_x + "px"; // Устанавливаем координаты X         
    p_score.style.top = score_y + "px";  // Устанавливаем координаты Y

    // Присваиваем текстовое значение для созданного элемента
    p_score.textContent = `+${parseFloat((dohod_click/1).toFixed(1))}`; // Пример текста внутри объекта


    document.body.appendChild(newDiv); // Добавляем div на страницу
    document.body.appendChild(p_score); // Добавляем h на страницу

    rnd_x = getRandomInt(-40,40);
    rnd_y = getRandomInt(15,40);

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
        top: `-=30px`,  
        easing: 'easeOutSine',
        duration: 1000,
        opacity: [1, 0.0],

        complete: function() {
            // Удаляем элемент после завершения анимации
            p_score.remove();
        }
    });



}


function inf(){
    inf_block = document.getElementById("inf_block");
    inf_block.style.display = "flex";

    console.log("open_inf");
}

function close_inf(){
    inf_block = document.getElementById("inf_block");
    inf_block.style.display = "none";

    console.log("close_inf");
}



function settings(){
    stngs_block = document.getElementById("stngs_block");
    stngs_block.style.display = "flex";

    console.log("open_settings");
}

function close_stngs(){
    stngs_block = document.getElementById("stngs_block");
    stngs_block.style.display = "none";

    console.log("close_settings");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function change_availability(){

    var h_sect = document.getElementById("tovar_h");

    if(score>=hack_pay){
        h_sect.style.opacity = 1;
        h_sect.style.backgroundColor = "#838383";
    }else{
        h_sect.style.opacity = 0.8;
        h_sect.style.backgroundColor = "#3b3b3b";
    }


    var mn_sect = document.getElementById("tovar_m");

    if(score>=mayn_pay){
        mn_sect.style.opacity = 1;
        mn_sect.style.backgroundColor = "#838383";
    }else{
        mn_sect.style.opacity = 0.8;
        mn_sect.style.backgroundColor = "#3b3b3b";
    }



    var r_sect = document.getElementById("tovar_r");

    if(score>=r_pay){
        r_sect.style.opacity = 1;
        r_sect.style.backgroundColor = "#838383";
    }else{
        r_sect.style.opacity = 0.8;
        r_sect.style.backgroundColor = "#3b3b3b";
    }



    var br_sect = document.getElementById("tovar_br");

    if(score>=br_pay){
        br_sect.style.opacity = 1;
        br_sect.style.backgroundColor = "#838383";
    }else{
        br_sect.style.opacity = 0.8;
        br_sect.style.backgroundColor = "#3b3b3b";
    }

    
}

setInterval(change_availability, 50)








/*анимация нажатия на BigMoney*/


const coin = document.getElementById('M_btn');
let isAnimating = false;  // Флаг состояния анимации
let isHeld = false;  // Флаг для отслеживания зажатия ЛКМ

// Функция анимации увеличения
function animateCoinIncrease() {
    anime.remove('#M_btn');
    anime({
        targets: '#M_btn',
        scale: [1, 1.25],  // Уменьшаем масштаб до 1.25 для "тяжести"
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
            { value: 1.1, duration: 50 },  // Легкое уменьшение для инерции
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




// Проверка на зажатие ЛКМ каждые 100 мс, чтобы гарантировать проигрывание анимации
setInterval(() => {
    if (isHeld && !isAnimating) {
        isAnimating = true;
        animateCoinIncrease();
    }
}, 50);


// Анимация при mouseup (уменьшение размера и плавная вибрация)
coin.addEventListener('mouseout', () => {
    isHeld = false;  // Снимаем флаг зажатия
    if (isAnimating) {
        animateCoinDecrease();  // Запускаем анимацию уменьшения
    }
    console.log("fdkvn")
});
