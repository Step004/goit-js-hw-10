import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputTime = document.querySelector('[name="delay"]');
const states = document.querySelectorAll('[type="radio"]');
const button = document.querySelector('button');
const form = document.querySelector('.form');

button.addEventListener('click', showMessage);

function showMessage(event) {
  event.preventDefault();
  const time = inputTime.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value && time) {
        if (value === 'fulfilled') {
          resolve(`✅ Fulfilled promise in ${time}ms`);
        } else {
          reject(`❌ Rejected promise in ${time}ms`);
        }
      } else {
        iziToast.warning({
          title: 'Caution',
          message: 'You forgot important data',
        });
        }
    }, time);
  });
  let value;
  states.forEach(button => {
    if (button.checked) {
      value = button.value;
    }
  });

  promise
    .then(value => {
      iziToast.success({
        title: '',
        message: value,
        position: 'topRight',
        icon: '',
      });
    })
    .catch(value => {
      iziToast.error({
        title: '',
        message: value,
        position: 'topRight',
        icon: '',
      });
    })
    .finally(() => {
      form.reset();
      iziToast.info({
        title: 'Hello',
        message: 'Welcome!',
      });
    });
}
