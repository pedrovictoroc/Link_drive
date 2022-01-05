function generateElement(list, element){
    element.elements.map((el)=>{
        const container = document.createElement("div")
        container.classList.add("element")
    
        const image = document.createElement("img")
        image.src = `/images/${el.type}.svg`
    
        const p = document.createElement("p")
        p.innerHTML = el.name
    
        container.appendChild(image)
        container.appendChild(p)
        list.appendChild(container)
    })
}

function generateElementList(elements){
    const list = document.getElementById("container")
    elements.map((el) => {
        generateElement(list, el)
    })
}

export { generateElementList }