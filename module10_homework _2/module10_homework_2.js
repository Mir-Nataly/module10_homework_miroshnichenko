/* Задание 2 Модуль 10 */


/* Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.  */


const button = document.querySelector('.btn');
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

button.addEventListener('click', () => {

    alert(`Размер экырана: ${screenWidth}px x ${screenHeight}px.`);
    
    });
    