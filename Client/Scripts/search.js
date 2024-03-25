const searchInput = document.getElementById('search')
const content = document.getElementById('content').getElementsByTagName('li')

let results = [] //empty array 

searchInput.addEventListener("input", x => {

    const value = x.target.value.toLowerCase() //converting to lower case to get results always
    console.log(value) //for testing 
    Array.from(content).forEach(item => {
        const title = item.querySelector('h5').textContent.toLowerCase() //getting the title and converting to lower 
        item.style.display = title.includes(value) ? '' : 'none'; //if the title is included keep it visible other wise set to none 
    })
})












