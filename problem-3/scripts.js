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

userSearchButton.addEventListener("click", displayUser);

fetchUser()
    .then(user => {
        // list of user details we want
        const userDetails = [user.avatar_url, user.name, user.login, user.email, user.location] // TODO: num gists

        // creating a <p> tag element to display the relevant data
        const allUserDetails = document.createElement("p");
        allUserDetails.innerHTML = `pfp : ${userDetails[0]}<br>name : ${userDetails[1]}<br>login : ${userDetails[2]}<br>email : ${userDetails[3]}<br>location : ${userDetails[4]}`;

        userProfile.appendChild(allUserDetails);
        console.log(user);
    })

function displayUser() {
}