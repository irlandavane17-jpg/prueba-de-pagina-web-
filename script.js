const slides = [...document.querySelectorAll(".hero-slide")];
const slideDots = [...document.querySelectorAll(".slide-dot")];
const slideNext = document.querySelector(".slide-next");
const heroIndex = document.querySelector(".hero-index");
let activeSlide = 0;
let carouselTimer;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, position) => {
    const isActive = position === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
  slideDots.forEach((dot, position) => {
    const isActive = position === activeSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
  heroIndex.textContent = `0${activeSlide + 1} / 0${slides.length}`;
}

function restartCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 6500);
}

slideDots.forEach((dot) => dot.addEventListener("click", () => {
  showSlide(Number(dot.dataset.goTo));
  restartCarousel();
}));
slideNext.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  restartCarousel();
});
restartCarousel();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("is-open");
}));

const infoDialog = document.querySelector(".info-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogCopy = document.querySelector(".dialog-copy");
const dialogServices = document.querySelector(".dialog-services");
const dialogIncluded = document.querySelector(".dialog-included");
const serviceInformation = {
  "Servicios contables": {
    description: "Ofrecemos soluciones contables para mantener organizada y actualizada la información financiera de tu negocio, facilitar el control administrativo y cumplir tus obligaciones.",
    services: [
      "Asesoría contable",
      "Facturación electrónica",
      "Cálculo de impuestos",
      "Elaboración y análisis de estados financieros",
      "Administración de nóminas",
      "Capacitación en el manejo de software",
      "Planeación financiera",
      "Asesoría en proyectos de inversión"
    ]
  },
  "Asesoría fiscal": {
    description: "Brindamos orientación y acompañamiento fiscal para ayudar a personas físicas y morales a cumplir adecuadamente con sus obligaciones tributarias y mejorar la planeación de sus recursos.",
    services: [
      "Planeación fiscal",
      "Cálculo y asesoría de impuestos",
      "Auditorías fiscales",
      "Auditorías de IMSS",
      "Auditorías de control interno",
      "Constitución y disolución de empresas",
      "Asesoría en materia fiscal"
    ]
  },
  "Asesoría corporativa": {
    description: "Apoyamos a las empresas en su organización, administración y toma de decisiones, con herramientas e ideas para aprovechar mejor sus recursos y fortalecer su funcionamiento.",
    services: [
      "Gobierno corporativo",
      "Asesoría patrimonial",
      "Apoyo en la toma oportuna de decisiones",
      "Capacitaciones empresariales",
      "Orientación para el mejor aprovechamiento de recursos",
      "Enseñanza de mejores prácticas para la administración de recursos"
    ]
  },
  "Asesoría financiera": {
    description: "Ayudamos a nuestros clientes a comprender, organizar y administrar sus recursos financieros con herramientas de planeación y análisis que contribuyen a una mejor toma de decisiones.",
    services: [
      "Elaboración y análisis de estados financieros",
      "Gestión de recursos ante instituciones públicas y privadas",
      "Elaboración de planes de negocios",
      "Planeación financiera",
      "Asesoría en proyectos de inversión",
      "Orientación para una mejor administración de los recursos financieros"
    ]
  },
  "Servicios IMSS": {
    description: "Proporcionamos asesoría y servicios relacionados con las obligaciones patronales y los procedimientos ante el Instituto Mexicano del Seguro Social.",
    services: [
      "Alta de empresas",
      "Declaraciones de riesgos de trabajo",
      "Planes de pensiones",
      "Servicio Integral de Registro de Obras de Construcción (SIROC)",
      "Asesoría relacionada con IMSS"
    ]
  },
  "Asesoría en materia de prevención de lavado de dinero": {
    description: "Ofrecemos asesoría en materia de prevención de lavado de dinero, orientada al cumplimiento de las disposiciones aplicables a las actividades y operaciones de nuestros clientes.",
    services: []
  }
};

function openInformation(title, description) {
  dialogTitle.textContent = title;
  dialogCopy.textContent = description;
  infoDialog.showModal();
  document.body.classList.add("dialog-open");
}

document.querySelectorAll(".service-info").forEach((button) => {
  button.addEventListener("click", () => {
    const information = serviceInformation[button.dataset.service];
    dialogServices.replaceChildren(
      ...information.services.map((service) => {
        const item = document.createElement("li");
        item.textContent = service;
        return item;
      })
    );
    dialogIncluded.hidden = information.services.length === 0;
    openInformation(button.dataset.service, information.description);
  });
});
const simulatorTabs = [...document.querySelectorAll(".simulator-tab")];
simulatorTabs.forEach((tab, index) => {
  function activateTab() {
    simulatorTabs.forEach((item, position) => {
      const isActive = position === index;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.tabIndex = isActive ? 0 : -1;
      document.querySelector(`#${item.getAttribute("aria-controls")}`).hidden = !isActive;
    });
  }

  tab.addEventListener("click", () => activateTab());
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % simulatorTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + simulatorTabs.length) % simulatorTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = simulatorTabs.length - 1;
    else return;
    event.preventDefault();
    simulatorTabs[nextIndex].click();
    simulatorTabs[nextIndex].focus();
  });
});

const moneyFormat = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

function setResult(form, name, value) {
  form.querySelector(`[data-result="${name}"]`).textContent = moneyFormat.format(value);
}

document.querySelectorAll("[data-calculator]").forEach((form) => {
  const resultPanel = form.querySelector("[data-result-panel]");
  const number = (name) => Number(new FormData(form).get(name));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const calculator = form.dataset.calculator;

    if (calculator === "pension") {
      const currentAge = number("currentAge");
      const retirementAge = number("retirementAge");
      const retirementField = form.elements.namedItem("retirementAge");
      retirementField.setCustomValidity(
        retirementAge <= currentAge ? "La edad de retiro debe ser mayor que la edad actual." : ""
      );
      if (!form.reportValidity()) return;

      const months = (retirementAge - currentAge) * 12;
      const monthlyRate = (1 + number("returnRate") / 100) ** (1 / 12) - 1;
      const contribution = number("contribution");
      let balance = number("savings");
      for (let month = 0; month < months; month += 1) {
        balance = balance * (1 + monthlyRate) + contribution;
      }
      setResult(form, "retirement-balance", balance);
      setResult(form, "monthly-income", balance / 240);
    } else {
      let taxableBase;
      let estimatedTax;
      const payments = number("payments");

      if (calculator === "isr") {
        taxableBase = Math.max(0, number("monthlyIncome") * 12 - number("deductions"));
        estimatedTax = taxableBase * number("taxRate") / 100;
      } else {
        taxableBase = Math.max(0, number("income") - number("deductions") - number("profitSharing"));
        estimatedTax = taxableBase * number("taxRate") / 100;
      }

      const difference = estimatedTax - payments;
      form.querySelector('[data-result="balance-label"]').textContent =
        difference > 0 ? "ISR por pagar estimado" : difference < 0 ? "Saldo a favor estimado" : "Sin diferencia estimada";
      setResult(form, "taxable-base", taxableBase);
      setResult(form, "estimated-tax", estimatedTax);
      setResult(form, "balance", Math.abs(difference));
    }

    resultPanel.hidden = false;
  });

  form.addEventListener("reset", () => {
    resultPanel.hidden = true;
    form.querySelectorAll("input").forEach((input) => input.setCustomValidity(""));
  });
});

document.querySelectorAll('[data-calculator="pension"] input[name="retirementAge"], [data-calculator="pension"] input[name="currentAge"]').forEach((input) => {
  input.addEventListener("input", () => {
    document.querySelector('[data-calculator="pension"] input[name="retirementAge"]').setCustomValidity("");
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => infoDialog.close());
document.querySelector(".dialog-back").addEventListener("click", () => infoDialog.close());
infoDialog.addEventListener("click", (event) => {
  if (event.target === infoDialog) infoDialog.close();
});
infoDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
document.querySelector(".dialog-contact").addEventListener("click", () => infoDialog.close());

const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  document.querySelector("#form-message").textContent =
    "Tus datos son válidos, pero el envío aún no está conectado. Por favor, llámanos al 347-68-38.";
});

document.querySelector("#year").textContent = String(new Date().getFullYear());

const chatLauncher = document.querySelector(".chat-launcher");
const chatPanel = document.querySelector(".chat-panel");
const chatReply = document.querySelector(".chat-reply");
const chatClose = document.querySelector(".chat-close");

function setChatOpen(isOpen) {
  chatPanel.hidden = !isOpen;
  chatLauncher.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) chatClose.focus();
  else chatLauncher.focus();
}

chatLauncher.addEventListener("click", () => {
  setChatOpen(chatPanel.hidden);
});
chatClose.addEventListener("click", () => setChatOpen(false));
document.querySelectorAll(".chat-options button").forEach((button) => {
  button.addEventListener("click", () => {
    chatReply.textContent = button.dataset.reply;
    if (button.textContent.includes("cotización")) {
      document.querySelector("#cotizacion").scrollIntoView({ behavior: "smooth" });
    } else if (button.textContent.includes("contacto")) {
      document.querySelector("#contacto").scrollIntoView({ behavior: "smooth" });
    }
  });
});
document.querySelector(".chat-contact-link").addEventListener("click", () => setChatOpen(false));
