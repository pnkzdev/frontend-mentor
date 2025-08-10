const ratingCard=document.querySelector(".rating-components");
const thankYouCard=document.querySelector(".thank-you-card");
const ratings=document.querySelectorAll(".rating");
const submitBtn=document.querySelector("button");
const selectedRatingText=document.querySelector(".selected-rating");

let selectedRating=null;
submitBtn.disabled=true;

ratings.forEach(rating=>{
 rating.addEventListener("click",()=>{
   
    //clear styles form all ratings first
    ratings.forEach(r => r.classList.remove("active"));

    //apply styles to current active element
    rating.classList.add("active");
    
    selectedRating=rating.innerHTML;
    submitBtn.disabled=false;
});

});

submitBtn.addEventListener("click",()=>{
   selectedRatingText.innerHTML=`You selected ${selectedRating} out of 5`;
    ratingCard.style.display="none";
    thankYouCard.style.display="block";
})
