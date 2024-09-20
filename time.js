let hrs = document.getElementById("hrs");
    let mins = document.getElementById("mins");
    let secs = document.getElementById("secs");
    let overtimeLabel = document.getElementById("overtimeLabel");

    // Get the Arrival Time from an HTML time input
    let arr_time = document.getElementById("time");

    function calculateEndTime(arr_hour, arr_minutes) {
        let end_hour = arr_hour + 8;
        let end_minutes = arr_minutes + 18;

        // Handle overflow of minutes
        if (end_minutes >= 60) {
            end_hour += Math.floor(end_minutes / 60); // Add extra hour if minutes overflow
            end_minutes = end_minutes % 60;           // Set minutes to the remainder
        }

        // Handle overflow of hours (24-hour format)
        if (end_hour >= 24) {
            end_hour = end_hour % 24;  // Wrap around the hours if it goes over 24
        }

        return { end_hour, end_minutes };
    }

    setInterval(() => {
        let currentTime = new Date();

        if (arr_time.value) {  // Ensure that time input has a value
            let [arr_hour, arr_minutes] = arr_time.value.split(":").map(Number);  // Split the time into hours and minutes
            let { end_hour, end_minutes } = calculateEndTime(arr_hour, arr_minutes);

            // Get the current hours, minutes, and seconds
            let currentHour = currentTime.getHours();
            let currentMinute = currentTime.getMinutes();
            let currentSecond = currentTime.getSeconds();

            // Calculate remaining time until end time (8:18 hours after arrival time)
            let remainingHour = end_hour - currentHour;
            let remainingMinute = end_minutes - currentMinute;
            let remainingSecond = 60 - currentSecond;

            // Handle negative values (overflow)
            if (currentSecond === 60) {
                remainingSecond = 59;
            }
            if (remainingMinute < 0) {
                remainingMinute += 60;
            }
            if (remainingHour < 0) {
                remainingHour += 24;
            }

            // If time has passed the end time, calculate overtime
            if (currentHour > end_hour || (currentHour === end_hour && currentMinute > end_minutes)) {
                let overtimeHour = currentHour - end_hour;
                let overtimeMinute = currentMinute - end_minutes;
                let overtimeSecond = currentSecond;

                // Handle overtime minute and second overflow

                if (overtimeMinute < 0){
                    overtimeMinute += 60
                }

                // Display overtime label and the time
                overtimeLabel.style.display = "inline";  // Show the "Overtime" label
                hrs.innerHTML = overtimeHour.toString().padStart(2, "0");
                mins.innerHTML = overtimeMinute.toString().padStart(2, "0");
                secs.innerHTML = overtimeSecond.toString().padStart(2, "0");

            } else {
                // Hide overtime label and display normal remaining time
                overtimeLabel.style.display = "none";  // Hide the "Overtime" label
                hrs.innerHTML = remainingHour.toString().padStart(2, "0");
                mins.innerHTML = remainingMinute.toString().padStart(2, "0");
                secs.innerHTML = remainingSecond.toString().padStart(2, "0");
            }
        }
    }, 1000);