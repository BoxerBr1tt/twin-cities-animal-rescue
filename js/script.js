const volunteerRoles = [
    { id: "dog-walking", name: "Dog Walking" },
    { id: "cat-socialization", name: "Cat Socialization" },
    { id: "adoption-event-helper", name: "Adoption Event Helper" }
];

let myInterests = [];

function showInterests() {
    const list = document.getElementById("my-interests-list");
    if (!list) {
        return;
    }
    list.innerHTML = "";
    myInterests.forEach(function (id) {
        const role = volunteerRoles.find(function (r) {
            return r.id === id;
        });
        const item = document.createElement("li");
        item.textContent = role.name;
        list.appendChild(item);
    });
    document.querySelectorAll("[data-role]").forEach(function (button) {
        button.classList.toggle("selected", myInterests.includes(button.getAttribute("data-role")));
    });
}


function saveInterests() {
  localStorage.setItem("myInterests", JSON.stringify(myInterests));
}

function loadInterests() {
  const saved = localStorage.getItem("myInterests");
  if (saved) {
    myInterests = JSON.parse(saved);
  }
  showInterests();
}

function prefillMessage() {
  const messageField = document.getElementById("message");
  if (!messageField) {
    return;
  }
  if (messageField.value !== "") {
    return;
  }
  if (myInterests.length === 0) {
    return;
  }
  const sentences = myInterests.map(function (id) {
    const role = volunteerRoles.find(function (r) {
      return r.id === id;
    });
    return "I'm interested in receiving more information about " + role.name + ".";
  });
  messageField.value = sentences.join(" ");
}


function toggleInterest(id) {
  const index = myInterests.indexOf(id);
  if (index === -1) {
    myInterests.push(id);
  } else {
    myInterests.splice(index, 1);
  }
  saveInterests(); 
  showInterests();
}

document.querySelectorAll("[data-role]").forEach(function (button) {
  button.addEventListener("click", function () {
    toggleInterest(button.getAttribute("data-role"));
  });
});

loadInterests();
prefillMessage();

const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    let valid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    if (nameField.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      valid = false;
    }
    const emailValue = emailField.value.trim();
    const atIndex = emailValue.indexOf("@");
    if (atIndex === -1 || emailValue.indexOf(".", atIndex) === -1) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }
    if (messageField.value.trim() === "") {
      messageError.textContent = "Please enter a message.";
      valid = false;
    }
    if (!valid) {
      event.preventDefault();
    }
  });
}
