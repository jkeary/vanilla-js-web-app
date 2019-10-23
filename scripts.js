const app = document.getElementById('root')

const title = document.createElement('h1')
title.textContent = 'Dad Jokes!'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(title)
app.appendChild(container)

const request = async () => {
    const response = await fetch('https://icanhazdadjoke.com/search', {headers: {
      'Accept': 'application/json',
    }});
    const data = await response.json();
    console.log(data);
    console.log(response.status)
    console.log(response.statusText)
    console.log(response.ok)

    if (response.ok) {
        data.results.forEach(joke => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = joke.id

            const p = document.createElement('p')
            joke.description = joke.joke.substring(0, 300)
            p.textContent = `${joke.joke}...`

            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(p)
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

request();