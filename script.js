const navbar = document.querySelector(".navbar");
const navElem = document.querySelectorAll(".navbar a");
const bubble = document.querySelector('.bubble');
const movieImage = document.querySelector(".movieImage");
const movieName = document.querySelector(".movieName");
const profile = document.querySelector(".user-avatar");
const profileArrow = document.querySelector(".user-avatar i")
const profileWindowRows = document.querySelector(".profile-window-rows");
const areYouSurePopUp = document.querySelector(".areYouSurePopUp");




areYouSurePopUp.addEventListener("click",(event)=>{
    if(event.target.id=="xButtonPopUp"){
        areYouSurePopUp.style.visibility = "hidden";
        areYouSurePopUp.style.opacity = "0";
    }
    else if(event.target.id=="yesButtonPopUp"){
        window.location.replace("login-register form/login.html");
    }
})
profileWindowRows.addEventListener("click", (event)=>{
    if(event.target.closest(".disconnectRow")){
        areYouSurePopUp.style.visibility = "visible";
        areYouSurePopUp.style.opacity = "1";
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
        areYouSurePopUp.style.visibility = "hidden";
        areYouSurePopUp.style.opacity = "0";
    }
    profileWindowRows.classList.toggle("active");
})
movieImage.addEventListener("mouseenter",()=>{
    movieName.style.color = "#4da2e2";
    
})
movieImage.addEventListener("mouseleave",()=>{
    movieName.style.color = "white";
    
    
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
