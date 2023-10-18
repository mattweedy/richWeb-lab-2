// dom elements
const contactForm = document.getElementById("contact-form")
const contactAddButton = document.getElementById("contact-add");
const error = document.getElementById("error");
const noResult = document.getElementById("noResult");
const contactName = document.getElementById("contact-name");
const contactMobile = document.getElementById("contact-mobile");
const contactEmail = document.getElementById("contact-email");
const tableNameSort = document.getElementById("table-th-Name");

let contacts = [];
let asc = true;

// listener
contactAddButton.addEventListener("click", addContact);

function addContact() {
    const cname = contactName.value;
    const mobile = contactMobile.value;
    const email = contactEmail.value;

    if (cname.trim() !== "" &&
        mobile.trim() !== "" &&
        email.trim() !== "" &&
        cname.match(/^[A-Za-z ]{1,20}$/) &&
        /^\d{10}$/.test(mobile) &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
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

        createTable();
    } else {
        // if fails any, reveal the 'error' div
        error.style.display = "block";
    }
}

function createTable() {
    const contactTable = document.getElementById("contact-table");
    const contactsTBody = contactTable.querySelector("tbody");

    contactsTBody.innerHTML = "";

    // contacts.sort((a, b) => (asc < 1 ? -1 : 1))
    contacts.sort((a, b) => (asc ? a.cname.localeCompare(b.cname) : b.cname.localeCompare(a.cname)));

    for (let i = 0; i < contacts.length; i++) {
        const row = contactsTBody.insertRow(-1);
        
        const rowName = row.insertCell(0);
        const rowMobile = row.insertCell(1);
        const rowEmail = row.insertCell(2);
  
        rowName.innerHTML = contacts[i].cname;
        rowMobile.innerHTML = contacts[i].mobile;
        rowEmail.innerHTML = contacts[i].email;
      }
}

tableNameSort.addEventListener("click", function () {

    asc = !asc; // reverse the order aka asc -> desc -> asc
    createTable();
})

// filter()
// figure this one out
// when name is clicked it will first go by asc, followed by desc

// searchMobile()
// have it find each char input and add it to a string
// continuously be looking for matches in list
// if none, reveal 'noResult' div