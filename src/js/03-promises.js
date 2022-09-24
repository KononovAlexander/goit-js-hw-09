import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  form: document.querySelector('form'),
  btnStart: document.querySelector('button')
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
    },delay);
  }); 
}

function getInputValue(currentTarget) {
  // let userDelay = Number(currentTarget.delay.value);
  // let userStep = Number(currentTarget.step.value);
  // let userAmount = Number(currentTarget.amount.value);
  return {  userDelay:Number(currentTarget.delay.value),
            userStep:Number(currentTarget.step.value),
            userAmount: Number(currentTarget.amount.value)
  }; 
  // console.log('{ userDelay, userStep, userAmount }: ', { userDelay, userStep, userAmount });
  // console.log('currentTarget.elements: ', currentTarget.elements);
}

  refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    // const inputs =  { userDelay: Number(event.currentTarget.delay.value),
    //                   userStep: Number(event.currentTarget.step.value),
    //                   userAmount: Number(event.currentTarget.amount.value)
    //                 } 
    let {userDelay, userStep, userAmount } = getInputValue(event.currentTarget);
    // console.log('getInputValue', getInputValue(event.currentTarget));
    console.log('userAmount: ', userAmount);
    
    for (let position = 1; position <= userAmount; position += 1) {
      createPromise(position, userDelay).then(({ position, delay }) => {
        Notiflix.Notify.success(`Fullfilled promise  ${position} in ${delay}ms`, 'Succsess');
      })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, 'Fail');
        });
      userDelay += userStep;
    }
  });
