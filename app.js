//Image Slider

const slider = document.querySelector('.slider');
const links = document.querySelectorAll('.sliderNav a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
});

//Image Slider