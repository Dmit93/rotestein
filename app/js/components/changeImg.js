const listItems = document.querySelectorAll('.list-number-variants li');
const dynamicImage = document.getElementById('dynamicImage');


function changeImage(e) {
    e.preventDefault();
    const imgSrc = e.target.getAttribute('data-img-src');
    if (imgSrc) {

        dynamicImage.src = imgSrc;

        dynamicImage.classList.add('fade-in');

        setTimeout(function () {
            dynamicImage.classList.remove('fade-in');
        }, 400);
    }
}

listItems.forEach(function (item) {
    item.addEventListener('mouseenter', (e) => changeImage(e));
});