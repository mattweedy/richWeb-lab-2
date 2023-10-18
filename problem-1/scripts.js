// dom elements
const contactForm = document.getElementById("contact-form")
const contactAddButton = document.getElementById("contact-add");
const error = document.getElementById("error");
const noResult = document.getElementById("noResult");
const contactName = document.getElementById("contact-name");
const contactMobile = document.getElementById("contact-mobile");
const contactEmail = document.getElementById("contact-email");
const tableNameSort = document.getElementById("table-th-Name");
const contactSearch = document.getElementById("contact-search");

// variables
let contacts = [];
let searchResults = [];
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
};

function createTable() {
    const contactTable = document.getElementById("contact-table");
    const contactsTBody = contactTable.querySelector("tbody");

    contactsTBody.innerHTML = "";

    // sort the contact list based on the value of asc
    contacts.sort((a, b) => (asc ? a.cname.localeCompare(b.cname) : b.cname.localeCompare(a.cname)));

    // use searchResults if it isn't empty, otherwise full contacts list
    const shownContacts = searchResults.length > 0 ? searchResults : contacts;

    // go through contact list
    for (let i = 0; i < shownContacts.length; i++) {
        // add a row
        const row = contactsTBody.insertRow(-1);
        
        // add the three cells to the row
        const rowName = row.insertCell(0);
        const rowMobile = row.insertCell(1);
        const rowEmail = row.insertCell(2);
  
        // set the text to the relevant data
        rowName.innerHTML = shownContacts[i].cname;
        rowMobile.innerHTML = shownContacts[i].mobile;
        rowEmail.innerHTML = shownContacts[i].email;
      }
};

contactSearch.addEventListener("input", function () {
    const mobileSearch = this.value.trim();

    searchResults = contacts.filter((contact) => contact.mobile.includes(mobileSearch));

    if (mobileSearch.trim() === "") { searchResults = [] };

    if (searchResults.length === 0) {
      document.getElementById("noResult").style.display = "block";
    } else {
      document.getElementById("noResult").style.display = "none";
    }

    createTable();
});

tableNameSort.addEventListener("click", function () {
    asc = !asc; // reverse the order aka asc -> desc -> asc
    createTable();
});