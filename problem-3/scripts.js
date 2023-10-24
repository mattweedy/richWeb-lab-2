const userSearch = document.getElementById("user-search-bar");
const userSearchButton = document.getElementById("user-search-button");
const userProfile = document.getElementById("user-profile");
const baseUrl = 'https://api.github.com/users/'; //append the input onto end of string

let userNumGists = ""

// function to get get specified user profile from Github API
async function fetchData(url_to_fetch) {
    try { // try HTTP GET request from Github API
        const response = await fetch(url_to_fetch);
        if (!response.ok) { // if the response isn't good (200) throw error
            if (response.status === 404) {
                userProfile.append(document.createElement("div").innerHTML = "Specified Github user not found");
                throw new Error("User not found");
            } else {
                throw new Error(`HTTP Error while attempting to request from : ${url_to_fetch}\n Status : ${response.status}"`);
            }
        } else { // otherwise return the data in json
            return response.json();
        }
    } catch (error) { // if some other error occurs while fetching
        throw new Error(`Error fetching data : ${error}`);
    }
}

// create listener for when search button is pressed
userSearchButton.addEventListener("click", async function() {
    const searchUser = userSearch.value.trim();
    
    // create user and user's gists url
    const userUrl = `${baseUrl}${searchUser}`;
    const gistsUrl = `${baseUrl}${searchUser}/gists`;

    try {
        const userData = await fetchData(userUrl);
        const userGists = await fetchData(gistsUrl);
        userNumGists = userGists.length;
        displayUser(userData);
    } catch (error) {
        if (error.message === "User not found") {
            console.info("ERROR: Specified Github user not found");
        } else {
            console.error(error);
        }
    }
});

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