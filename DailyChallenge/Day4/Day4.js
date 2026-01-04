// DailyChallenge/Day4/Day4.js
        function calculateDaysTillJan25() {
            const today = new Date();
            const currentYear = today.getFullYear();
            const jan25ThisYear = new Date(currentYear, 0, 25); // January is month 0

            let targetDate;
            if (today > jan25ThisYear) {
                targetDate = new Date(currentYear + 1, 0, 25);
            } else {
                targetDate = jan25ThisYear;
            }

            const timeDiff = targetDate - today;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            document.getElementById('daysCount').innerText = `There are ${daysDiff} days till January 25.`;
        }

        window.onload = calculateDaysTillJan25;