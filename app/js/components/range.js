class RangeSlider {
    constructor(container) {
        this.container = container;
        this.minRange = this.container.querySelector('.minRange');
        this.maxRange = this.container.querySelector('.maxRange');
        this.minValue = this.container.querySelector('.minValue');
        this.maxValue = this.container.querySelector('.maxValue');
        this.progress = this.container.querySelector('.progress');

        this.init();
    }

    init() {
        // Обработчики событий для ползунков
        this.minRange.addEventListener('input', () => this.handleMinInput());
        this.maxRange.addEventListener('input', () => this.handleMaxInput());

        // Обработчики событий для текстовых полей
        this.minValue.addEventListener('input', () => this.handleMinValueInput());
        this.maxValue.addEventListener('input', () => this.handleMaxValueInput());

        // Первоначальное обновление
        this.updateSlider();
    }

    handleMinInput() {
        if (parseInt(this.minRange.value) >= parseInt(this.maxRange.value)) {
            this.minRange.value = this.maxRange.value; // Блокируем переход за пределы максимального тумблера
        }
        this.updateSlider();
    }

    handleMaxInput() {
        if (parseInt(this.maxRange.value) <= parseInt(this.minRange.value)) {
            this.maxRange.value = this.minRange.value; // Блокируем переход за пределы минимального тумблера
        }
        this.updateSlider();
    }

    handleMinValueInput() {
        const value = parseInt(this.minValue.value);

        // Если поле пустое
        if (this.minValue.value === '') {
            this.minRange.value = 0; // Или другое значение по умолчанию
            return this.updateSlider();
        }

        // Если введено корректное значение
        if (!isNaN(value) && value <= this.maxRange.max) {
            this.minRange.value = value;
            this.updateSlider();
        } else {
            this.minValue.value = this.minRange.value; // Восстанавливаем старое значение
        }
    }

    handleMaxValueInput() {
        const value = parseInt(this.maxValue.value);

        // Если поле пустое
        if (this.maxValue.value === '') {
            this.maxRange.value = this.maxRange.max; // Или другое значение по умолчанию
            return this.updateSlider();
        }

        // Если введено корректное значение
        if (!isNaN(value) && value >= this.minRange.value) {
            this.maxRange.value = value;
            this.updateSlider();
        } else {
            this.maxValue.value = this.maxRange.value; // Восстанавливаем старое значение
        }
    }

    updateSlider() {
        let min = parseInt(this.minRange.value);
        let max = parseInt(this.maxRange.value);

        // Проверяем, не зашёл ли один ползунок за пределы другого
        if (min > max) {
            min = max;
            this.minRange.value = min;
        }

        // Обновляем текстовые поля
        this.minValue.value = min;
        this.maxValue.value = max;

        const minPercent = (min / this.maxRange.max) * 100;
        const maxPercent = (max / this.maxRange.max) * 100;

        this.progress.style.left = `${minPercent}%`;
        this.progress.style.width = `${maxPercent - minPercent}%`;
    }
}

// Используем класс для каждого контейнера слайдера на странице
document.querySelectorAll('.range-container').forEach(container => {
    new RangeSlider(container);
});

export { RangeSlider };
