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


let analog_hours = document.querySelector('.col-hours');
let analog_minutes = document.querySelector('.col-minutes');
let analog_seconds = document.querySelector('.col-seconds');

// Digital Clock Section

let digital_hours = document.getElementById('hours');
let digital_minutes = document.getElementById('minutes');
let digital_seconds = document.getElementById('seconds');
let digital_am_pm = document.getElementById('am-pm');

setInterval(()=>{

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    
    let hours_rotation = 30*hours + minutes/2;
    let minutes_rotation = 6*minutes + seconds/10;
    let seconds_rotation = 6*seconds;

    if (seconds === 0 ) {
    analog_seconds.style.transition = 'none';
    } else {
        analog_seconds.style.transition = 'transform .5s linear';
    }
    if( minutes === 0 && seconds === 0&& hours % 12 !== 0){
        analog_minutes.style.transition = 'none';
    } else {
        analog_minutes.style.transition = 'transform .5s linear';
    }
    if( hours === 0 && minutes === 0 && seconds === 0){
        analog_hours.style.transition = 'none';
    } else {
        analog_hours.style.transition = 'transform .5s linear';
    }

    analog_hours.style.transform = `rotate(${270+hours_rotation}deg)`;
    analog_minutes.style.transform = `rotate(${270+minutes_rotation}deg)`;
    analog_seconds.style.transform = `rotate(${270+seconds_rotation}deg)`;

    if(hours > 12){
        hours -= 12;
        digital_am_pm.textContent = 'PM';
    }
    else{
        digital_am_pm.textContent = 'AM';
    }
    if(hours == 0){
        hours = 12;

    }

    if(hours < 10){
        hours = '0' + hours;
    }
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    digital_hours.textContent = hours;
    digital_minutes.textContent = minutes;
    digital_seconds.textContent = seconds;
    digital_am_pm.textContent = digital_am_pm.textContent;

    


}, 500);



// alarm Section
let del = document.querySelector('.delete-alarm');
let alarm_container = document.querySelector('.alarm-container');
let alarms_list = document.querySelector('.alarms-list');

del.addEventListener('click', ()=>{
    alarms_list.innerHTML = '';
});
let add_btn = document.querySelector('.add-alarm');
let popup = document.querySelector('.popup');
let close_popup = document.querySelector('.close-btn');
add_btn.addEventListener('click', ()=>{
    popup.classList.add('show');
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let am_pm = 'AM';
    if(hours >= 12){
        am_pm = 'PM';
        if(hours > 12){
            hours -= 12;
        }
    }
    document.getElementById('alarm-hours').value = hours<10 ? "0"+hours:hours;
    document.getElementById('alarm-minutes').value = minutes<10 ? "0"+minutes:minutes;
    document.getElementById('alarm-am-pm').value = am_pm;
});
close_popup.addEventListener('click', ()=>{
    popup.classList.remove('show');
});
let set_alarm_btn = document.querySelector('.set-btn');
set_alarm_btn.addEventListener('click', ()=>{
    let alarm_hours = document.getElementById('alarm-hours').value;
    let alarm_minutes = document.getElementById('alarm-minutes').value;
    let alarm_am_pm = document.getElementById('alarm-am-pm').value;
    let alarm_time = `${alarm_hours<10 ? "0"+alarm_hours:alarm_hours}:${alarm_minutes} ${alarm_am_pm}`;
    if(alarm_hours=='' || alarm_minutes=='' || alarm_am_pm==''){
        return;
    }
    let alarm_div = document.createElement('div');
    alarm_div.classList.add('alarm');
    alarm_div.innerHTML = `
        <div class="alarm-container">
            <div class="alarm-time">  <p>${alarm_time}</p></div>

            <div class="alarm-btns">
                <div class="area">
                    <div class="circle"></div>
                </div>
                <span class="delete-alarm-btn"><i class="fa-solid fa-trash"></i></span>
                <span class="edit-alarm-btn"><i class="fa-solid fa-pen-to-square"></i></span>
            </div>
        </div>
        
        <div class="alarm-date-toggle">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
        </div>

    `;
    alarms_list.prepend(alarm_div);
    popup.classList.remove('show');
    let circle = alarm_div.querySelector('.circle');
    let area = alarm_div.querySelector('.area');
    area.addEventListener('click', ()=>{
        circle.classList.toggle('actived');
        area.classList.toggle('active');
    });




    let delete_alarm_btn = alarm_div.querySelector('.delete-alarm-btn');
    delete_alarm_btn.addEventListener('click', ()=>{
        alarms_list.removeChild(alarm_div);
    });
    let edit_alarm_btn = alarm_div.querySelector('.edit-alarm-btn');
    edit_alarm_btn.addEventListener('click', ()=>{
        popup.classList.add('show');
        let time = alarm_time.split(/[: ]/);

        document.getElementById('alarm-hours').value = time[0];
        document.getElementById('alarm-minutes').value = time[1];
        document.getElementById('alarm-am-pm').value = time[2];
        set_alarm_btn.addEventListener('click', ()=>{
            alarms_list.removeChild(alarm_div);
        });
        
    });

    let days = alarm_div.querySelectorAll('.alarm-date-toggle span');
    days.forEach(day=>{
        day.addEventListener('click', ()=>{
            day.classList.toggle('active');
        });
    });
    

});