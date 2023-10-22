const userSearch = document.getElementById("user-search-bar");
const userSearchButton = document.getElementById("user-search-button");
const userProfile = document.getElementById("user-profile")
// const url = 'https://api.github.com/users/mattweedy';
const url = 'https://api.github.com/users/'; //append the input onto end of string
// const gists_url = 'https://api.github.com/users/mattweedy/gists';
const gists_url = 'https://api.github.com/users/';

let userNumGists = ""

// function to get get specified user profile from Github API
async function fetchData(url_to_fetch) {
    try { // try HTTP GET request from Github API
        const response = await fetch(url_to_fetch);
        if (!response.ok) { // if the response isn't good (200) throw error
            throw new Error(`HTTP Error while attempting to request from : ${url_to_fetch}\n Status : ${response.status}"`);
        } else { // otherwise return the data in json
            return response.json();
        }
    } catch (error) { // if some other error occurs while fetching
        throw new Error(`Error fetching data : ${error}`);
    }
}

// create listener for when search button is pressed
userSearchButton.addEventListener("click", function() {
    const searchUser = userSearch.innerHTML;
    searchUser.trim();

    // add the user
    gists_url.concat("", searchUser);
    url.concat("", searchUser);

    // gists_url = gists_url + searchUser + "/gists";
    // url = url + searchUser;

    console.log(gists_url)
    console.log(url)
    // fetchData(gists_url);
    // fetchData(url);
});

// get the number of user gists
/* fetchData(gists_url)
    .then(gists => {
        userNumGists = gists.length;
    })

fetchData(url)
    .then(user => {
        displayUser(user);
    })
 */
// divide up information from fetched user and create HTML elements to hold data
function displayUser(user) {
    // clear existing user data
    userProfile.innerHTML = "";

    // create image element for user's pfp
    const userAvatarContainer = document.createElement("section");
    const userAvatar = document.createElement("img");

    userAvatar.src = user.avatar_url;
    userAvatarContainer.id = "avatar-container"

    userAvatarContainer.appendChild(userAvatar);
    userProfile.appendChild(userAvatarContainer);

    // list of user details we want
    const userDetails = [
        { label: "Name", value: user.name },
        { label: "Username", value: user.login },
        { label: "Email", value: user.email },
        { label: "Location", value: user.location },
        { label: "Number of Gists", value: userNumGists }
    ];

    // create the user detail elements
    userDetails.forEach((detail) => {
        // create a <div>, <h3> and <p> tag for each user detail
        const userDetailContainer = document.createElement("div");
        const userDetailLabel = document.createElement("h3");
        const userDetailValue = document.createElement("p");

        // set the container's class
        userProfile.className = "user-profile";

        // set the text to the user data
        userDetailLabel.innerText = detail.label;
        userDetailValue.innerText = detail.value;
        
        // if any info is empty display as null
        if (userDetailValue.innerText === "") { 
            userDetailValue.innerText = "null or private";
            userDetailValue.style.color = "red";
        }

        // append the html elements to the container
        userDetailContainer.appendChild(userDetailLabel);
        userDetailContainer.appendChild(userDetailValue);

        // append the container to the userProfile div
        userProfile.appendChild(userDetailContainer);
    });
}

// TODO: need to implement CSS, search bar functionality, repos section