const navbar = document.querySelector(".navbar");
const navElem = document.querySelectorAll(".navbar a");
const bubble = document.querySelector('.bubble');

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