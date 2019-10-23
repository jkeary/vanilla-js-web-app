const app = document.getElementById('root')

const title = document.createElement('h1')
title.setAttribute('class', 'title')
title.textContent = 'Here are some dad jokes'

// Searching for jokes by term
const search = document.createElement('div')
search.setAttribute('class', 'search')

const searchInput = document.createElement("input")
searchInput.setAttribute('class', 'term')
searchInput.placeholder = 'filter jokes on terms'
searchInput.setAttribute("type", "text")

const searchButton = document.createElement("button")
searchButton.setAttribute('class', 'button')
searchButton.textContent = 'search'
searchButton.onclick = () => {
    removeCurrentJokes()
    request(`?term=${searchInput.value}`)
}

// Removing current list of jokes
const removeCurrentJokes = () => {
    var ps = document.querySelectorAll('p')
    console.log(ps[0])
    ps[0].parentNode.removeChild(ps[0]) 

    var currentCards = document.getElementsByClassName('card');
    while (currentCards[0]) { 
      currentCards[0].parentNode.removeChild(currentCards[0]) 
    }
}

// Section for data sorting and manipulation
const containerHeader = document.createElement('div')
containerHeader.setAttribute('class', 'container-header')

const randomizeButton = document.createElement("button")
randomizeButton.setAttribute('class', 'button')
randomizeButton.textContent = 'radnomize'
randomizeButton.onclick = () => {
    randomizeCurrentJokes()
}

const randomizeCurrentJokes = () => {
    var currentCards = [...document.getElementsByClassName('card')]

    function shuffle(o) {
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
      return o
    }

    newCards = shuffle(currentCards)
    console.log(newCards)
}

const reverseButton = document.createElement("button")
reverseButton.setAttribute('class', 'button')
reverseButton.textContent = 'reverse'
reverseButton.onclick = () => {
    reverseCurrentJokes()
}

const reverseCurrentJokes = () => {
    var currentCards = [...document.getElementsByClassName('card')]
}

// Main container of the list of jokes
const container = document.createElement('div')
container.setAttribute('class', 'container')

// Add the nodes to the dom
app.appendChild(title)
app.appendChild(search)
search.appendChild(searchInput)
search.appendChild(searchButton)
app.appendChild(containerHeader)
containerHeader.appendChild(randomizeButton)
containerHeader.appendChild(reverseButton)
app.appendChild(container)

// Main request getting jokes
const request = async params => {
    const response = await fetch(`https://icanhazdadjoke.com/search${params}`, {headers: {
      'Accept': 'application/json',
    }});
    const data = await response.json();

    if (response.ok) {
        console.log(data)
        if (data.results.length === 0) {
            const noJokes = document.createElement('p')
            // noJokes.setAttribute('class', 'card')
            noJokes.textContent = `oh no, there are no dad jokes for ${searchInput.value}`
            container.appendChild(noJokes)
        } else {
            const jokeNum = document.createElement('p')
            jokeNum.textContent = `there are ${data.total_jokes} jokes total`
            containerHeader.appendChild(jokeNum)
            data.results.forEach(joke => {
                const card = document.createElement('div')
                card.setAttribute('class', 'card')
    
                const img = document.createElement('img')
                img.src = `https://icanhazdadjoke.com/j/${joke.id}.png`
    
                const p = document.createElement('p')
                joke.description = joke.joke.substring(0, 300)
                p.textContent = `${joke.joke}...`
    
                container.appendChild(card)
                card.appendChild(img)
                // card.appendChild(p)
            })
        }
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

// initialize the page by calling the request function to get all the jokes
request('');