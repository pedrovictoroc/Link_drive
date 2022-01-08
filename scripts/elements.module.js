function generateElement(list, element){
        const container = document.createElement("a")
        container.style.color = "unset"
        if(element.type == "folder"){
            container.addEventListener("click", () =>{
                window.location.search = window.location.search + `-${element.folderId}` 
            })
        }else {
            container.href = element.to
            container.target = "_blank"
        }

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

    const header = document.createElement("h1")
    
    if(window.location.search.indexOf("-") != -1){
        
        header.innerHTML = "Voltar"
        header.style.cursor = "pointer"

        header.addEventListener("click", () => {
            let splitedPath = window.location.search.split("-")
            splitedPath = splitedPath.slice(0,-1)
            window.location.search = splitedPath.join("-")
        })
    }else{
        header.innerHTML = "Início"
    }

    list.appendChild(header)

    elements.map((el) => {
        generateElement(list, el)
    })
}

export { generateElementList }