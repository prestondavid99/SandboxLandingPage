signUpButton = document.getElementsByClassName("button")[0];
signUpForm = document.getElementsByClassName("form")[0];

signUpForm.style.display = "none";

signUpButton.addEventListener("click", () => {
    if (signUpForm) {
        if (signUpForm.style.display == "none")
        {
            signUpForm.style.display = "block";
        }
        else 
        {
            signUpForm.style.display = "none";
        }
        
    }
})