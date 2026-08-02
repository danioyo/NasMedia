const rem=document.querySelector(".rememberText");
const check=document.querySelector(".rememberContainer input")
const register = document.querySelector(".register");
const user = document.querySelector(".username");
const pass = document.querySelector("input.password");
const eyeContainer = document.querySelector(".eyeContainer");
const invalidPassword = document.querySelector(".invalidPassword");
const invalidUsername = document.querySelector(".invalidUsername");
const invalidID =document.querySelector(".invalidID");
const inputBox = document.querySelector(".inputBox");
const passwordBox = document.querySelector(".passwordBox");
const idBox = document.querySelector(".idBox");
const ID = document.querySelector(".id");

rem.addEventListener("click", ()=>{
    check.checked = !check.checked;
})
rem.addEventListener("dblclick",()=>{
    rem.style.userSelect="none";
})
eyeContainer.addEventListener("click", (event)=>{
    const icon = eyeContainer.querySelector("i");
    if(icon.classList.contains("fa-eye-slash")){
        icon.classList.replace("fa-eye-slash", "fa-eye");
        pass.type = "text"
    }
    else if(icon.classList.contains("fa-eye")){
        icon.classList.replace("fa-eye", "fa-eye-slash");
        pass.type="password";
    }

})
register.addEventListener("click", async ()=>{
    invalidID.innerHTML="";
    invalidUsername.innerHTML="";
    inputBox.style.borderColor="rgba(255, 255, 255, 0.3)"
    idBox.style.borderColor="rgba(255, 255, 255, 0.3)"
    passwordBox.style.borderColor="rgba(255, 255, 255, 0.3)"

    const id = ID.value;
    const password = pass.value;
    const username = user.value;
    const response = await fetch("http://localhost:3000/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, username, id})
    })
    const data = await response.json();
    console.log(data);
    if(!data.success){
        if(data.message==="empty fields"){
            invalidID.innerHTML=`
            <span>!</span>empty fields`
            if(data.missing.includes("u")){
                inputBox.style.borderColor="rgb(153, 0, 0)"
            };
            if(data.missing.includes("i")){
                idBox.style.borderColor="rgb(153, 0, 0)"
            }
            if(data.missing.includes("p")){
                passwordBox.style.borderColor="rgb(153, 0, 0)"
            };
        }
        else if(data.message==="incorrect id"){
            invalidID.innerHTML=`
            <span>!</span>incorrect id`
            idBox.style.borderColor="rgb(153, 0, 0)"

        }
        else if(data.message==="unavailable username"){
            invalidUsername.innerHTML=`
            <span>!</span>unavailable username`
            inputBox.style.borderColor="rgb(153, 0, 0)"
        }
        else if(data.message==="the username is too long"){
            invalidUsername.innerHTML=`
            <span>!</span>the username is too long`
            inputBox.style.borderColor="rgb(153, 0, 0)"
        }
    }
    else{
        console.log("bravo");
    }
})
