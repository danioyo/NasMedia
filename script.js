const navbar = document.querySelector(".navbar");
const navElem = document.querySelectorAll(".navbar a");
const bubble = document.querySelector('.bubble');
const movieImage = document.querySelector(".movieImage");
const movieCard = document.querySelector(".movieCard");
const profile = document.querySelector(".user-avatar");
const profileArrow = document.querySelector(".user-avatar i")
const profileWindowRows = document.querySelector(".profile-window-rows");
const areYouSurePopUp = document.querySelector(".areYouSurePopUp");
const movieListContainer = document.querySelector(".movieListContainer");

const API_KEY = 'd1000b8f67ff7bd3a46a6fb4870e422c';

async function searchMovie(movieName, fileName) {
    const response =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`)
    const data = await response.json();
    console.log(data);
    const card =document.createElement("div");
    const posterWrapper = document.createElement("div");
    const Name = document.createElement("div");
    const movieDate = document.createElement("div");
    const poster = document.createElement("img");
    const movieInfo = document.createElement("span");


    poster.src=`https://image.tmdb.org/t/p/w300${data.results[0].poster_path}`


    movieInfo.classList.add("movieInfo");
    movieInfo.innerHTML = `<i class="fa-solid fa-info"></i>`;
    posterWrapper.classList.add("posterWrapper");
    Name.classList.add("movieName");
    poster.classList.add("movieImage");
    movieDate.classList.add("movieDate");
    Name.textContent = data.results[0].original_title;
    movieDate.textContent = data.results[0].release_date;

    poster.dataset.fileName = fileName;



    card.classList.add("movieCard");
    movieListContainer.appendChild(card);


    card.appendChild(posterWrapper);
    posterWrapper.append(poster, movieInfo);
    card.append(Name, movieDate);
}
async function getMovie() {
    const response = await fetch(`http://localhost:3000/api/nas-movies`);
    const data = await response.json();
    console.log(data);
    data.movies.forEach(movieFile =>{
        const theNameArray = movieFile.split(".");
        theNameArray.pop();
        const theName = theNameArray.join(" ");
        searchMovie(`${theName}`, movieFile);
        
    })

}

movieListContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("movieImage")){
        const fileName = event.target.dataset.fileName;
        window.location.href=`./video-player-dir/player.html?file=${encodeURIComponent(fileName)}`;
    }

})

getMovie();

movieListContainer.addEventListener("mouseover", (event)=>{
    const movieInfo = event.target.closest(".posterWrapper").querySelector(".movieInfo");
    if(event.target.closest(".posterWrapper")){
        movieInfo.classList.add("active");
    }
})
movieListContainer.addEventListener("mouseout", (event)=>{
    const poster = event.target.closest(".posterWrapper");
    if(event.target.closest(".posterWrapper")){
        const movieInfo = poster.querySelector(".movieInfo");
        movieInfo.classList.remove("active");
    }
})

const movieInfoWrapper = document.querySelector(".movieInfoWrapper");
const closeButton = document.querySelector("#closeButton");

movieListContainer.addEventListener("click", async(event) => {
     const movieInfoBtn = event.target.closest(".movieInfo");
     if (movieInfoBtn) {
        movieInfoWrapper.classList.add("active");
        const trailerInfoOverlay = document.querySelector(".trailerInfoOverlay");
        const trailerTitle = document.querySelector(".trailerTitle");
        const card = movieInfoBtn.closest(".movieCard");
        const movieImage = card.querySelector(".movieImage");
        const rawFileName = movieImage.getAttribute("data-file-name");
        trailerTitle.textContent = rawFileName.split(".").slice(0,-1).join(" ");

        const response_0 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(rawFileName.split(".").slice(0,-1).join(" "))}`);
        const data_0 = await response_0.json();

        const description = data_0.results[0].overview;
        const overview = movieInfoWrapper.querySelector(".overview");
        overview.textContent = description;
        const movieId = data_0.results[0].id;
        const releaseYear = movieInfoWrapper.querySelector(".releaseYear");
        releaseYear.textContent = data_0.results[0].release_date.slice(0, 4);

        const data_1 = await(await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,release_dates`)).json();
        console.log(data_1);

        const duration = data_1.runtime;
        const hours = Math.floor(duration/60);
        const minutes = duration % 60;
        const durationElem = movieInfoWrapper.querySelector(".duration");
        durationElem.textContent = `${hours}h ${minutes}m`

        const genres = data_1.genres;
        const genresElement = document.getElementById("genres");
        genresElement.textContent = genres.map(g => g.name ).slice(0,3).join(", ");

        const castElement = document.getElementById("cast");
        const cast = data_1.credits.cast;
        castElement.textContent = cast.map(c => c.name).slice(0,4).join(", ");

        const trailer = data_1.videos.results.find(v => v.site === "YouTube" && v.type === "Trailer")
        || data_1.videos.results.find(v => v.site === "YouTube" && v.type === "Teaser")
        ||data_1.videos.results[0];
        const container = document.getElementById("trailer-container");
        if (trailer && trailer.key) {
        const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;
        
        container.innerHTML = `
            <iframe 
            width="560" 
            height="315" 
            src="${embedUrl}" 
            title="${trailer.name || 'Trailer'}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>
        `;
        } else {
        container.innerHTML = `<p>Nu a fost găsit niciun trailer disponibil.</p>`;
        }





        
        const ageRated = data_1.release_dates?.results.find(a=> a.iso_3166_1 =="US")?.release_dates[0]?.certification 
        ||  data_1.release_dates?.results.find(a=> a.iso_3166_1 =="CH")?.release_dates[0]?.certification
        ||  data_1.release_dates?.results.find(a=> a.iso_3166_1 =="RO")?.release_dates[0]?.certification;
        const ageRatedElement = document.querySelector("#ageRated");
        ageRatedElement.textContent = ageRated;



    }  
    

    
});
movieInfoWrapper.addEventListener("click", (event)=>{
    if(event.target.closest("#closeButton")){
        movieInfoWrapper.classList.remove("active");
    }

})

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


