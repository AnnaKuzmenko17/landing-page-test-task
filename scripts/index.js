// Menu Toggle Functionality

(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.openMenuBtn.addEventListener('click', handleMenuToggle);
  refs.closeMenuBtn.addEventListener('click', handleMenuToggle);

  function handleMenuToggle() {
    refs.menu.classList.toggle('is-hidden');
  }
})();

// Modal Toggle Functionality

(() => {
  const refs = {
    openModalHeader: document.querySelector('[data-modal-open-hd]'),
    openModalBtnHero: document.querySelector('[data-modal-open-hero]'),
    openModalBtnFooter: document.querySelector('[data-modal-open-ftr]'),
    openModalBtnMobileMenu: document.querySelector('[data-modal-open-mobile]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalHeader.addEventListener('click', handleModalToggle);
  refs.openModalBtnHero.addEventListener('click', handleModalToggle);
  refs.openModalBtnFooter.addEventListener('click', handleModalToggle);
  refs.openModalBtnMobileMenu.addEventListener('click', handleModalToggle);
  refs.closeModalBtn.addEventListener('click', handleModalToggle);

  function handleModalToggle() {
    refs.modal.classList.toggle('is-hidden');
  }
})();

// Phone Input Initialization

const input = document.querySelector('#phone');

const phoneInput = window.intlTelInput(input, {
  preventInvalidNumbers: true,
  separateDialCode: true,
  excludeCountries: ['ru', 'by'],
  preferredCountries: ['ua', 'pl', 'gb', 'us'],
});

// Swiper Initialization

const swiper = new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 17,
  freeMode: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },
});

// Form Submission Handling

const form = document.getElementById('form');
const errorMessage = document.querySelector('.alert-error');
const modal = document.querySelector('[data-modal]');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  let errorCount = validateForm(form);

  if (errorCount === 0) {
    errorMessage.innerHTML = '';
    alert('Success! We will call you.');
    form.reset();
  } else {
    errorMessage.style.display = '';
    errorMessage.innerHTML = `Please fill in all the fields.`;
  }
}

// Form Validation Functions

function validateForm(form) {
  let errorCount = 0;
  let requiredFields = document.querySelectorAll('.req');

  requiredFields.forEach((input) => {
    clearFormError(input);

    if (input.classList.contains('tel')) {
      if (!isValidPhoneNumber(input)) {
        addFormError(input);
        errorCount++;
      }
    } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
      addFormError(input);
      errorCount++;
    } else {
      if (input.value === '') {
        addFormError(input);
        errorCount++;
      }
    }
  });

  return errorCount;
}

function addFormError(input) {
  input.parentElement.classList.add('error');
  input.classList.add('error');
}

function clearFormError(input) {
  input.parentElement.classList.remove('error');
  input.classList.remove('error');
}

function isValidPhoneNumber(input) {
  const phoneNumberPattern = /^\+?[\d\s\-()]{7,15}$/;
  return phoneNumberPattern.test(input.value.trim());
}
