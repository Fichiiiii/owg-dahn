function shiftnavbar() {
    const navTransform = document.getElementById("shiftnav").style.transform
    const isExpanded = navTransform == "translateX(0px)"

    document.getElementById("shiftnav").style.transform = `translateX(${isExpanded * -290}px)`
    document.getElementById("content").style.transform = `translateX(${isExpanded ? 0 : 1 * 290}px)`

    document.getElementById("owg-text").classList.toggle("notExpanded")
    document.getElementById("owg-text").classList.toggle("isExpanded")
}

function submitContactForm() {
    const input = document.getElementById("contactInput").value

    if (input.length < 25) return window.alert("Deine Nachricht muss mindestens 25 Zeichen lang sein")

    fetch('https://owg-dahn.com/api/addContactEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: input
    })
    .then((response) => response.json())
    .then(() => {
        document.getElementById("contactInput").value = null
        window.alert("Deine Nachricht wurde gesendet")
    })
    .catch(() => {
        window.alert("Ein Fehler ist aufgetreten\nVersuche es später nochmal")
    })
}
