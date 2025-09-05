const form=document.getElementById("emailForm");
const emailInput=document.getElementById("emailInput");
const errorIcon=document.querySelector(".error-icon");
const errorMessage=document.querySelector(".error-message");

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const email=emailInput.value.trim();
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    emailInput.classList.add('error');
    errorIcon.style.display="block";
    errorMessage.style.display="block";
  }else{
    emailInput.classList.remove("error");
    errorIcon.style.display = "none";
    errorMessage.style.display = "none";
    alert("Thanks! You'll be notified at " + email);
  }
});