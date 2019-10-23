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
    ps[0].parentNode.removeChild(ps[0]) 

    var currentJokes = document.getElementsByClassName('joke');
    while (currentJokes[0]) { 
      currentJokes[0].parentNode.removeChild(currentJokes[0]) 
    }
}

// Section for data sorting and manipulation
const containerHeader = document.createElement('div')
containerHeader.setAttribute('class', 'container-header')

const randomizeButton = document.createElement("button")
randomizeButton.setAttribute('class', 'button')
randomizeButton.textContent = 'randomize'
randomizeButton.onclick = () => {
    var currentJokes = document.getElementsByClassName('joke');
    shuffleJokes(currentJokes)
}

const shuffleJokes = (elems) => {
 
    allElems = (function(){
	var ret = [], l = elems.length;
	while (l--) { ret[ret.length] = elems[l]; }
	return ret;
    })();
 
    var shuffled = (function(){
        var l = allElems.length, ret = [];
        while (l--) {
            var random = Math.floor(Math.random() * allElems.length),
                randEl = allElems[random].cloneNode(true);
            allElems.splice(random, 1);
            ret[ret.length] = randEl;
        }
        return ret; 
    })(), l = elems.length;
 
    while (l--) {
        elems[l].parentNode.insertBefore(shuffled[l], elems[l].nextSibling);
        elems[l].parentNode.removeChild(elems[l]);
    }
 
}

const reverseButton = document.createElement("button")
reverseButton.setAttribute('class', 'button')
reverseButton.textContent = 'reverse'
reverseButton.onclick = () => {
    var parentNode = document.getElementById('container')
    reverseCurrentJokes(parentNode)
}

const reverseCurrentJokes = (node) => {
    var parentNode = node.parentNode, nextSibling = node.nextSibling,
        frag = node.ownerDocument.createDocumentFragment();
    parentNode.removeChild(node);
    while(node.lastChild)
        frag.appendChild(node.lastChild);
    node.appendChild(frag);
    parentNode.insertBefore(node, nextSibling);
    return node;
}

const prev = document.createElement('a')
prev.setAttribute('class', 'prev')
prev.setAttribute('data-prev', 1)
prev.textContent = "Prev"
prev.onclick = () => {
    removeCurrentJokes()
    request(`?page=${prev.getAttribute('data-prev')}`)
}

const next = document.createElement('a')
next.setAttribute('class', 'next')
next.setAttribute('data-next', 2)
next.textContent = "Next"
next.onclick = () => {
    removeCurrentJokes()
    request(`?page=${next.getAttribute('data-next')}`)
}

// Main container of the list of jokes
const container = document.createElement('div')
container.setAttribute('id', 'container')

// Add the nodes to the dom
app.appendChild(title)
containerHeader.appendChild(search)
search.appendChild(searchInput)
search.appendChild(searchButton)
app.appendChild(containerHeader)
containerHeader.appendChild(randomizeButton)
containerHeader.appendChild(reverseButton)
containerHeader.appendChild(prev)
containerHeader.appendChild(next)
app.appendChild(container)

const addToDom = jokes => {
    jokes.forEach(j => {
        const joke = document.createElement('div')
        joke.setAttribute('class', 'joke')

        const img = document.createElement('img')
        img.src = `https://icanhazdadjoke.com/j/${j.id}.png`
        img.setAttribute('data-id', j.id)

        container.appendChild(joke)
        joke.appendChild(img)
    })
}

// Main request getting jokes
const request = async params => {
    const response = await fetch(`https://icanhazdadjoke.com/search${params}`, {headers: {
      'Accept': 'application/json',
    }});
    const data = await response.json();
    
    if (response.ok) {
        console.log(data)
        prev.setAttribute('data-prev', data.previous_page)
        next.setAttribute('data-next', data.next_page)
        if (data.results.length === 0) {
            const noJokes = document.createElement('p')
            noJokes.textContent = `oh no, there are no dad jokes for ${searchInput.value}`
            container.appendChild(noJokes)
        } else {
            const jokeNum = document.createElement('p')
            jokeNum.textContent = `there are ${data.total_jokes} jokes total`
            containerHeader.appendChild(jokeNum)
            addToDom(data.results)
        }
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

// initialize the page by calling the request function to get all the jokes
request('');