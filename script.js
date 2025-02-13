function bookSlot() {
    const team = document.getElementById("team").value;
    const slot = document.getElementById("slot").value;

    if (team === "") {
        alert("Please enter a team name.");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbxtbeObY_D4QX84-mIUiUozz5FLrP6YxwIsZZyzalyzs91jApaBCyddE3tnjs9GvIJRaw/exec", {
        method: "POST",
        body: JSON.stringify({ team, slot }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}
