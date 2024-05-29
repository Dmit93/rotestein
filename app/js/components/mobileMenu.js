// function updateWrapperHeight(wrapper) {
//     // Сначала устанавливаем высоту в 'auto' и получаем полную высоту содержимого

//     wrapper.style.height = 'auto';
//     const scrollHeight = wrapper.scrollHeight;
//     // wrapper.style.height = '0';

//     // wrapper.style.height = 'auto';
//     // wrapper.style.height = scrollHeight + 'px';
//     const fullHeight = scrollHeight + 'px';


//     // Вызываем перерисовку, чтобы CSS успел применить текущее значение высоты
//     // wrapper.offsetHeight;


//     wrapper.style.height = fullHeight;
// }


function updateWrapperHeight(wrapper) {
    // Сначала устанавливаем высоту в 'auto' и получаем полную высоту содержимого
    wrapper.style.height = 'auto';
    const initialHeight = wrapper.scrollHeight;
    // wrapper.style.height = '0';
    //  wrapper.style.height = initialHeight;
    // Вызываем анимацию закрытия
    const animationEndHandler = function () {
        wrapper.removeEventListener('transitionend', animationEndHandler);
        wrapper.style.height = initialHeight;
    };
    wrapper.addEventListener('transitionend', animationEndHandler);
}



// Функция для плавного закрытия элемента
function slideUp(element, callback) {
    element.style.height = '0';
    element.classList.remove('active');
    element.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'height') {
            element.removeEventListener('transitionend', handler);
            if (callback) callback();
        }
    });
}

// Функция для плавного открытия элемента
function slideDown(element, callback) {
    const paddingHeght = 2; // Дополнительный отсуп
    // Предварительно сбрасываем высоту, чтобы получить актуальный scrollHeight
    element.style.height = '';
    let scrollHeight = element.scrollHeight;
    element.style.height = '0';

    // Выполняем анимацию открытия
    requestAnimationFrame(function () {
        element.style.height = 'auto';//`${scrollHeight + paddingHeght}px`;
        element.classList.add('active');
        element.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'height') {
                element.removeEventListener('transitionend', handler);
                if (callback) callback();
            }
        });
    });
}

// Функция для закрытия всех внутренних подменю внутри конкретного .sub-menu--wrapper
function closeAllInnerSubMenus(subMenuWrapper, callback) {
    const activeSubMenus = subMenuWrapper.querySelectorAll('.sub-menu.active');
    if (activeSubMenus.length === 0) {
        callback(); // Если нет активных подменю, вызываем callback сразу
    } else {
        // Если есть активные подменю, закрываем их
        Array.from(activeSubMenus).forEach(function (subMenu) {
            slideUp(subMenu, function () {
                if (--activeSubMenus.length === 0) {
                    callback(); // Вызываем callback после закрытия всех подменю
                }
            });
        });
    }
}

// Функция для закрытия всех подменю
function closeAllSubMenus() {
    document.querySelectorAll('.sub-menu--wrapper.active, .sub-menu.active').forEach(slideUp);
}


// Получаем все заголовки главного меню
const menuTitles = document.querySelectorAll('.navigation__menu--title');

// Обработчик клика для заголовков главного меню
menuTitles.forEach(function (menuTitle) {
    menuTitle.addEventListener('click', function (event) {
        // Ищем .sub-menu--wrapper в текущем пункте меню
        const subMenuWrapper = menuTitle.parentNode.querySelector('.sub-menu--wrapper');
        if (subMenuWrapper) {
            // Если кликнули по заголовку, а не по ссылке
            if (event.target === menuTitle || event.target.parentNode === menuTitle) {
                event.preventDefault(); // Отменяем стандартное действие
                // Если подменю уже открыто, закрываем его
                if (subMenuWrapper.classList.contains('active')) {
                    slideUp(subMenuWrapper);
                } else {
                    // Закрываем все другие подменю и открываем текущее
                    closeAllSubMenus();
                    slideDown(subMenuWrapper);
                }
            }
        }
    });
});

// Обработчик клика для заголовков внутренних подменю
document.querySelectorAll('.sub-menu__title').forEach(function (title) {
    title.addEventListener('click', function (event) {
        event.stopPropagation(); // Останавливаем всплытие
        let subMenu = title.nextElementSibling;
        let subMenuWrapper = title.closest('.sub-menu--wrapper');

        if (subMenu) {
            if (subMenu.classList.contains('active')) {
                // Закрываем подменю
                slideUp(subMenu, function () {
                    // Обновляем высоту обертки после закрытия
                    updateWrapperHeight(subMenuWrapper);
                });
            } else {
                // Закрываем все открытые подменю внутри обертки
                closeAllInnerSubMenus(subMenuWrapper, function () {
                    // Открываем выбранное подменю
                    slideDown(subMenu, function () {
                        // Обновляем высоту обертки после открытия
                        updateWrapperHeight(subMenuWrapper);
                    });
                });
            }
        }
    });
});

// Закрываем все подменю при клике вне меню
document.addEventListener('click', function (event) {
    if (!event.target.closest('.navigation__menu')) {
        let activeSubMenus = document.querySelectorAll('.sub-menu--wrapper.active');
        activeSubMenus.forEach(function (wrapper) {
            // Закрываем активные подменю
            slideUp(wrapper, function () {
                // После анимации закрытия удаляем класс 'active' и сбрасываем стиль высоты
                wrapper.style.height = '';
                let subMenus = wrapper.querySelectorAll('.sub-menu');
                subMenus.forEach(function (subMenu) {
                    subMenu.classList.remove('active');
                });
            });
        });
    }

    if (event.target.closest('.burger-menu')) {
        event.target.closest('.burger-menu').classList.toggle('open');
        document.querySelector('.navigation').classList.toggle('_active');
    }
});
