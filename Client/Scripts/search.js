const searchInput = document.getElementById('search')
const content = document.getElementById('content').getElementsByTagName('li')

let results = [] //empty array 

searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase()
    console.log(value) //for testing 
    Array.from(content).forEach(item => {
        const title = item.querySelector('h5').textContent.toLowerCase()
        item.style.display = title.includes(value) ? '' : 'none';
    })
})












