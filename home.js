let dropdowns = document.querySelectorAll(".navbar .dropdown-toggler");
let dropdownIsOpen = false;

// Handle dropdown menues
if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`);

      if (target) {
        if (target.classList.contains("show")) {
          target.classList.remove("show");
          dropdownIsOpen = false;
        } else {
          target.classList.add("show");
          dropdownIsOpen = true;
        }
      }
    });
  });
}

// Handle closing dropdowns if a user clicked the body
window.addEventListener("mouseup", (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(
        `#${dropdownButton.dataset.dropdown}`
      );
      let targetIsDropdown = dropdown == event.target;

      if (dropdownButton == event.target) {
        return;
      }

      if (!targetIsDropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  }
});

//contact us

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector('form[name="contact-us"]');

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = contactForm.querySelector('input[name="name"]').value;
    const emailInput = contactForm.querySelector('input[name="email"]').value;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!nameRegex.test(nameInput)) {
      alert("Please enter a valid name.");
      return;
    }

    if (!emailRegex.test(emailInput)) {
      alert("Please enter a valid email address.");
      return;
    }

    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/submit-contact");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById("form-message").innerText =
          "Your message was saved successfully!";
        contactForm.reset();
        setTimeout(function () {
          formMessage.innerText = "";
        }, 5000);
      } else {
        document.getElementById("form-message").innerText =
          "There was an error saving your message.";
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      document.getElementById("form-message").innerText =
        "There was an error saving your message.";
      console.error("Error:", xhr.statusText);
    };
    xhr.send(JSON.stringify(data));
  });
});

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("user");
if (user) {
  document.getElementById(
    "user-welcome-message"
  ).innerText = `Welcome ${user} !`;
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const loginLink = document.getElementById("loginLink");

  if (user) {
    loginLink.innerText = "Logout";
    loginLink.href = "/";
  }
});

function handleSmallScreens() {
  document.querySelector(".navbar-toggler").addEventListener("click", () => {
    let navbarMenu = document.querySelector(".navbar-menu");

    if (!navbarMenu.classList.contains("active")) {
      navbarMenu.classList.add("active");
    } else {
      navbarMenu.classList.remove("active");
    }
  });
}

handleSmallScreens();
