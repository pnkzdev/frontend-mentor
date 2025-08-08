const faqs=document.querySelector('.faqs');
faqs.addEventListener('click',(element)=>{
    const clicked=element.target;
    if(clicked.classList.contains('icon-plus')|| clicked.closest('.question-faq')){
        const questionFaq=clicked.closest(".question-faq");
        console.log(questionFaq);
        const answerFaq=questionFaq.nextElementSibling;
        if(answerFaq.classList.toggle("show-answer")){
           clicked.src='assets/images/icon-minus.svg';
        }else{
           clicked.src='assets/images/icon-plus.svg';
        }
    }
});