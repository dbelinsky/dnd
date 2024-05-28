let dragged;

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-card')) {
    event.target.parentElement.remove();
  }
});

const showFormButtons = document.querySelectorAll('.show-form');
showFormButtons.forEach(button => {
  button.addEventListener('click', function() {
    const form = this.previousElementSibling;
    form.style.display = 'flex';
    this.style.display = 'none';
  });
});

const addCardButtons = document.querySelectorAll('.add-card');
addCardButtons.forEach(button => {
  button.addEventListener('click', function() {
    const input = this.parentElement.querySelector('input');
    const cardText = input.value;
    const list = this.parentElement.previousElementSibling;
    const newCard = document.createElement('div');
    newCard.classList.add('list__item');
    newCard.innerHTML = cardText + ' <span class="delete-card">&#xE951;</span>';
    list.appendChild(newCard);
    input.value = '';
    this.parentElement.style.display = 'none';
    this.parentElement.nextElementSibling.style.display = 'block';
    newCard.setAttribute('draggable', 'true');
    newCard.setAttribute('ondragstart', 'drag(event)');
  });
});

function allowDrop(event) {
  event.preventDefault();
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
  newCard.setAttribute('ondragstart', 'drag(event)');
  newCard.innerHTML = data;
    
  if (dragged !== newCard) {
    if (event.target.classList.contains('list__item')) {
    const rect = event.target.getBoundingClientRect();
    if (event.clientY < rect.top + rect.height / 2) {
        event.target.insertAdjacentElement('beforebegin', newCard);
    } else {
        event.target.insertAdjacentElement('afterend', newCard);
    }
    } else {
        event.currentTarget.querySelector('.list').appendChild(newCard);
    }  
    dragged.remove();
  }
  event.target.style.cursor = 'grab';
}
