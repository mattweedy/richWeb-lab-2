// dom elements
const contactAddButton = document.getElementById("contact-add");
const error = document.getElementById("error");
const noResult = document.getElementById("noResult");

let contacts = [];

// set error and noResult to invisible
error.style.display = "none";
noResult.style.display = "none";

// listener
contactAddButton.addEventListener("click", validateForm);

function validateForm() {
    // get the form inputs
    // console.log("test");

    const name = document.getElementById("contact-name").value;
    const mobile = document.getElementById("contact-mobile").value;
    const email = document.getElementById("contact-email").value;

    if (
        name.trim() !== "" &&
        mobile.trim() !== "" &&
        email.trim() !== ""
    ) {
        console.log(name)
        console.log(mobile)
        console.log(email)
    } else {
        error.style.display = "block";
        noResult.style.display = "block";
    }

    // name.match(/^[A-Za-z ]{1,20}$/)
    addContact(name, mobile, email);

}
// check all validation asked for
// if fails any, reveal the 'error' div
// if all passes, call addContact()

function addContact(name, mobile, email) {
    // GRAB THE TEXT AND ADD A NEW ROW, CAN FULLY VAlidate after
    const contactTable = document.getElementById("contact-table");
    const constTBody = contactTable.querySelector("tbody");
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