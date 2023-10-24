const userContainer = document.getElementById("user-container");
const userProfile = document.getElementById("user-profile");
const userRepos = document.getElementById("user-repos");
const userSearch = document.getElementById("user-search-bar");
const userSearchButton = document.getElementById("user-search-button");
const errorMsg = document.getElementById("error");
const baseUrl = 'https://api.github.com/users/'; //append the input onto end of string

let userNumGists = "";

// function to get get specified user profile from Github API
async function fetchData(url_to_fetch) {
    try { // try HTTP GET request from Github API
        const response = await fetch(url_to_fetch);
        
        if (!response.ok) { // if the response isn't good throw error
            if (response.status === 404) {
                errorMsg.textContent = "Specified Github user not found";
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
    userProfile.innerHTML = "";
    userRepos.innerHTML = "";
    const searchUser = userSearch.value.trim();

    if (searchUser === "") {
        return;
    }

    // flag for making sure error div isnt created twice upon one fetch failing
    let userNotFound = false;
    
    // create user and user's gists url
    const userUrl = `${baseUrl}${searchUser}`;
    const gistsUrl = `${baseUrl}${searchUser}/gists`;
    const reposUrl = `${baseUrl}${searchUser}/repos`;

    try {
        const userData = await fetchData(userUrl);
        const userGists = await fetchData(gistsUrl);
        const userReposData = await fetchData(reposUrl);
        userNumGists = userGists.length;
        displayUser(userData);
        displayRepos(userReposData);
    } catch (error) {
        if (error.message === "User not found" && !userNotFound) {
            userProfile.style.display = "none";
            userProfile.innerHTML = "";
            userNotFound = true;
        } else {
            userProfile.style.display = "block";
            console.error(error);
        }
    }
});

// divide up information from fetched user and create HTML elements to hold data
function displayUser(user) {
    // clear existing user data
    userProfile.innerHTML = "";
    errorMsg.textContent = "";

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

        userDetailContainer.style.height = "56px";

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

        // append the container to the <user-profile> div
        userProfile.appendChild(userDetailContainer);
    });
}

// divide up repo information and create divs for their info
function displayRepos(repos) {
    // clear previous repos if 
    userRepos.innerHTML = "";
    
    // display a message if no repos
    if (repos.length === 0) {
        errorMsg.textContent = "No repositories available";
        userRepos.style.display = "none"; // Hide the user-repos container
        return;
    }

    // for every repo returned in json data
    for (const repo of repos) {
            // create a <div> with <h3 and <p>
            const userRepoContainer = document.createElement("div");
            const userRepoLabel = document.createElement("h3");
            const userRepoValue = document.createElement("p");

            // adding styles
            userRepoContainer.style.minHeight = "56px";
            userRepoValue.style.paddingBottom = "6px";
            userRepos.className = "user-profile";

            // inserting data into repo div
            userRepoLabel.innerHTML = repo.name;
            userRepoValue.innerHTML = `${repo.description || 'No description available'}`;
    
            // append relevant <div>s to the <user-repos>
            userRepoContainer.appendChild(userRepoLabel);
            userRepoContainer.appendChild(userRepoValue);
            userRepos.appendChild(userRepoContainer);
    }

    // if more than 5 repos from profile, make list scrollable
    if (repos.length > 5 ) {
        userRepos.style.maxHeight = "566px";
    } else {
        userRepos.style.maxHeight = "none";
    }
}