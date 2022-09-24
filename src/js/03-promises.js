import Notiflix from 'notiflix';

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
  return {  userDelay:Number(currentTarget.delay.value),
            userStep:Number(currentTarget.step.value),
            userAmount: Number(currentTarget.amount.value)
  }; 
}

  refs.form.addEventListener('submit', (event) => {
    event.preventDefault();

    let {userDelay, userStep, userAmount } = getInputValue(event.currentTarget);
    
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
