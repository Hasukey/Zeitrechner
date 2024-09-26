let hrs = document.getElementById("hrs");
let mins = document.getElementById("mins");
let secs = document.getElementById("secs");
let overtimeLabel = document.getElementById("overtimeLabel");
let arr_time = document.getElementById("time");

function calculateEndTime(arr_hour, arr_minutes) {
    let end_hour = arr_hour + 8;
    let end_minutes = arr_minutes + 18;

    if (end_minutes >= 60) {
        end_hour += Math.floor(end_minutes / 60);
        end_minutes = end_minutes % 60;
    }

    if (end_hour >= 24) {
        end_hour = end_hour % 24;
    }

    return { end_hour, end_minutes };
}

function updateTimeDisplay(hours, minutes, seconds, isOvertime) {
    hrs.innerHTML = hours.toString().padStart(2, "0");
    mins.innerHTML = minutes.toString().padStart(2, "0");
    secs.innerHTML = seconds.toString().padStart(2, "0");
    overtimeLabel.style.display = isOvertime ? "inline" : "none";
}

setInterval(() => {
    let currentTime = new Date();

    if (arr_time.value) {
        let [arr_hour, arr_minutes] = arr_time.value.split(":").map(Number);
        let { end_hour, end_minutes } = calculateEndTime(arr_hour, arr_minutes);

        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();
        let currentSecond = currentTime.getSeconds();

        let remainingHour = end_hour - currentHour;
        let remainingMinute = end_minutes - currentMinute;
        let remainingSecond = 59 - currentSecond;

        if (remainingSecond < 0) {
            remainingSecond += 60;
            remainingMinute -= 1;
        }

        if (remainingMinute < 0) {
            remainingMinute += 60;
            remainingHour -= 1;
        }

        // Handle negative hours correctly
        if (remainingHour < 0) {
            remainingHour += 24;
        }

        // Check if in overtime
        if (currentHour > end_hour || (currentHour === end_hour && currentMinute > end_minutes)) {
            let overtimeHour = currentHour - end_hour;
            let overtimeMinute = currentMinute - end_minutes;
            let overtimeSecond = currentSecond;

            if (overtimeMinute < 0) {
                overtimeMinute += 60;
                overtimeHour -= 1;
            }

            // Adjust for hours going negative
            if (overtimeHour < 0) {
                overtimeHour = 0;
            }

            updateTimeDisplay(overtimeHour, overtimeMinute, overtimeSecond, true);
        } else {
            updateTimeDisplay(remainingHour, remainingMinute, remainingSecond, false);
        }
    }
}, 500);
