document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length !== 0) {
        tabs[0].classList.add('active');
        tabContents[0].classList.add('active');
        tabContents[0].style.opacity = 1;

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.opacity = 0;
                });

                this.classList.add('active');
                const targetContent = document.querySelector(`.tab-content[data-tab="${targetTab}"]`);
                targetContent.classList.add('active');
                setTimeout(() => {
                    targetContent.style.opacity = 1;
                }, 10);
            });
        });
    }
});