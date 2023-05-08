

const targets = document.querySelectorAll('.target');
let isSticky = false;   // флаг, указывающий, что элемент "приклеен" к курсору
let stickyElement = null;  // элемент, который "приклеен" к курсору





targets.forEach(target => {
    target.addEventListener('mousedown', (e) => {
        // запоминаем начальные координаты курсора и позиции элемента
        const startX = e.clientX;
        const startY = e.clientY;
        const targetX = target.offsetLeft;
        const targetY = target.offsetTop;





        document.addEventListener('mousemove', onMouseMove);        // добавляем обработчик события mousemove на document


        document.addEventListener('mouseup', onMouseUp);        // добавляем обработчик события mouseup на document


        document.addEventListener('keydown', function(event) {



            if (event.key === 'Escape') { // Обработчик для нажатия клавиши ESC




                    // удаляем обработчики событий мыши
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                    stickyElement.style.left = targetX+'px';
                    stickyElement.style.top = targetY +'px';

                    // снимаем флаг, указывающий, что элемент "приклеен" к курсору
                    isSticky = false;

            }
        });



        function onMouseMove(e) {       // функция для обработки события mousemove
            // вычисляем новые координаты элемента
            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;
            const newTargetX = targetX + diffX;
            const newTargetY = targetY + diffY;

            // перемещаем элемент
            target.style.left = newTargetX + 'px';
            target.style.top = newTargetY + 'px';
        }


        function onMouseUp() {       // функция для обработки события mouseup
            // удаляем обработчики событий
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
});


targets.forEach(target => {
    target.addEventListener('dblclick', (e) => {
        target.classList.toggle('selected');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('selected')) return;
    e.target.classList.remove('selected');
});




function onDoubleClick(event) {  // обработчик события "двойной клик"

    if (isSticky) {  // если элемент уже "приклеен" к курсору, игнорируем событие
        return;
    }


    stickyElement = event.target;  // запоминаем элемент, на который кликнули дважды


    isSticky = true;    // устанавливаем флаг, указывающий, что элемент "приклеен" к курсору






    document.addEventListener('mousemove', onMouseMove);    // добавляем обработчики событий мыши для перемещения элемента
    document.addEventListener('mouseup', onMouseUp);

}


function onMouseMove(event) {  // обработчик события "движение мыши"

    if (isSticky) {    // если элемент "приклеен" к курсору
        // перемещаем элемент за курсором
        stickyElement.style.left = `${event.clientX}px`;
        stickyElement.style.top = `${event.clientY}px`;
    }
}


function onMouseUp(event) {     // обработчик события "отжатие левой кнопки мыши"

    if (isSticky) {    // если элемент "приклеен" к курсору
        // удаляем обработчики событий мыши
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);


        isSticky = false;   // снимаем флаг, указывающий, что элемент "приклеен" к курсору


    }
}


targets.forEach((element) => { // добавляем обработчик события "двойной клик" ко всем элементам с классом "target"
    element.addEventListener('dblclick', onDoubleClick);
});


document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        // Получаем текущий перемещаемый элемент
        const currentTarget = document.querySelector(".target.is-dragging");

        if (currentTarget) {// Отменяем перетаскивание

            currentTarget.classList.remove("is-dragging");
            document.body.classList.remove("is-dragging");


            currentTarget.style.left = currentTarget.dataset.left;  // Возвращаем элемент на исходную позицию
            currentTarget.style.top = currentTarget.dataset.top;
        }
    }
});

targets.forEach(target => {
    target.addEventListener('dblclick', (e) => {
        target.classList.toggle('selected');
        setTimeout(() => {
            if (!target.classList.contains('selected')) return;
            target.classList.remove('selected');
        }, 100);
    });
});



function handleKeyDown(event) {
    if (event.key === "Escape") {
        target.style.left = newTargetX + 'px';
        target.style.top = newTargetY + 'px';
        isDragging = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }
}

document.addEventListener("keydown", handleKeyDown);










window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    // проверяет находится ли элемент на который было нажатие внутри элемента target
    if (box) {
        // сохраняем начальные координаты
        const posX = box.style.left;
        const posY = box.style.top;

        const touchMove = (e) => {   // перемещение обьекта за пальцем
            e.preventDefault();   // предотврощает прокрутку страницы
            box.style.left = e.targetTouches[0].pageX - box.offsetWidth / 2 + "px";
            box.style.top = e.targetTouches[0].pageY - box.offsetHeight / 2 + "px";
            console.log("Move1");
        };

        box.addEventListener("touchstart", (e) => {
            e.preventDefault(); // предотврощает прокрутку страницы
        });

        box.addEventListener("touchmove", touchMove);

        box.addEventListener("touchend", (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {  // проверяет есть ли еще пальцы на экране
                box.style.left = posX;
                box.style.top = posY;
                document.removeEventListener("touchmove", touchMove);
            }
        });
    }
});


// проверка на двойное касание

const THRESHOLD = 300;
let touchStartTime = 0;
window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    if (box) {
        touchStartTime = Date.now();
        box.addEventListener("touchstart", tapHandler);
    }
});

const tapHandler = (event) => {  // проверяет прошло ли время между началом и концом касания
    const box = event.target.closest(".target");
    const posX = box.style.left;
    const posY = box.style.top;
    const touchEndTime = Date.now();
    if (touchEndTime - touchStartTime < THRESHOLD) {
        event.preventDefault();

        console.log('Double click is working!')
        const double_touch_move = (e) => {
            e.preventDefault();
            box.style.left = e.touches[0].pageX - box.offsetWidth / 2 + "px";
            box.style.top = e.touches[0].pageY - box.offsetHeight / 2 + "px";
        };

        box.addEventListener("touchend", (e) => {
            e.preventDefault();

            document.addEventListener("touchmove", double_touch_move);
            document.addEventListener("touchstart", () => {
                document.addEventListener("touchend", (e) => {
                    if (e.touches.length > 0) {
                        box.style.left = posX;
                        box.style.top = posY;
                    }
                    document.removeEventListener("touchmove", double_touch_move);
                    console.log('Double click is finished!')
                });

            });
        });
    }
};


window.addEventListener("touchstart", (e) => {  // два пальца на экране
    const box = e.target.closest(".target");
    if (box) {
        let initDistance = null;
        let initWidth = null;
        let initHeight = null;

        const scaleStart = (e) => {  // если два пальца
            if (e.touches.length === 2) {
                initWidth = box.offsetWidth;  // текущая ширина экрана
                initHeight = box.offsetHeight; // текущая высота элемента
                initDistance = getDistance(e.touches[0], e.touches[1]);  // расстояние между двумя элементами
            }
        };

        const scaleMove = (e) => {  // обрабатывает движение при изменении масштаба элемента
            if (e.touches.length === 2 && initDistance !== null) {
                const newDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = newDistance / initDistance;  // при движении двух касаний вычисляется новое расстояние между ними
                const newWidth = initWidth * scale;
                const newHeight = initHeight * scale;


                if (newWidth >= 50 && newHeight >= 50) {  // если ширина и высота меньше 50px то элемент больше не масшатибруется
                    box.style.width = newWidth + "px";
                    box.style.height = newHeight + "px";
                }
            }
        };

        const scaleEnd = (e) => {
            if (e.touches.length !== 2) {
                initDistance = null;
            }
        };

        box.addEventListener("touchstart", scaleStart);
        box.addEventListener("touchmove", scaleMove);
        box.addEventListener("touchend", scaleEnd);


    }
});

const getDistance = (touch1, touch2) => {
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
};