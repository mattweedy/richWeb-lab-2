const url = 'https://jsonplaceholder.typicode.com/posts'

let wordFrequencyMap = []

// function to get all posts data from the API
async function fetchPosts() {
    try { // try HTTP GET request from jsonplaceholder api
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

// function to create word frequency map of all posts body
function wordFreqMap(words) {
    // join all words, and use regex pattern to match whole words (case insensitive)
    words = words
        .join(" ")
        .match(/\w+/gi);

    // count how many occurences of each word and return as a map
    return words.reduce((map, word) => {
        map[word] = (map[word] || 0) + 1;
        return map;
    }, {});
}

fetchPosts()
    .then(posts => {
        // problem 1
        // list all post titles having more than six words
        const titlesOfLongPosts = posts
            // split post titles in words
            // then filter for any with more than 6
            .filter(post => post.title.split(" ").length > 6)
            // now we use map() to select all the titles
            .map(post => post.title);
        
        console.log("Post titles with more than 6 words :");
        // using for loop here only to present the data
        for (let i = 0; i < titlesOfLongPosts.length; i++) {
            // printing the index+1 and then the title so they are all numbered
            console.log(`${i+1}. ${titlesOfLongPosts[i]}`);
        }

        // problem 2
        // show a word frequency map for all of the body contents of the posts

        // grab all bodies of all posts and flatten it
        const postsBody = posts.flatMap(post => post.body);
        // call function to return the freq map
        wordFrequencyMap = wordFreqMap(postsBody);

        console.log("Word Frequency Map for body of all posts :");
        console.log(wordFrequencyMap)
    })