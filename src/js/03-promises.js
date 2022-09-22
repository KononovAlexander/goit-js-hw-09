import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  form: document.querySelector('form'),
  btnStart: document.querySelector('button')
}
console.log('  form: ',   refs.form);
  let userDelay = null;
  let userStep = null;
  let userAmount = null;

function getInputValue() {
  refs.form.addEventListener('input',(event) => {
    let target = event.target;
    console.log('target: ', target);

    if (target.matches('[name="delay"]')) {
      console.log('target: ', target);
      userDelay = Number(target.value);
      console.log('userDelay: ', userDelay);
    } 
    if (target.matches('[name="step"]')) {
      console.log('target: ', target);
       userStep = Number(target.value);
       console.log('userStep: ', userStep);
    }
    if (target.matches('[name="amount"]')) {
      console.log('target: ', target);
       userAmount = Number(target.value);
       console.log('userAmount: ', userAmount);
    }
   });
}
getInputValue();
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => { 

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    },delay);
  });
  

  // function getPromise(position, delay) {

  // }
  
}

refs.form.addEventListener('submit', (event) => {
  event.preventDefault();
  for (let position = 1; position <= userAmount; position += 1) {
    createPromise(position, userDelay).then(({ position, delay }) => {
      Notiflix.Notify.success(`Fullfilled promise  ${position} in ${delay}ms`,'Succsess');
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`,'Fail');
    });
    userDelay += userStep ;
  }
});
