



const targets = document.querySelectorAll('.target');

// флаг, указывающий, что элемент "приклеен" к курсору
let isSticky = false;

// элемент, который "приклеен" к курсору
let stickyElement = null;





targets.forEach(target => {
    target.addEventListener('mousedown', (e) => {
        // запоминаем начальные координаты курсора и позиции элемента
        const startX = e.clientX;
        const startY = e.clientY;
        const targetX = target.offsetLeft;
        const targetY = target.offsetTop;




        // добавляем обработчик события mousemove на document
        document.addEventListener('mousemove', onMouseMove);

        // добавляем обработчик события mouseup на document
        document.addEventListener('mouseup', onMouseUp);


        document.addEventListener('keydown', function(event) {



            if (event.key === 'Escape') {
                // Обработчик для нажатия клавиши ESC
                // здесь можно добавить логику для отмены перетаскивания и возврата элемента на исходную позицию




                    // удаляем обработчики событий мыши
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                    stickyElement.style.left = startX+'px';
                    stickyElement.style.top = startY +'px';




                    // снимаем флаг, указывающий, что элемент "приклеен" к курсору
                    isSticky = false;




            }
        });


        // функция для обработки события mousemove
        function onMouseMove(e) {
            // вычисляем новые координаты элемента
            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;
            const newTargetX = targetX + diffX;
            const newTargetY = targetY + diffY;

            // перемещаем элемент
            target.style.left = newTargetX + 'px';
            target.style.top = newTargetY + 'px';
        }

        // функция для обработки события mouseup
        function onMouseUp() {
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



// обработчик события "двойной клик"
function onDoubleClick(event) {
    // если элемент уже "приклеен" к курсору, игнорируем событие
    if (isSticky) {
        return;
    }

    // запоминаем элемент, на который кликнули дважды
    stickyElement = event.target;

    // устанавливаем флаг, указывающий, что элемент "приклеен" к курсору
    isSticky = true;





    // добавляем обработчики событий мыши для перемещения элемента
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

}

// обработчик события "движение мыши"
function onMouseMove(event) {
    // если элемент "приклеен" к курсору
    if (isSticky) {
        // перемещаем элемент за курсором
        stickyElement.style.left = `${event.clientX}px`;
        stickyElement.style.top = `${event.clientY}px`;
    }
}

// обработчик события "отжатие левой кнопки мыши"
function onMouseUp(event) {
    // если элемент "приклеен" к курсору
    if (isSticky) {
        // удаляем обработчики событий мыши
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // снимаем флаг, указывающий, что элемент "приклеен" к курсору
        isSticky = false;


    }
}

// добавляем обработчик события "двойной клик" ко всем элементам с классом "target"
targets.forEach((element) => {
    element.addEventListener('dblclick', onDoubleClick);
});


document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        // Получаем текущий перемещаемый элемент
        const currentTarget = document.querySelector(".target.is-dragging");

        if (currentTarget) {
            // Отменяем перетаскивание
            currentTarget.classList.remove("is-dragging");
            document.body.classList.remove("is-dragging");

            // Возвращаем элемент на исходную позицию
            currentTarget.style.left = currentTarget.dataset.left;
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