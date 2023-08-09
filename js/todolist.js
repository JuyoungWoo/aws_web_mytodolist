const sidebarToggleButton = document.querySelector('.sidebar-toggle-button');
const container = document.querySelector('.container');

toggleBtnOnclickHandle = () => {
    container.classList.toggle('sidebar-open'); 
    
    if(container.classList.contains("sidebar-open")){
        sidebarToggleButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`;
      } else {
        sidebarToggleButton.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
      }
}

sidebarToggleButton.addEventListener('mouseover', function(){
    if(!container.classList.contains("sidebar-open")){
        sidebarToggleButton.innerHTML = `<i class="fa-solid fa-angles-right"></i> `;
    }
});
sidebarToggleButton.addEventListener('mouseout', function(){
    if(!container.classList.contains("sidebar-open")){
            sidebarToggleButton.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
});