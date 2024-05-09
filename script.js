const statusMessages = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "405": "Method Not Allowed",
    "414": "URI Too Long",
    "500": "Internal Server Error",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported"
}

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
        document.getElementById("temp-entry").remove()

        const post = document.createElement("div")
        post.id = "fail"

        const heading = document.createElement("h2")
        heading.innerText = `${entriesResponse.status} - ${statusMessages[entriesResponse.status]}`
        post.append(heading)

        const content = document.createElement("p")
        content.innerText = "Beim Abrufen der Nachrichten ist ein Fehler aufgetreten."
        post.append(content)

        document.getElementById("main").append(post)

        return
    }

    const entries = (await entriesResponse.json()).entries

    if (!entries.length) {
        document.getElementById("temp-entry").remove()

        const post = document.createElement("div")
        post.id = "fail"

        const heading = document.createElement("h2")
        heading.innerText = `Keine Nachrichten`
        post.append(heading)

        const content = document.createElement("p")
        content.innerText = "Hier gibts derzeit nichts zu sehen"
        post.append(content)

        document.getElementById("main").append(post)

        return
    }

    function loadEntries() {
        if (document.readyState == "loading") return loadEntries()

        document.getElementById("temp-entry").remove()
        entries.forEach(entry => {
            const post = document.createElement("div")
            post.classList.add("entry")
    
            const time = new Date(entry.timestamp)
            const months = [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ]

            const meta = document.createElement("div")
            const date = document.createElement("p")
            date.style.margin = "5px"
            date.innerText = `Erstellt am: ${time.getDate()}. ${months[time.getMonth()]} ${time.getFullYear()}`
            meta.append(date)
    
            const content = document.createElement("div")
            const message = document.createElement("p")
            content.style.textAlign = "left"
            content.style.marginTop = "-15px"
            message.innerText = entry.message
            content.append(message)

            const menuContainer = document.createElement("div")
            menuContainer.id = "menuContainer"

            const infoContainer = document.createElement("div")
            infoContainer.classList.add("optionContainer")
            const infoIcon = document.createElement("img")
            infoIcon.classList.add("optionIcon")
            infoIcon.src = "https://img.icons8.com/?size=128&id=7695&format=png"
            infoContainer.append(infoIcon)

            const trashContainer = document.createElement("div")
            trashContainer.classList.add("optionContainer")
            const trashIcon = document.createElement("img")
            trashIcon.classList.add("optionIcon")
            trashIcon.src = "https://img.icons8.com/?size=128&id=11767&format=png"
            trashContainer.append(trashIcon)

            menuContainer.append(infoContainer)
            menuContainer.append(trashContainer)

            post.append(meta)
            post.append(content)
            post.append(menuContainer)
    
            document.getElementById("main").append(post)
        })
    }   

    loadEntries()
}