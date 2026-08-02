const rem=document.querySelector(".rememberText");
const check=document.querySelector(".rememberContainer input")
const login = document.querySelector(".login");
const user = document.querySelector(".username");
const pass = document.querySelector("input.password");
const eyeContainer = document.querySelector(".eyeContainer");
const invalidPassword = document.querySelector(".invalidPassword");
const invalidUsername = document.querySelector(".invalidUsername");
const inputBox = document.querySelector(".inputBox");
const passwordBox = document.querySelector(".passwordBox");

rem.addEventListener("click", ()=>{
    check.checked = !check.checked;
})
rem.addEventListener("dblclick",()=>{
    rem.style.userSelect="none";
})
login.addEventListener("click", async ()=>{
    const password = pass.value;
    const username = user.value;
    invalidPassword.innerHTML=``;
    invalidUsername.innerHTML=``;
    inputBox.style.borderColor = "rgba(255, 255, 255, 0.3)";
    passwordBox.style.borderColor="rgba(255, 255, 255, 0.3)";

    const reply = await fetch("http://localhost:3000/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,username
        })
    });
    const data = await reply.json();
    const message = data.message;
    if(!data.success){
        if(message==="username not found"){
            invalidUsername.innerHTML=`
            <span>!</span>invalid username
            `
            inputBox.style.borderColor = "rgb(153, 0, 0)";
        }
        else if(message==="wrong password"){
            invalidPassword.innerHTML=`
            <span>!</span>invalid password
            `
            passwordBox.style.borderColor="rgb(153, 0, 0)"
        }
        else if(message==="empty fields"){
            invalidPassword.innerHTML=`
            <span>!</span>empty fields
            `
            if(data.id===1){
                inputBox.style.borderColor = "rgb(153, 0, 0)";
            }
            else if(data.id===2){
                passwordBox.style.borderColor="rgb(153, 0, 0)"
            }
            else if(data.id === 3){
                inputBox.style.borderColor = "rgb(153, 0, 0)";
                passwordBox.style.borderColor="rgb(153, 0, 0)"
            }
        }
    }
    else{
        console.log("Logged in successfuly!")
    }
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
