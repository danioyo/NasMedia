const navbar = document.querySelector(".navbar");
const navElem = document.querySelectorAll(".navbar a");
const bubble = document.querySelector('.bubble');
const movieImage = document.querySelector(".movieImage");
const movieName = document.querySelector(".movieName");
const profile = document.querySelector(".user-avatar");
const profileArrow = document.querySelector(".user-avatar i")
const profileWindowRows = document.querySelector(".profile-window-rows");
const areYouSurePopUp = document.querySelector(".areYouSurePopUp");
const movieListContainer = document.querySelector(".movieListContainer");
const movieCard = document.querySelector(".movieCard");

const API_KEY = 'd1000b8f67ff7bd3a46a6fb4870e422c';

async function searchMovie(movieName) {
    const response =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`)
    const data = await response.json();
    console.log(data);
    const card =document.createElement("div");
    const posterWrapper = document.createElement("div");
    const Name = document.createElement("div");
    const movieDate = document.createElement("div");
    const poster = document.createElement("img");

    poster.src=`https://image.tmdb.org/t/p/w300${data.results[0].poster_path}`

    posterWrapper.classList.add("posterWrapper");
    Name.classList.add("movieName");
    poster.classList.add("movieImage");
    movieDate.classList.add("movieDate");
    Name.textContent = data.results[0].original_title;
    movieDate.textContent = data.results[0].release_date;





    card.classList.add("movieCard");
    movieListContainer.appendChild(card);


    card.appendChild(posterWrapper);
    posterWrapper.appendChild(poster);
    card.append(Name, movieDate);
}
searchMovie("the odyssey")
async function getMovie() {
    const response = await fetch(`http://localhost:3000/api/nas-movies`);
    const data = await response.json();
    console.log(data);
    data.movies.forEach(movieFile =>{
        if(movieFile.includes(".")){
            const theNameArray = movieFile.split(".");
            theNameArray.pop();
            const theName = theNameArray.join(" ");
            searchMovie(`${theName}`);
        }
        else{
            searchMovie(`${movieFile}`);
        }
    })

}
getMovie();

areYouSurePopUp.addEventListener("click",(event)=>{
    if(event.target.id=="xButtonPopUp"){
        areYouSurePopUp.classList.remove("active");
    }
    else if(event.target.id=="yesButtonPopUp"){
        window.location.replace("login-register form/login.html");
    }
})
profileWindowRows.addEventListener("click", (event)=>{
    if(event.target.closest(".disconnectRow")){
        areYouSurePopUp.classList.add("active");
    }
} )
document.addEventListener("DOMContentLoaded", ()=>{
    const currentUsername = document.querySelector(".currentUsername");
    const currentUser = localStorage.getItem("username");
    
    if (currentUser && currentUsername) {
        currentUsername.textContent = currentUser;
    }
})
profile.addEventListener("click", ()=>{
    if(profileArrow.classList.contains("fa-chevron-down")){
        profileArrow.classList.replace("fa-chevron-down", "fa-chevron-up");

    }
    else if(profileArrow.classList.contains("fa-chevron-up")){
        profileArrow.classList.replace("fa-chevron-up", "fa-chevron-down");
        areYouSurePopUp.classList.remove("active");
    }
    profileWindowRows.classList.toggle("active");
})

function moveBubble(element){
    const width = element.offsetWidth + 62;
    const left = element.offsetLeft - (62 / 2);

    bubble.style.width = `${width}px`;
    bubble.style.left = `${left}px`;
}
function moveToActive(){
    navElem.forEach(element=>{
    if(element.classList.contains("active")){
        moveBubble(element);
    }
})
}
moveToActive();

navElem.forEach(element => {
    element.addEventListener("mouseenter", (event)=>{
        moveBubble(event.currentTarget);
    })
    element.addEventListener("click", (event)=>{
        navElem.forEach(link =>{
            if(link.classList.contains("active")){
                link.classList.remove("active");
            }
        })
        element.classList.add("active");
    })
});
navbar.addEventListener("mouseleave", ()=>{
    moveToActive();
})
