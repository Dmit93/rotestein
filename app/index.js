import Swiper from 'swiper/bundle';
import { openModal } from './js/components/modal';
import './js/components/changeImg';
import './js/components/changeText';
import './js/components/mobileMenu';
import './js/components/accordion';
import './js/components/tabs';
import { RangeSlider } from './js/components/range';
import 'swiper/css/bundle';
import './scss/index.scss';

const importAll = (r) => r.keys().forEach(r);
importAll(require.context('./scss/imports/', true, /.scss$/));
importAll(require.context('../app/img/', true, /.(jpg|svg|png)$/));


class InitsSwiperMobile {
    #swiperInstance;
    defaultSettings = (parent) => {
        return {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: `${parent} .swiper-button-next`,
                prevEl: `${parent} .swiper-button-prev`,
            },
        }
    }
    mediaQuery = window.matchMedia('(max-width: 992px)');
    constructor(parent, settings = {}) {
        this.element = parent;
        this.settings = Object.keys(settings).length !== 0 ? settings : this.defaultSettings(parent);
        if (!document.querySelector(this.element)) {
            return false;
        }
        if (this.mediaQuery.matches) {
            this.#swiperInstance = this.initSwiper(parent);
        }
        window.addEventListener('resize', () => {
            this.resize();
        })
    }

    initSwiper() {
        return new Swiper(`${this.element} .swiper`, this.settings);
    }

    resize() {
        if (this.mediaQuery.matches && !this.#swiperInstance) {
            this.#swiperInstance = this.initSwiper();
        } else if (!this.mediaQuery.matches && this.#swiperInstance) {
            this.destroy();
        }
    }


    destroy() {
        this.#swiperInstance.destroy(true, true);
        this.#swiperInstance = null;
    }

}

new InitsSwiperMobile('.section-info');
new InitsSwiperMobile('.section-projects-similar__content');

// if (document.querySelector('.section-info .swiper')) {
//     function initSwiper(target) {
//         return new Swiper('.section-info .swiper', {
//             loop: true,
//             slidesPerView: 1,
//             navigation: {
//                 nextEl: '.section-info .swiper-button-next',
//                 prevEl: '.section-info .swiper-button-prev',
//             },
//         });
//     }

//     let swiperInstance;
//     const mediaQuery = window.matchMedia('(max-width: 992px)');

//     if (mediaQuery.matches) {
//         swiperInstance = initSwiper();
//     }

//     // Опционально: переинициализация при изменении размера окна
//     window.addEventListener('resize', () => {
//         if (mediaQuery.matches && !swiperInstance) {
//             swiperInstance = initSwiper();
//         } else if (!mediaQuery.matches && swiperInstance) {
//             swiperInstance.destroy(true, true);
//             swiperInstance = null;
//         }
//     });
// }


new Swiper('.section-works .swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: '.section-works .swiper-button-next',
        prevEl: '.section-works .swiper-button-prev',
    },
    breakpoints: {
        992: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
});

new Swiper('.otzivy .swiper', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 35,
    navigation: {
        nextEl: '.otzivy .swiper-button-next',
        prevEl: '.otzivy .swiper-button-prev',
    },
    breakpoints: {
        767: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
});


new Swiper('.otzivy-third .swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: '.otzivy-third .swiper-button-next',
        prevEl: '.otzivy-third .swiper-button-prev',
    },
    breakpoints: {
        767: {
            slidesPerView: 3,
        },
        0: {
            slidesPerView: 1,
        },
    },
});

new Swiper('.project-inter__swiper .swiper', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
        nextEl: '.project-inter__swiper .swiper-button-next',
        prevEl: '.project-inter__swiper .swiper-button-prev',
    },
    breakpoints: {
        767: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
});

new Swiper('.slider-first .swiper', {
    loop: true,
    slidesPerView: 1,
    navigation: {
        nextEl: '.slider-first .swiper-button-next',
        prevEl: '.slider-first .swiper-button-prev',
    },
    pagination: {
        el: '.slider-first .swiper-pagination',
        clickable: true,
        type: 'bullets'
    },
});

const s = new Swiper('.otzyvi-enginering__slider .swiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
        nextEl: '.otzyvi-enginering__slider .swiper-button-next',
        prevEl: '.otzyvi-enginering__slider .swiper-button-prev',
    },
    breakpoints: {
        992: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
    autoHeight: true,
});

// Функция для установки высоты слайдов
// function setSlidesHeight() {
//     const swiper = document.querySelector('.otzyvi-enginering__slider .swiper');
//     const activeSlide = swiper.querySelector('.swiper-slide-active');
//     const nextSlide = swiper.querySelector('.swiper-slide-next');

//     // Проверяем, есть ли следующий слайд
//     if (nextSlide && window.matchMedia("(min-width: 992px)").matches) {
//         let maxHeight = Math.max(activeSlide.offsetHeight, nextSlide.offsetHeight);

//         activeSlide.style.height = maxHeight + 'px';
//         nextSlide.style.height = maxHeight + 'px';
//     }
// }

// // Вызываем функцию при инициализации слайдера
// setSlidesHeight();

// // Вызываем функцию при смене слайда
// s.on('transitionEnd', setSlidesHeight);




const containerScrollPicture = document.querySelector('.list-animation-photo__container');
if (containerScrollPicture) {
    const scrollImages = containerScrollPicture.innerHTML;
    containerScrollPicture.innerHTML += scrollImages;
}

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-mobile-filter') || event.target.closest('.btn-mobile-filter')) {
        const modal = document.querySelector(`[data-modal="#filter-mobile"]`);
        if (!modal.querySelector('.filter')) {
            const htmlFilterClone = document.querySelector('.filter').cloneNode(true);
            modal.querySelector('.modal-content__body').innerHTML = '';
            modal.querySelector('.modal-content__body').appendChild(htmlFilterClone);
            new RangeSlider(modal.querySelector('.range-container'));
        }
        openModal(modal);
    }

    if (event.target.closest('.filter-col') || event.target.classList.contains('filter-col')) {
        event.target.closest('.filter-col').querySelector('.filter-col__fields').classList.toggle('_active');
    }
});



// engineering

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-select-tags') || event.target.closest('.btn-select-tags')) {
        if (!document.querySelector('.exp-stati__line').classList.contains('_active')) {
            document.querySelector('.exp-stati__line').classList.add('_active');
            document.querySelector('.btn-select-tags span').innerText = 'Закрыть';
        } else {
            document.querySelector('.exp-stati__line').classList.remove('_active');
            document.querySelector('.btn-select-tags span').innerText = 'Выбрать';
        }
    }
});


// if (document.querySelector('.etap-s__element') && window.matchMedia('(max-width: 992px)').matches) {
//     document.querySelectorAll('.etap-s__element').forEach(el => {
//         el.addEventListener('click', function (e) {
//             const heightP = el.querySelector('p').scrollHeight;
//             el.querySelector('p').classList.toggle('_active');
//             if (el.querySelector('p').classList.contains('_active')) {
//                 el.classList.add('_active');
//                 el.querySelector('p').style.height = `${heightP}px`;
//             } else {
//                 el.classList.remove('_active');
//                 el.querySelector('p').style.height = 0;
//             }
//         });
//     });
// }