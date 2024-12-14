(async () => {
    const menuSection = document.querySelector('#menu')
    const eventsSection = document.querySelector('#events')

    const { pathname } = window.location
    const [, searchType, id ] = pathname.split('/')

    console.log(searchType, id)

    if(searchType === 'events'){
        const url = `/api/v1/events/${id}`

        try{ 
            const eventCollection = await fetch(`${url}`)
            const {name, description, date, time, location, src} = await eventCollection.json()
            
                let eventsH2 = document.createElement('h2')
                let eventsDescription = document.createElement('p')
                let eventsDate = document.createElement('li')
                let eventsTime = document.createElement('li')
                let eventsLocation = document.createElement('li')
                let eventsImg = document.createElement('img')
                let eventsUl = document.createElement('ul')
                let eventsDiv = document.createElement('div')

                eventsImg.width = 552
                eventsDate.textContent = `Date: ${date}`
                eventsTime.textContent = `Time: ${time}.`
                eventsLocation.textContent = `Location: ${location}`
                eventsImg.src = src

                eventsH2.textContent = name
                eventsDescription.textContent = description
                eventsDiv.append(eventsH2, eventsDescription)
                eventsUl.append(eventsDate, eventsTime, eventsLocation)
                eventsSection.append(eventsDiv, eventsUl, eventsImg)
            }
            catch(e){
            console.log(e)
            }
    }

    else if(searchType === 'admin-menu.html'){
        const url = '/api/v1/menu/add'

        const nameInput = document.querySelector('input[id="name"]')
        const descriptionInput = document.querySelector('input[id="description"]')
        const srcInput = document.querySelector('input[id="src"]')
        const priceInput = document.querySelector('input[id="price"]')
        const codeInput = document.querySelector('input[id="code"]')

        const button = document.querySelector('button[id="add"]')
        const confirmation = document.querySelector('#confirmation')

        button.addEventListener('click', async () => {

        const input = {
            name : nameInput.value,
            type : "menu",
            description : descriptionInput.value,
            src : srcInput.value,
            price : priceInput.value,
            code : codeInput.value
        }
        if(input.name != '', input.description != '', input.src != '', input.price != '', input.code.length == 3){
        const result = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(input)})
        
        confirmation.textContent = `${input.name} inserted!`
        }
        else{
            confirmation.textContent = "Error: You must input a name, description, image source, price and a 3 character code."
            console.log(input.name, input.description, input.code)
        }
        })
    }

    else if(searchType === 'admin-events.html'){
        const url = '/api/v1/events/add'

        const nameInput = document.querySelector('input[id="name"]')
        const descriptionInput = document.querySelector('input[id="description"]')
        const srcInput = document.querySelector('input[id="src"]')
        const dateInput = document.querySelector('input[id="date"]')
        const timeInput = document.querySelector('input[id="time"]')
        const locationInput = document.querySelector('input[id="location"]')
        const codeInput = document.querySelector('input[id="code"]')

        const button = document.querySelector('button[id="add"]')
        const confirmation = document.querySelector('#confirmation')

        button.addEventListener('click', async () => {

        const input = {
            name : nameInput.value,
            type : "event",
            description : descriptionInput.value,
            code : codeInput.value,
            date : dateInput.value,
            location : locationInput.value,
            time : timeInput.value,
            src : srcInput.value
            
        }
        if(input.name != '', input.description != '', input.src != '', input.date != '', input.time != '', input.location != '', input.code.length == 3){
        const result = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(input)})
        
        confirmation.textContent = `${input.name} inserted!`
        }
        else{
            confirmation.textContent = "Error: You must input a name, description, image source, date, time, location and a 3 character code."
            console.log(input.name, input.description, input.code)
        }
        })
    }

    else {

        const urlMenu = '/api/v1/menu'
        const urlEvents = '/api/v1/events'

        try{
        const menuCollection = await fetch(`${urlMenu}`)
        const menuArray = await menuCollection.json()

        menuArray.forEach((item) =>{
            let menuH2 = document.createElement('h2')
            let menuPrice = document.createElement('p')
            let menuP = document.createElement('p')
            let menuImg = document.createElement('img')
            let menuDiv = document.createElement('div')

            menuImg.src = item.src
            menuImg.width = 300
            menuH2.textContent = item.name
            menuPrice.textContent = item.price
            menuP.textContent = item.description
            menuDiv.append(menuH2, menuPrice, menuP, menuImg)
            menuSection.append(menuDiv)
        })
        }
        catch(e){
            console.log(e)
        }

        try{
        const eventCollection = await fetch(`${urlEvents}`)
        const eventArray = await eventCollection.json()
        
        eventArray.forEach((item) =>{
            let eventsH2 = document.createElement('h2')
            let eventsA = document.createElement('a')
            let eventsDate = document.createElement('p')
            let eventsDiv = document.createElement('div')
            let code = item.code

            eventsDate.textContent = `${item.date} at ${item.time}`


            eventsA.href = `http://localhost:3010/events/${code}`
            eventsH2.textContent = item.name
            eventsA.append(eventsH2)
            eventsDiv.append(eventsA, eventsDate)
            eventsSection.append(eventsDiv)
        })
        }
        catch(e){
        console.log(e)
        }
    }
})()