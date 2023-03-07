// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let outputEl = document.getElementById("output");

let contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let name = prompt("Enter the contact name:");
  let email = prompt("Enter the contact Email:");
  let phone = prompt("Enter the contact phone number:");
  let country = prompt("Enter the country your contact resides in:");
  contacts.push(newContact(name, email, phone, country));
  saveContacts();
  displayContacts();
}

function removeContact() {
  let index = +prompt("Enter # of contact (not phone):");
  if (index >= 0 && index < contacts.length) {
    // Valid Index --> Remove
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
  } else {
    alert("Invalid contact number.");
  }
}

function displayByName() {
  let inputName = prompt("Enter contact name:");
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].includes(inputName)) {
      getContactHTMLStr(contacts[i], i);
    } else {
      alert("Name not found");
    } 
  }
}

function displayByCountry() {
  console.log("Display by Country");
}

// HELPER FUNCTIONS

// Return a new contact
function newContact(contactName, contactEmail, contactPhone, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    country: contactCountry,
  };
}

// Create html for given contact
function getContactHTMLStr(contacts, i) {
  return `
<div class="contactInfo">
  <p class="name">${i}: ${contacts.name}</p>
  <p class="email">${contacts.email}</p>
  <p class="phone">${contacts.phone} (${contacts.country})</p>
</div>
`;
}

// Save global contacts to local storage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load contacts from local storage
function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}
