const MODAL_ACTIVE_CLASS_NAME = 'modal-active';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#form');

const openFormModalBtn = document.querySelector('#open-form-modal-btn');
const launchBtn = document.querySelector('#launch-btn');
const closeBtns = document.querySelectorAll('.close-btn');

openFormModalBtn.addEventListener('click', () => {
    formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
})

const closeFormModal = () => {
    formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
};

const closeSuccessModal = () => {
    successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
};

const openSuccessModal = () => {
    successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
};

closeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        closeFormModal();
        closeSuccessModal();
    })
})

function clearFormFields() {
    const modalFiends = formModal.querySelectorAll('input');

    modalFiends.forEach( field => { 
        field.value = ''
    });
}

function showGooseAnim() {
    const targetContainer = document.querySelector('.modal-form');
    const gusImage = document.createElement('img');
    gusImage.setAttribute('src', './img/gus-anim.gif');
    gusImage.classList.add('gus-anim');

    targetContainer.appendChild(gusImage);

    setTimeout(2000, () => {
        targetContainer.removeChild(gusImage);
    })
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        showGooseAnim();

        setTimeout(() => {
            closeFormModal();
            setTimeout(openSuccessModal, 700);
            setTimeout(closeSuccessModal, 4000);
            clearFormFields();
        }, 4000);
      })
        .catch((error) => console.log('Sending form failed'));
    
})

import


