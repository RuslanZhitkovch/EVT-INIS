



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

                    stickyElement.style.left = targetX+'px';
                    stickyElement.style.top = targetY +'px';

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










window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    if (box) {
        const posX = box.style.left;
        const posY = box.style.top;

        const touchMove = (e) => {
            e.preventDefault();
            box.style.left = e.targetTouches[0].pageX - box.offsetWidth / 2 + "px";
            box.style.top = e.targetTouches[0].pageY - box.offsetHeight / 2 + "px";
            console.log("Move1");
        };

        box.addEventListener("touchstart", (e) => {
            e.preventDefault();
        });

        box.addEventListener("touchmove", touchMove);

        box.addEventListener("touchend", (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                box.style.left = posX;
                box.style.top = posY;
                document.removeEventListener("touchmove", touchMove);
            }
            console.log("End1");
        });
    }
});

// "Finger-follow" mode
const THRESHOLD = 300; // in milliseconds
let touchStartTime = 0;
window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    if (box) {
        touchStartTime = Date.now();
        box.addEventListener("touchstart", tapHandler);
    }
});

const tapHandler = (event) => {
    const box = event.target.closest(".target");
    const posX = box.style.left;
    const posY = box.style.top;
    const touchEndTime = Date.now();
    if (touchEndTime - touchStartTime < THRESHOLD) {
        event.preventDefault();
        console.log("tapped twice");
        box.style.backgroundColor = "yellow";
        const double_touch_move = (e) => {
            e.preventDefault();
            box.style.left = e.touches[0].pageX - box.offsetWidth / 2 + "px";
            box.style.top = e.touches[0].pageY - box.offsetHeight / 2 + "px";
            console.log("Move2");
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
                    box.style.backgroundColor = "red";
                });
                console.log("End2");
            });
        });
    }
};

// Scaling
window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    if (box) {
        let initDistance = null;
        let initWidth = null;
        let initHeight = null;

        const scaleStart = (e) => {
            if (e.touches.length === 2) {
                initWidth = box.offsetWidth;
                initHeight = box.offsetHeight;
                initDistance = getDistance(e.touches[0], e.touches[1]);
            }
        };

        const scaleMove = (e) => {
            if (e.touches.length === 2 && initDistance !== null) {
                const newDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = newDistance / initDistance;
                const newWidth = initWidth * scale;
                const newHeight = initHeight * scale;

                // Set a minimum size of 50px
                if (newWidth >= 50 && newHeight >= 50) {
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

        // Rest of the code...
    }
});

const getDistance = (touch1, touch2) => {
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
};