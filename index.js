"use strict";

let interval;

function insertSpans() {
    let container = document.getElementById('container');
    let button = document.getElementById('repeatButton');
    container.innerHTML = '';
    button.style.display = 'none';

    let i = 20;
    interval = setInterval(() => {
        if (i > 30) {
            clearInterval(interval);
            button.style.display = 'inline';
        } else {
            let span = document.createElement('div');
            span.className = 'grid-item';
            span.textContent = i;
            span.addEventListener('click', (function(value) {
                return function() {
                    alert(`Ви натиснули на ${value}`);
                }
            })(i));
            container.appendChild(span);
            i += 0.5;
        }
    }, 300);
}

function removeSpans(callback) {
    let container = document.getElementById('container');
    let items = Array.from(container.getElementsByClassName('grid-item'));
    let index = items.length - 1;

    function removeNext() {
        if (index >= 0) {
            items[index].classList.add('fade-out');
            setTimeout(() => {
                container.removeChild(items[index]);
                index--;
                removeNext();
            }, 100);
        } else {
            callback();
        }
    }

    removeNext();
}

document.getElementById('repeatButton').addEventListener('click', () => {
    clearInterval(interval);
    removeSpans(insertSpans);
});

insertSpans();
