const textBlock = document.getElementById('change-text');
const texts = ['ПОДХОДЯЩЕЕ ВАШЕМУ ХАРАКТЕРУ', 'КАК ФАМИЛЬНУЮ ЦЕННОСТЬ', 'ДЛЯ ЖИЗНИ'];
let currentIndex = 0;

function changeText() {
    textBlock.classList.add('fade-out');

    setTimeout(() => {
        textBlock.textContent = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;
        textBlock.classList.remove('fade-out');
    }, 500);
}

setInterval(changeText, 5000);