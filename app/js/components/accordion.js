class Accordion {
    constructor(accordionTopSelector) {
        this.accordions = document.querySelectorAll(accordionTopSelector);
        this.init();
    }

    init() {
        if (this.accordions.length !== 0) {
            this.accordions.forEach(accordion => {
                accordion.addEventListener('click', () => this.toggleAccordion(accordion));
            });
        }
    }

    toggleAccordion(accordion) {
        const content = accordion.nextElementSibling;
        const isActive = content.style.height;

        // Закрываем все аккордеоны
        this.closeAllAccordions();


        if (!isActive) {
            content.style.height = content.scrollHeight + 'px';
            content.classList.add('_active');
            accordion.classList.add('_active');

            this.dispatchEvent(accordion, 'accordionChange', true);
        } else {
            this.dispatchEvent(accordion, 'accordionChange', false);
        }
    }

    closeAllAccordions() {
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.style.height = null;
            item.classList.remove('_active');
            item.previousElementSibling.classList.remove('_active');
        });
    }



    dispatchEvent(accordionElem, eventName, isOpen) {
        const event = new CustomEvent(eventName, {
            detail: { element: accordionElem, isOpen: isOpen },
        });
        accordionElem.dispatchEvent(event);
    }

}

const myAccordion = new Accordion('.accordion-top');

if (document.querySelector('[data-switch-img]')) {

    myAccordion.accordions.forEach(accordion => {
        accordion.addEventListener('accordionChange', (e) => {
            const dataImg = e.detail.element.getAttribute('data-switch-img');

            // Если аккордеон открыт, то переключаем изображение
            if (e.detail.isOpen && dataImg) {
                if (e.detail.element.closest('[data-scroll-img]')) {
                    setTimeout(() => {
                        const sectionRect = e.detail.element.closest('.section-expertiza__content').getBoundingClientRect();
                        const elemRect = e.detail.element.getBoundingClientRect();
                        const position = elemRect.top - sectionRect.top;
                        e.detail.element.closest('.section-expertiza__content').querySelector('.section-expertiza__right img').src = dataImg;
                        e.detail.element.closest('.section-expertiza__content').querySelector('.section-expertiza__right img').style.transform = `translateY(${position}px`;
                    }, 300)
                }
                e.detail.element.closest('.section-expertiza__content').querySelector('.section-expertiza__right img').src = dataImg;
            }

            // Если аккордеон закрыт, то возвращаем изображение
            if (!e.detail.isOpen && dataImg && e.detail.element.closest('[data-scroll-img]')) {
                e.detail.element.closest('.section-expertiza__content').querySelector('.section-expertiza__right img').style.transform = null;
            }
        });

    });

}