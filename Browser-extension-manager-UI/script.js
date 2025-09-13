const extensionsList=document.querySelector('.extensions-list');
const filtersContainer=document.querySelector('.filters');
const themeToogle=document.querySelector('.theme');
const themeIcon=document.querySelector('.theme img');
const body=document.querySelector('body');
const logo=document.querySelector('.logo img');


let extensionsData=[];
let currentFilter='All';


// --- Theme Management ---

const applyTheme=(theme)=>{
    if(theme==="light"){
        body.classList.add('light-theme');
        themeIcon.src="./assets/images/icon-moon.svg";
        logo.src="./assets/images/logo.svg"
    }else{
        body.classList.remove('light-theme');
        themeIcon.src="./assets/images/icon-sun.svg"
        logo.src="./assets/images/logo-dark.svg"
    }
}

const initialTheme=localStorage.getItem('theme')||'dark';
applyTheme(initialTheme);

themeToogle.addEventListener('click',()=>{
        const currentTheme=localStorage.getItem('theme')||"dark";
        const newTheme=(currentTheme==="light")?"dark":"light";
        localStorage.setItem('theme',newTheme);
        applyTheme(newTheme);
});


// --- Renders cards ---
const renderExtensions=()=>{
    extensionsList.innerHTML='';

    const filteredData=extensionsData.filter((ext)=>{
        if(currentFilter=='Active')return ext.isActive;
        if(currentFilter=='Inactive') return !ext.isActive;
        return true;// for all extensions
    });

    if(filteredData.length==0){
        extensionsList.innerHTML = `<p class="message">No extensions found.</p>`;
      return;
    }

    filteredData.forEach((ext)=>{
        const card=document.createElement('div');
        card.className='extension-card';
        card.dataset.id=ext.id;
        card.innerHTML=` <div class="card-header">
            <div class="extension-icon">
              <img src="${ext.logo}" alt="${ext.name}" />
            </div>
            <div class="extension-details">
              <h3 class="extension-name">${ext.name}</h3>
              <p class="extension-description">
               ${ext.description}
              </p>
            </div>
          </div>
          <div class="card-footer">
            <button class="remove-btn">Remove</button>
            <div class="toggle-switch ${ext.isActive?'active':''}">
                <div class="slider"></div>
            </div>
          </div>
          `;
          extensionsList.appendChild(card);
});
};


// --- filter the extensions ---

filtersContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('filter')){
        filtersContainer.querySelector('.active-filter').classList.remove('active-filter');
        e.target.classList.add('active-filter');
        currentFilter=e.target.textContent;
        
        renderExtensions(currentFilter);// re-render
    }
});

extensionsList.addEventListener('click',(e)=>{
    const card=e.target.closest('.extension-card');
    if(!card)return;

    const extensionId=parseInt(card.dataset.id,10);
    if(e.target.classList.contains('toggle-switch') || e.target.classList.contains('slider')){
       const extension=extensionsData.find(ext=>ext.id===extensionId);
       if(extension){
          extension.isActive=!extension.isActive;
       }
        renderExtensions();
    }

    if(e.target.classList.contains('remove-btn')){
        extensionsData=extensionsData.filter((ext)=>ext.id!==extensionId);

        renderExtensions();
    }
});

const initialize=async()=>{
    try{
        const response=await fetch('data.json');
        if(!response.ok){
            throw new Error(`HTTP error! status:${response.status}`);
        }
        extensionsData=await response.json();
        renderExtensions();
    }catch(error){
        console.error('Could not fetch extension data',error);
        console.log('hii');
         extensionsList.innerHTML = `<p class="error-message">Error loading extensions. Please try again later.</p>`
    }
}

initialize();
