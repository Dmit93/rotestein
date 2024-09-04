const accordions = document.querySelectorAll('.accordion-top');

if (accordions.length !== 0) {

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isActive = content.style.height;

            // Закрываем все аккордеоны
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.style.height = null;
                item.classList.remove('_active');
                item.classList.remove('_active');
                item.previousElementSibling.classList.remove('_active');
            });

            // Если текущий аккордеон был закрыт, открываем его
            if (!isActive) {
                content.style.height = content.scrollHeight + 'px';
                content.classList.add('_active');
                accordion.classList.add('_active');
            }
        });
    });
}