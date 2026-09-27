const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('show-menu')
    navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)))
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu?.classList.remove('show-menu')
    navToggle?.setAttribute('aria-expanded', 'false')
  })
}

/*=== REMOVE MENU MOBILE ===*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')
const linkAction = () => {
  navMenu?.classList.remove('show-menu')
  navToggle?.setAttribute('aria-expanded', 'false')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=== GSAP ANIMATION ===*/
if (typeof gsap !== 'undefined') {
  gsap.defaults({ opacity: 0, ease: 'power4.out', duration: 1.4 })

  const isCompactViewport = window.matchMedia('(max-width: 539px)').matches
  const tl = gsap.timeline()
  tl.from('.home__box', { opacity: 0, duration: 0.2, stagger: 0.03 }, 0.3)
    .from('.home__bg', { scale: 1.05, opacity: 0 }, 0.6)
    .from('.nav > *', { y: -30, opacity: 0, stagger: 0.12 }, 2.4)
    .from('.home__img', { y:-90, opacity: 0 }, 2.4)
    .from('.home__title', { x: -20, autoAlpha: 0 }, 1.1)
     .from('.home__title-meta', { x: 20, autoAlpha: 0 }, 1.6)
    .from('.home__buttons', { y: 90, opacity: 0 }, 2.4)
    .to('.home__bg', {
      scale: isCompactViewport ? 1.07 : 1.15,
      opacity: 1,
      duration: isCompactViewport ? 8 : 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'center center'
    }, 4.2)
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true
})

sr.reveal('.services__card', {origin: 'top', delay: 600})
sr.reveal('.section__title', {origin: 'top', delay: 600})
sr.reveal('.hakkimizda__main-title', {origin: 'top', delay: 600})
sr.reveal('.hakkimizda__description', {origin: 'top', delay: 800})
sr.reveal('.hakkimizda__description br', {origin: 'top', delay: 600})
sr.reveal('.contact__form', {origin: 'top', delay: 800})


const sr2 = ScrollReveal({

    distance: '60px',
    duration: 2000,
    delay: 300,
    //reset: true, //animation repeat
})

sr2.reveal('.hakkimizda__data', {origin: 'left'})
sr2.reveal('.hakkimizda__images', {origin: 'right'})
sr2.reveal('.hakkimizda__onlylogo', {delay:1000})
}

  
/*=== SWIPER ===*/
const workSwiperElement = document.querySelector('.work__swiper')
if (workSwiperElement && typeof Swiper !== 'undefined') {
  const workSwiper = new Swiper(workSwiperElement, {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: false,
    breakpoints: {
      768: { slidesPerView: 2 },
      1150: { slidesPerView: 2.5 }
    }
  })

  const workSection = workSwiperElement.closest('.work')
  if (workSection && 'IntersectionObserver' in window) {
    const workVisibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        workSwiper.params.autoplay = {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }
        workSwiper.autoplay.start()
      } else {
        workSwiper.autoplay.stop()
      }
    }, { threshold: 0.15 })
    workVisibilityObserver.observe(workSection)
  } else {
    workSwiper.params.autoplay = {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }
    workSwiper.autoplay.start()
  }
}
/*=== Services ===*/
const servicesCards = document.querySelectorAll(".services__card")

servicesCards.forEach((card, index) => {
  const button = card.querySelector('.services__button')
  const data = card.querySelector('.services__data')
  if (!button || !data) return

  const isOpen = card.classList.contains('services-open')
  button.type = 'button'
  button.setAttribute('aria-expanded', String(isOpen))
  data.id = data.id || `service-description-${index + 1}`
  button.setAttribute('aria-controls', data.id)

  button.addEventListener('click', () => {
    const shouldOpen = !card.classList.contains('services-open')

    servicesCards.forEach(otherCard => {
      otherCard.classList.remove('services-open')
      otherCard.classList.add('services-close')
      otherCard.querySelector('.services__button')?.setAttribute('aria-expanded', 'false')
    })

    if (shouldOpen) {
      card.classList.remove('services-close')
      card.classList.add('services-open')
      button.setAttribute('aria-expanded', 'true')
    }
  })
})

const statsNumbers = document.querySelectorAll('.stats__num')
if ('IntersectionObserver' in window) {
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const element = entry.target
      const target = Number.parseInt(element.dataset.target, 10)
      if (!Number.isFinite(target)) return
      const start = performance.now()
      const tick = now => {
        const progress = Math.min((now - start) / 1500, 1)
        element.textContent = String(Math.floor(target * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      countObs.unobserve(element)
    })
  }, { threshold: .5 })
  statsNumbers.forEach(number => countObs.observe(number))
} else {
  statsNumbers.forEach(number => {
    number.textContent = String(Number.parseInt(number.dataset.target, 10) || 0)
  })
}


/*=== PARTNERS LOOP ===*/
const track = document.querySelector('.logo-slide-track')
if (track){
  [...track.children].forEach(logo => {
    const clone = logo.cloneNode(true)
    clone.setAttribute('aria-hidden','true')
    track.appendChild(clone)
  })
}


// ========== CONTACT FORM VALIDATION & EMAILJS ========== //
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: "GZKGrN92oLqyXj_Qw" })
}

const form = document.getElementById("contact__form");
const statusMessage = document.getElementById("contact-message");
const sendButton = document.querySelector(".contact__button");

function showMessage(message, type = "error") {
  if (!statusMessage) return;
  statusMessage.textContent = message;
  statusMessage.style.color = type === "error" ? "salmon" : "lightgreen";
  statusMessage.style.opacity = "1";
  setTimeout(() => {
    statusMessage.style.opacity = "0";
  }, 3500);
}

function showFieldError(field, message) {
  const errorId = `${field.name}-error`
  let errorElement = document.getElementById(errorId)
  if (!errorElement) {
    errorElement = document.createElement("small");
    errorElement.id = errorId
    errorElement.classList.add("error-text");
    errorElement.style.color = "salmon";
    errorElement.style.fontSize = "0.85rem";
    errorElement.style.display = "block";
    errorElement.style.marginTop = "4px";
    if (field.matches('textarea')) {
      field.insertAdjacentElement('afterend', errorElement)
    } else {
      field.parentElement.appendChild(errorElement)
    }
  }
  errorElement.textContent = message;
  field.classList.add("error");
  field.setAttribute('aria-describedby', errorId)
}

function clearFieldError(field) {
  const errorElement = document.getElementById(`${field.name}-error`)
  if (errorElement) errorElement.textContent = "";
  field.classList.remove("error");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function setButtonState(state) {
  if (!sendButton) return;
  if (state === "loading") {
    sendButton.disabled = true;
    sendButton.innerHTML = `<span class="spinner"></span> Envoi en cours...`;
  } else if (state === "success") {
    sendButton.disabled = false;
    sendButton.textContent = "Message envoyé";
    setTimeout(() => { sendButton.textContent = "Envoyer le message"; }, 2500);
  } else if (state === "error") {
    sendButton.disabled = false;
    sendButton.textContent = "Erreur d'envoi";
    setTimeout(() => { sendButton.textContent = "Envoyer le message"; }, 2500);
  } else {
    sendButton.disabled = false;
    sendButton.textContent = "Envoyer le message";
  }
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameField = form.querySelector('input[name="user_name"]');
    const emailField = form.querySelector('input[name="user_email"]');
    const messageField = form.querySelector('textarea[name="message"]');
    const honeypot = document.getElementById("website");

    let isValid = true;
    [nameField, emailField, messageField].forEach(field => clearFieldError(field));

    if (nameField.value.trim() === "") {
      showFieldError(nameField, "Veuillez saisir votre nom.");
      isValid = false;
    }
    if (!validateEmail(emailField.value)) {
      showFieldError(emailField, "Veuillez saisir une adresse e-mail valide.");
      isValid = false;
    }
    if (messageField.value.trim() === "") {
      showFieldError(messageField, "Veuillez écrire votre message.");
      isValid = false;
    }
    if (honeypot && honeypot.value !== "") {
      showMessage("Envoi refusé.", "error");
      setButtonState("error");
      return;
    }
    if (!isValid) {
      showMessage("Veuillez corriger les champs indiqués.", "error");
      setButtonState("error");
      return;
    }

    setButtonState("loading");

    if (typeof emailjs === 'undefined') {
      showMessage("Le service de contact est temporairement indisponible.", "error");
      setButtonState("error");
      return;
    }

    emailjs.sendForm("service_4a59tpg", "template_qjsz6ha", form)
      .then(() => {
        showMessage("Votre message a bien été envoyé.", "success");
        setButtonState("success");
        form.reset();
      })
      .catch(error => {
        console.error('EmailJS submission failed:', error)
        showMessage("Échec de l'envoi. Vérifiez votre connexion et réessayez.", "error");
        setButtonState("error");
      });
  });
}

/*=== SCROLL UP ===*/
const scrollUp = () => {
  const scrollUpElement = document.getElementById('scroll-up')
  if (scrollUpElement) {
    window.scrollY >= 350 ? scrollUpElement.classList.add('show-scroll')
                          : scrollUpElement.classList.remove('show-scroll')
  }
}
window.addEventListener('scroll', scrollUp)
scrollUp()

/*=== ACTIVE LINK ===*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id,
      Top = section.offsetTop - 50,
      height = section.offsetHeight,
      link = document.querySelector('.nav__menu a[href*=' + id + ']')
    if (!link) return

    link.classList.toggle('active-link', scrollY > Top && scrollY <= Top + height)
  })
}

window.addEventListener('scroll', scrollActive)
scrollActive()

/*=== SCROLL REVEAL ===*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 300,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  });
  sr.reveal('.work__swiper', { delay: 400, origin: 'bottom' });
}