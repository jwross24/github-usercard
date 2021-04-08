import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// let myData = axios.get('https://api.github.com/users/jwross24');

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

  STEP 3: Create a function that accepts a single object as its only argument.
  Using DOM methods and properties, create and return the following markup:

  <div class="card">
    <img src={image url of user} />
    <div class="card-info">
      <h3 class="name">{users name}</h3>
      <p class="username">{users user name}</p>
      <p>Location: {users location}</p>
      <p>Profile:
        <a href={address to users github page}>{address to users github page}</a>
      </p>
      <p>Followers: {users followers count}</p>
      <p>Following: {users following count}</p>
      <p>Bio: {users bio}</p>
    </div>
  </div>

  List of LS Instructors Github usernames:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
function cardMaker(cardData) {
  // Instantiate the elements
  let card = document.createElement('div');
  let avatar = document.createElement('img');
  let cardInfo = document.createElement('div');
  let name = document.createElement('h3');
  let username = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let profileLink = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');

  // Set class names, attributes, and text
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  avatar.src = cardData.avatar_url;
  name.textContent = cardData.name;
  username.textContent = cardData.username;
  location.textContent = `Location: ${cardData.location}`;
  profile.textContent = 'Profile: ';
  profileLink.href = cardData.html_url;
  profileLink.textContent = cardData.html_url;
  followers.textContent = `Followers: ${cardData.followers}`;
  following.textContent = `Following: ${cardData.following}`;
  bio.textContent = `Bio: ${cardData.bio}`;

  // Create the hierarchy
  card.appendChild(avatar);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.append(username);
  cardInfo.append(location);
  cardInfo.append(profile);
  profile.append(profileLink);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);

  return card;
}

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
let cards = document.querySelector('.cards');

function addCard(cardData) {
  cards.appendChild(cardMaker(cardData));
}

axios
  .get('https://api.github.com/users/jwross24')
  .then((res) => addCard(res.data))
  .catch((err) => console.log(err));

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
];

followersArray.forEach((follower) => {
  axios
    .get(`https://api.github.com/users/${follower}`)
    .then((res) => addCard(res.data))
    .catch((err) => console.log(err));
});
