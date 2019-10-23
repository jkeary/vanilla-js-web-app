const app = document.getElementById('root')

const title = document.createElement('h1')
title.setAttribute('class', 'title')
title.textContent = 'Here are some dad jokes'

const search = document.createElement('div')
search.setAttribute('class', 'search')

const input = document.createElement("input")
input.setAttribute('class', 'term')
input.placeholder = 'filter jokes on terms'
input.setAttribute("type", "text")

const button = document.createElement("button")
button.setAttribute('class', 'button')
button.textContent = 'search'
button.onclick = () => {
    removeCurrentJokes()
    request(`?term=${input.value}`)
}

const removeCurrentJokes = () => {
    var currentCards = document.getElementsByClassName('card');
    while (currentCards[0]) { 
      currentCards[0].parentNode.removeChild(currentCards[0]) 
    }
}

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(title)
app.appendChild(search)
search.appendChild(input)
search.appendChild(button)
app.appendChild(container)

const request = async params => {
    const response = await fetch(`https://icanhazdadjoke.com/search${params}`, {headers: {
      'Accept': 'application/json',
    }});
    const data = await response.json();

    if (response.ok) {
        console.log(data)
        if (data.results.length === 0) {
            const noJokes = document.createElement('p')
            noJokes.setAttribute('class', 'card')
            noJokes.textContent = `oh no, there are no dad jokes for ${input.value}`
            container.appendChild(noJokes)
        } else {
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

request('');