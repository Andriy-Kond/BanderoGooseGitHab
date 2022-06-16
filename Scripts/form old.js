const MODAL_ACTIVE_CLASS_NAME = 'modal-active';

// перше модальне вікно, яке має відкритись (Поділися, будь ласка, поштою)
const formModal = document.querySelector('#form-modal');

// вікно, яке має показатись, коли користувач введе свої дані і відправить форму (Підтверджуємо вдалий запуск Гусака!)
const successModal = document.querySelector('#success-modal');

// Друга модалка?
const form = document.querySelector('#form');

// модалка, яка відкриває форму (кнопка "Запустити гусака")
const openFormModalBtn = document.querySelector('#open-form-modal-btn');

// Кнопка запустити гуя на першій модалці
const launchBtn = document.querySelector('#launch-btn');

// Кнопка закриття і "Героям Слава!"
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


form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        closeFormModal();
        setTimeout(openSuccessModal, 700);
        setTimeout(closeSuccessModal, 3000);
      })
      .catch((error) => console.log('Sending form failed'));
})

