let dragged;

function allowDrop(event) {
    event.preventDefault();
    if (event.target.classList.contains('list__item')) {
        const rect = event.target.getBoundingClientRect();
        const isBefore = event.clientY < rect.top + rect.height / 2;
        const spaceHeight = 20;

        if (isBefore) {
            event.target.style.marginTop = spaceHeight + 'px';
            event.target.style.marginBottom = '0';
        } else {
            event.target.style.marginTop = '0';
            event.target.style.marginBottom = spaceHeight + 'px';
        }
    }
}

function drag(event) {
    dragged = event.target;
    event.dataTransfer.setData("text", event.target.innerHTML);
    event.target.style.cursor = 'grabbing';
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var newCard = document.createElement('div');
    newCard.classList.add('list__item');
    newCard.setAttribute('draggable', 'true');
    newCard.addEventListener('dragstart', drag);
    newCard.innerHTML = data;

    if (dragged !== newCard) {
        if (event.target.classList.contains('list__item')) {
            const rect = event.target.getBoundingClientRect();
            const isBefore = event.clientY < rect.top + rect.height / 2;
            if (isBefore) {
                event.target.insertAdjacentElement('beforebegin', newCard);
            } else {
                event.target.insertAdjacentElement('afterend', newCard);
            }
        } else {
            const list = event.target.closest('.list');
            if (list) {
                const cardHeight = dragged.offsetHeight;
                const cardsBelow = Array.from(list.children).filter(card => card.offsetTop > dragged.offsetTop);
                const insertIndex = cardsBelow.length > 0 ? list.children.length - cardsBelow.length : list.children.length;
                list.insertBefore(newCard, list.children[insertIndex]);
                list.style.height = list.offsetHeight + cardHeight + 'px';
            }
        }
        
        dragged.remove();
    }
    
    event.target.style.cursor = 'grab';
    event.target.style.marginTop = '0';
    event.target.style.marginBottom = '0';
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-card')) {
        event.target.parentElement.remove();
    }

    if (event.target.classList.contains('show-form')) {
        const form = event.target.previousElementSibling;
        form.style.display = 'flex';
        event.target.style.display = 'none';
    }

    if (event.target.classList.contains('add-card')) {
        const input = event.target.parentElement.querySelector('input');
        const cardText = input.value;
        const list = event.target.parentElement.previousElementSibling;
        const newCard = document.createElement('div');
        newCard.classList.add('list__item');
        newCard.innerHTML = cardText + ' <span class="delete-card">X</span>';
        list.append(newCard);
        input.value = '';
        event.target.parentElement.style.display = 'none';
        event.target.parentElement.nextElementSibling.style.display = 'block';
        newCard.setAttribute('draggable', 'true');
        newCard.addEventListener('dragstart', drag);
    }
});

window.drag = drag;
window.allowDrop = allowDrop;
window.drop = drop;
