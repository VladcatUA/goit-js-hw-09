import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
event.preventDefault();
let firstDelay = Number(document.querySelector('.first-delay').value);
let delayStep = Number(document.querySelector('.delay-step').value); 
let qAmount = Number(document.querySelector('.amount').value);

for (let i = 1; i <= qAmount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
              resolve({ position, delay });
         } else {
              reject({ position, delay });
            }
          }, delay);
        });
}