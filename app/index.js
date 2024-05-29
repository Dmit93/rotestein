import Swiper from 'swiper/bundle';
import './js/components/modal';
import './js/components/changeImg';
import './js/components/changeText';
import './js/components/mobileMenu';
import 'swiper/css/bundle';
import './scss/index.scss';

const importAll = (r) => r.keys().forEach(r);
importAll(require.context('./scss/imports/', true, /.scss$/));
importAll(require.context('../app/img/', true, /.(jpg|svg|png)$/));

function initSwiper() {
    return new Swiper('.section-info .swiper', {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.section-info .swiper-button-next',
            prevEl: '.section-info .swiper-button-prev',
        },
    });
}

let swiperInstance;
const mediaQuery = window.matchMedia('(max-width: 992px)');

if (mediaQuery.matches) {
    swiperInstance = initSwiper();
}

// Опционально: переинициализация при изменении размера окна
window.addEventListener('resize', () => {
    if (mediaQuery.matches && !swiperInstance) {
        swiperInstance = initSwiper();
    } else if (!mediaQuery.matches && swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }
});




