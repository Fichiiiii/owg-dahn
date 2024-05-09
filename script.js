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

async function fetchInbox() {
    const auth = prompt("Gib deinen Authentifikationsschlüssel ein")
    const entriesResponse = await fetch(`https://owg-dahn.com/api/getMessages?auth=${auth}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        } 
    }).then(r => { return r })

    if (!entriesResponse.ok) {
        return console.warn(entriesResponse.status)
    }

    const entries = (await entriesResponse.json()).entries

    function loadEntries() {
        if (document.readyState == "loading") return loadEntries()

        document.getElementById("fail").remove()
        entries.forEach(entry => {
            const post = document.createElement("div")
            post.classList.add("entry")
    
            const meta = document.createElement("div")
            const date = document.createElement("p")
            date.style.margin = "5px"
            date.innerText = `Erstellt am: ${entry.timestamp}`
            meta.append(date)
    
            const content = document.createElement("div")
            const message = document.createElement("p")
            content.style.textAlign = "left"
            content.style.marginTop = "-15px"
            message.innerText = entry.message
            content.append(message)
    
            post.append(meta)
            post.append(content)
    
            document.getElementById("main").append(post)
        })
    }   
    
    loadEntries()
}