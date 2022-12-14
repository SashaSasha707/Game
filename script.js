/*
1. Вибрати поле для гри  +
2. Заповнити поле картками +
3. Клік по карткам +
4. Зробити переворот карток +
4.1 Розмістити картинки для кожної картки +
4.2 Показуємо картинку +
5. Якщо вибрано дві картинки - перевіряємо на співпадіння +
5.1 Якщо картинки співпадають, то видаляємо картки +
5.2 Перегорнути всі вибарні картки +
6. Коли всі картки видалені - зявляється вікно з перезапуском гри
7. При клику на кнопку рестарт - оновлюємо сторінку.
*/

// обираємо поле з СSS по селектору
var cardField = document.querySelector("#cards");
console.dir(cardField);

//блок перезапуску гри
var resetBlock = document.querySelector("#reset");
console.dir(resetBlock);
    
//кнопка рестарт
var resetBtn = document.querySelector("#reset-btn");

//заповнємо ігрове поле картками
//створюємо коробочку для карточок (у нас їх 16)
var countCards = 48;

      

//коробочка з видаленими картками
var deletedCards = 0;

//створюємо коробочку де буде зберігатись набір карточок
var selected = [];

//щоб була пауза між кліками по карточці
var pause = false;

//console.dir(images[3]) - дивимось конкретно номер картки
//створюємо перемінну з картинками
var images = [
    1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24,
    1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24];

//переміщуємо картки
function shuffle() {
  return 0.5 - Math.random();
}

images.sort(shuffle);

document.writeln(images);



//автоматично створюємо li; i - ітерація
//for (ітерація; умова)
for (var i = 0; i < countCards; i = i + 1) {
    //робимо змінну коробочку li
    var li = document.createElement("li");
    li.id = i;
    //розміщуємо картки на ігоровому полі (li - це дитина ul)
    cardField.appendChild(li);
};

//робимо клік по карткам (event - це подія, targer - це мета (працюємо з фоном у стилях))
cardField.onclick = function (event) {
    if (pause == false) {
        //створюємо коробочку з елементом (тобто одна картка)
        var element = event.target;
        //звертаємось до стилів, щоб при кліці змінювалась картинка або колір
        //element.style.background = "green";
        //робимо так, щоб фон змінювався лише де картки
        if (element.tagName == "LI" && element.className !="active") {
        //поміщюємо в selected картки, push - встанвити елемент в кінеце
        selected.push(element);
        //робимо дыю, щоб видалялось дві картки
        element.className = "active"; 
        //Робимо коробочку з картинками
        var img = images[element.id];
        //робимо фон картинок
        element.style.backgroundImage = "url(images/" + img + ".png)";
        //робимо так, щоб перегорталось лише дві картки
            if (selected.length == 2) {
                pause = true;
            //перевіряємо, щоб картки дорівнювали одна одній
            if (images[selected[0].id] == images[selected[1].id]) {
                selected[0].style.visibility = "hidden";
                selected[1].style.visibility = "hidden";
                deletedCards = deletedCards + 2;
            }

            //робимо затримку 
            setTimeout(refreshCards, 600)
        }
        
    };

    }

};

function refreshCards() {
    for (var i = 0; i < countCards; i = i + 1) {
        cardField.children[i].className = "";
        cardField.children[i].style.backgroundImage = 'url("images/back.png")';
    }

    if (deletedCards == countCards) {
        resetBlock.style.display = "block";
    }
        
    selected = [];
    pause = false;
};

resetBtn.onclick = function () {
    location.reload();
}