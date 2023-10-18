// dom elements
const contactForm = document.getElementById("contact-form")
const contactAddButton = document.getElementById("contact-add");
const error = document.getElementById("error");
const noResult = document.getElementById("noResult");
const contactName = document.getElementById("contact-name");
const contactMobile = document.getElementById("contact-mobile");
const contactEmail = document.getElementById("contact-email");

let contacts = [];

// listener
// contactForm.addEventListener("submit", addContact);
contactAddButton.addEventListener("click", addContact);

function addContact() {

    const cname = contactName.value;
    const mobile = contactMobile.value;
    const email = contactEmail.value;
    
    if (cname.trim() !== "" &&
        mobile.trim() !== "" &&
        email.trim() !== ""
    ) {
        // set error and noResult to invisible
        error.style.display = "none";
        noResult.style.display = "none";
    
        // if all passes, add them to contacts[]
        const contact = {cname, mobile, email};
        contacts.push(contact);
    
        // clear input fields
        contactName.value = "";
        contactMobile.value = "";
        contactEmail.value = "";
    } else {
        // if fails any, reveal the 'error' div
        error.style.display = "block";
        noResult.style.display = "block";
    }

    // GRAB THE TEXT AND ADD A NEW ROW, CAN FULLY VAlidate after
    const contactTable = document.getElementById("contact-table");
    const constTBody = contactTable.querySelector("tbody");

    for (let i = 0; i < contacts.length; i++) {
        const row = constTBody.insertRow(-1);
        
        const rowName = row.insertCell(0);
        const rowMobile = row.insertCell(1);
        const rowEmail = row.insertCell(2);
  
        rowName.innerHTML = contacts[i].cname;
        rowMobile.innerHTML = contacts[i].mobile;
        rowEmail.innerHTML = contacts[i].email;
      }

}
// find the element for the contact list
// create new element with the stored and cleaned input

// filter()
// figure this one out
// when name is clicked it will first go by asc, followed by desc

// searchMobile()
// have it find each char input and add it to a string
// continuously be looking for matches in list
// if none, reveal 'noResult' div