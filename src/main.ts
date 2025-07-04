import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

('use strict');

// Utility function to add event listeners
const addEventOnElem = (
  elem: HTMLElement | NodeListOf<HTMLElement>,
  type: string,
  callback: EventListenerOrEventListenerObject
): void => {
  if (elem instanceof NodeList) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// Navbar toggle
const navbar: HTMLElement | null = document.querySelector('[data-navbar]');
const navTogglers: NodeListOf<HTMLElement> =
  document.querySelectorAll('[data-nav-toggler]');
const navLinks: NodeListOf<HTMLElement> =
  document.querySelectorAll('[data-nav-link]');

const toggleNavbar = (): void => {
  if (navbar) {
    navbar.classList.toggle('active');
    document.body.classList.toggle('nav-active');
  }
};

addEventOnElem(navTogglers, 'click', toggleNavbar);

const closeNavbar = (): void => {
  if (navbar) {
    navbar.classList.remove('active');
    document.body.classList.remove('nav-active');
  }
};

addEventOnElem(navLinks, 'click', closeNavbar);

// Header & back top button active
const header: HTMLElement | null = document.querySelector('[data-header]');
const backTopBtn: HTMLElement | null = document.querySelector(
  '[data-back-top-btn]'
);

window.addEventListener('scroll', (): void => {
  if (header && backTopBtn) {
    if (window.scrollY >= 100) {
      header.classList.add('active');
      backTopBtn.classList.add('active');
    } else {
      header.classList.remove('active');
      backTopBtn.classList.remove('active');
    }
  }
});

// Calorie Calculator
interface CalorieFormInputs {
  gender: string;
  age: number;
  height: number;
  weight: number;
  walking: number;
  cardio: number;
}

const updateCalorieCalculator = (): void => {
  const genderInput: HTMLInputElement | null = document.querySelector(
    'input[name="gender"]:checked'
  );
  const ageInput: HTMLInputElement | null = document.getElementById(
    'calc-age'
  ) as HTMLInputElement;
  const heightInput: HTMLInputElement | null = document.getElementById(
    'calc-height'
  ) as HTMLInputElement;
  const weightInput: HTMLInputElement | null = document.getElementById(
    'calc-weight'
  ) as HTMLInputElement;
  const walkingInput: HTMLInputElement | null = document.getElementById(
    'calc-walking'
  ) as HTMLInputElement;
  const cardioInput: HTMLInputElement | null = document.getElementById(
    'calc-cardio'
  ) as HTMLInputElement;

  if (
    !genderInput ||
    !ageInput ||
    !heightInput ||
    !weightInput ||
    !walkingInput ||
    !cardioInput
  )
    return;

  const inputs: CalorieFormInputs = {
    gender: genderInput.value,
    age: parseInt(ageInput.value, 10),
    height: parseInt(heightInput.value, 10),
    weight: parseInt(weightInput.value, 10),
    walking: parseInt(walkingInput.value, 10),
    cardio: parseInt(cardioInput.value, 10),
  };

  // Update label values
  const ageValue: HTMLElement | null =
    document.getElementById('calc-age_value');
  const heightValue: HTMLElement | null =
    document.getElementById('calc-height_value');
  const weightValue: HTMLElement | null =
    document.getElementById('calc-weight_value');
  const walkingValue: HTMLElement | null =
    document.getElementById('calc-walking_value');
  const cardioValue: HTMLElement | null =
    document.getElementById('calc-cardio_value');

  if (ageValue) ageValue.textContent = `${inputs.age} years`;
  if (heightValue) heightValue.textContent = `${inputs.height} cm`;
  if (weightValue) weightValue.textContent = `${inputs.weight} kg`;
  if (walkingValue) walkingValue.textContent = `${inputs.walking} hours/week`;
  if (cardioValue) cardioValue.textContent = `${inputs.cardio} hour/week`;

  // Mifflin-St Jeor equation for BMR
  let bmr: number =
    10 * inputs.weight +
    6.25 * inputs.height -
    5 * inputs.age +
    (inputs.gender === 'male' ? 5 : -161);

  // Adjust BMR for activity (base activity factor of 1.2 for sedentary)
  bmr = bmr * 1.2;

  // Add calories from walking (0.03 kcal/kg/min) and cardio (0.07 kcal/kg/min)
  bmr += (inputs.walking * 60 * ((0.03 * inputs.weight * 1) / 0.45)) / 7;
  bmr += (inputs.cardio * 60 * ((0.07 * inputs.weight * 1) / 0.45)) / 7;
  bmr = Math.floor(bmr);

  // Calculate targets
  const targetGainWeight: number = Math.round((bmr + 300) / 100) * 100;
  const targetMaintain: number = Math.round(bmr / 100) * 100;
  const targetLoseWeight: number = Math.round((bmr - 500) / 100) * 100;

  const targetGain: HTMLElement | null =
    document.getElementById('calc-target-gain');
  const targetMaintainEl: HTMLElement | null = document.getElementById(
    'calc-target-maintain'
  );
  const targetLose: HTMLElement | null =
    document.getElementById('calc-target-lose');

  if (targetGain) targetGain.textContent = targetGainWeight.toString();
  if (targetMaintainEl)
    targetMaintainEl.textContent = targetMaintain.toString();
  if (targetLose) targetLose.textContent = targetLoseWeight.toString();
};

// Default Values
const resetForm = (): void => {
  const genderMale: HTMLInputElement | null = document.getElementById(
    'calc-gender-male'
  ) as HTMLInputElement;
  const ageInput: HTMLInputElement | null = document.getElementById(
    'calc-age'
  ) as HTMLInputElement;
  const heightInput: HTMLInputElement | null = document.getElementById(
    'calc-height'
  ) as HTMLInputElement;
  const weightInput: HTMLInputElement | null = document.getElementById(
    'calc-weight'
  ) as HTMLInputElement;
  const walkingInput: HTMLInputElement | null = document.getElementById(
    'calc Winking'
  ) as HTMLInputElement;
  const cardioInput: HTMLInputElement | null = document.getElementById(
    'calc-cardio'
  ) as HTMLInputElement;

  if (
    genderMale &&
    ageInput &&
    heightInput &&
    weightInput &&
    walkingInput &&
    cardioInput
  ) {
    genderMale.checked = true;
    ageInput.value = '25';
    heightInput.value = '180';
    weightInput.value = '80';
    walkingInput.value = '2';
    cardioInput.value = '1';
    updateCalorieCalculator();
  }
};

// Add event listeners for calorie calculator
const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  '.calorie-form input'
);
addEventOnElem(inputs, 'input', updateCalorieCalculator);
addEventOnElem(inputs, 'change', updateCalorieCalculator);

const calorieForm: HTMLFormElement | null = document.getElementById(
  'calorie-form'
) as HTMLFormElement;
if (calorieForm) {
  calorieForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    updateCalorieCalculator();
    const results: HTMLElement | null = document.getElementById('results');
    if (results) {
      results.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

const resetFormBtn: HTMLElement | null = document.getElementById('reset-form');
if (resetFormBtn) {
  resetFormBtn.addEventListener('click', resetForm);
}

// Initial calculation
updateCalorieCalculator();

// Contact page
const contactForm: HTMLFormElement | null = document.getElementById(
  'contact-form'
) as HTMLFormElement;
const formMessage: HTMLElement | null = document.getElementById('form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    formMessage.style.display = 'block';
    contactForm.reset();
    formMessage.scrollIntoView({ behavior: 'smooth' });
  });
}

// Active link functionality
document.addEventListener('DOMContentLoaded', (): void => {
  const navbarLinks: NodeListOf<HTMLElement> =
    document.querySelectorAll('.navbar-link');

  navbarLinks.forEach((link: HTMLElement) => {
    link.addEventListener('click', function (this: HTMLElement): void {
      navbarLinks.forEach((item: HTMLElement) => {
        item.classList.remove('active');
      });
      this.classList.add('active');

      const navbar: HTMLElement | null = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('active');
      }
    });
  });

  const sections: NodeListOf<HTMLElement> =
    document.querySelectorAll('section');

  window.addEventListener('scroll', (): void => {
    let current: string = '';

    sections.forEach((section: HTMLElement) => {
      const sectionTop: number = section.offsetTop;
      const sectionHeight: number = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id') || '';
      }
    });

    navbarLinks.forEach((link: HTMLElement) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
