function generateElement(list, element){
    const container = document.createElement("div")
    container.classList.add("element")

    const image = document.createElement("img")
    image.src = `/images/${element.type}.svg`

    const p = document.createElement("p")
    p.innerHTML = element.name

    container.appendChild(image)
    container.appendChild(p)
    list.appendChild(container)
}

function generateElementList(elements){
    const list = document.getElementById("container")
    elements.map((el, index) => {
        generateElement(list, el)
    })
}

export { generateElementList }