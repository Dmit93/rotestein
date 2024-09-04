import Swiper from 'swiper/bundle';
import './js/components/modal';
import './js/components/changeImg';
import './js/components/changeText';
import './js/components/mobileMenu';
import './js/components/accordion';
import './js/components/tabs';
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