// let dark= false;
let root = document.documentElement;
let toggle_mode = document.querySelector('.ri-moon-fill');
// let moon = document.querySelector('.ri-moon-fill');
toggle_mode.addEventListener('click', ()=>{
    root.classList.toggle('dark');
    if(toggle_mode.classList.contains('ri-moon-fill')){
        toggle_mode.classList.replace('ri-moon-fill', 'ri-sun-fill');
    } else{
        toggle_mode.classList.replace('ri-sun-fill', 'ri-moon-fill');
    }
});



function clock(){
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let PM_AM = hours >= 12 ? 'PM' : 'AM';

    if(hours > 12){
        hours -= 12;
    }

    console.log(hours, minutes, seconds , PM_AM);
}
// setInterval(clock, 1000);
clock();

