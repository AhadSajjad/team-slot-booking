const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfb_hGr8f4lk9FFDgYMhNSxj6RzNTw_ycVDF_lRweIa928pirgUS_yiUky3JDu9LoYBA/exec'; // Replace with your Apps Script web app URL

function handleSlotChange(event) {
    const selectedSlot = event.target.value;
    const team = event.target.getAttribute('data-team');
    
    if (selectedSlot && !bookedSlots.includes(selectedSlot)) {
        bookedSlots.push(selectedSlot);
        addToBookedTable(team, selectedSlot);

        // Send booking data to Google Apps Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: new URLSearchParams({
                'team': team,
                'slot': selectedSlot
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes("successful")) {
                alert('Booking successful!');
            } else {
                alert('Error: ' + data);
            }
        })
        .catch(error => alert('Failed to connect to database.'));
    } else if (selectedSlot) {
        alert('This slot has already been taken.');
        event.target.value = ''; // Reset selection
    }
}

function fetchBookedSlots() {
    fetch(SCRIPT_URL + '/getBookedSlots')
        .then(response => response.json())
        .then(data => {
            data.forEach(booking => {
                addToBookedTable(booking.team, booking.slot);
                bookedSlots.push(booking.slot); // Mark the slot as booked
            });
        })
        .catch(error => console.log('Error fetching booked slots:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    createTeamSlotOptions();
    fetchBookedSlots(); // Populate booked slots when page loads
    document.getElementById('teams-list').addEventListener('change', handleSlotChange);
});
