const navbar = document.querySelector(".navbar");
const navElem = document.querySelectorAll(".navbar a");
const bubble = document.querySelector('.bubble');
const movieImage = document.querySelector(".movieImage");
const movieName = document.querySelector(".movieName");
const profile = document.querySelector(".user-avatar");
const profileArrow = document.querySelector(".user-avatar i")
const profileWindow = document.querySelector(".profile-window");

profile.addEventListener("click", ()=>{
    profileArrow.classList.toggle("fa-chevron-down");
    profileArrow.classList.toggle("fa-chevron-up");
    profileWindow.classList.toggle("active");
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
