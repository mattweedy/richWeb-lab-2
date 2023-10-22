const userSearch = document.getElementById("user-search-bar");
const userSearchButton = document.getElementById("user-search-button");
const userProfile = document.getElementById("user-profile")
const url = 'https://api.github.com/users/mattweedy';

// function to get get specified user profile from Github API
async function fetchUser() {
    try { // try HTTP GET request from Github API
        const response = await fetch(url);
        if (!response.ok) { // if the response isn't good (200) throw error
            throw new Error(`HTTP Error. Status : ${response.status}"`);
        } else { // otherwise return the data in json
            return response.json();
        }
    } catch (error) { // if some other error occurs while fetching
        throw new Error(`Error fetching data : ${error}`);
    }
}

// create listener for when search button is pressed
userSearchButton.addEventListener("click", displayUser);

fetchUser()
    .then(user => {
        // creating a <p> tag element to display the relevant data
        const allUserDetails = document.createElement("p");
        allUserDetails.innerHTML = `pfp : ${userDetails[0]}<br>name : ${userDetails[1]}<br>login : ${userDetails[2]}<br>email : ${userDetails[3]}<br>location : ${userDetails[4]}`;

        userProfile.appendChild(allUserDetails);
        console.log(user);
    })

// goal of displayUser : divide up information from fetched user and create HTML elements to hold data
//                       & append them to the existing <div id="user-profile">
//
//                      to create :
//                      - a div containing an image with src=user.avatar_url
//                      - <p> with <h3>Name</h3> and <p> with user.name 
//                      - <p> with <h3>Username</h3> and <p> with user.username 
//                      - <p> with <h3>Email</h3> and <p> with user.email
//                      - <p> with <h3>Location</h3> and <p> with user.location
//                      - <p> with <h3>Number of Gists</h3> and <p> with calculated number of gists based on user.gists_url.length() 
function displayUser(user) {
    // clear existing user data
    userProfile.innerHTML = "";

    // create image element for user's pfp
    const userAvatar = document.createElement("img");
    userAvatar.src = user.avatar_url;
    userProfile.appendChild(userAvatar);

    // grab number of gists
    const userNumGists = calculateNumGists(user)l

    // list of user details we want
    const puserDetails = [user.avatar_url, user.name, user.login, user.email, user.location, userNumGists];

    const userDetails = [
        { label: "Name", value: user.name },
        { label: "Username", value: user.username },
        { label: "Email", value: user.email },
        { label: "Location", value: user.location }
    ];

    // create the user detail elements
    userDetails.forEach((detail) => {
        const userDetailContainer = document.createElement("div");
    })

}

function calculateNumGists(user) {
    return user.gists_url.length();
}