const searchInput = document.getElementById('search')

let results = [] //empty array 

searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase()
    console.log(value) //for testing 
    results.forEach(result => {
        const isVisible = 
            result.title.toLowerCase().includes(value) 
            result.element.classList.toggle("hide", !isVisible)
    })
})












