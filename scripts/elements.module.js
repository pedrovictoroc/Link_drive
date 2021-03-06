import { elements } from './displayableElements.js'

const folderSvg = `https://raw.githubusercontent.com/pedrovictoroc/Link_drive/main/images/folder.svg`
const linkSvg = `https://raw.githubusercontent.com/pedrovictoroc/Link_drive/main/images/link.svg`
const trashSvg = `https://raw.githubusercontent.com/pedrovictoroc/Link_drive/main/images/trashCan.svg`


function removeElement(event){
    const toBeRemovedId = event.target.id
    const route = window.location

    const search = route.search.replace("?", "")
    let owner = ""
    let path = ""
    if(search.indexOf("&") != -1){
        const splited = search.split("&")
        splited.map((param) => {
            if(param.indexOf("owner=") != -1){
                owner = param.replace("owner=", "")
            }
            if(param.indexOf("path=") != -1){
                path = param.replace("path=", "")
            }
        })
    }else{
        if(search.indexOf("owner=") != -1){
            owner = search.replace("owner=", "")
        }
    }

    let elements = JSON.parse(localStorage.getItem('elements'))
    elements = [elements]
    
    let list = elements.filter((el) => el.owner == owner)
    if(!!path){
        if(path.indexOf('-') != -1){
            let listPath = path.split('-')
            let listCopy = list

            listCopy = listCopy[0].elements

            for(let i = 0; i< listPath.length; i++){
                listCopy.map((el) => {
                    if(el.type =="folder" && el.folderId == listPath[i]){
                        listCopy = el.elements
                    }
                })
            }

            list = listCopy

        }else{
            list = list[0].elements
        }
    }

    // For logging pourpouse we will not delete, just hide elements
    list.map((el) => el.visible = (el.id.toString() == toBeRemovedId || !el.visible) ? false : true)

    localStorage.setItem('elements', JSON.stringify(elements[0]))
    window.location.reload()
}

function createNewItem(){
    const name = document.getElementById("name").value
    const type = document.getElementById("type").value
    const link = document.getElementById("link").value
    const route = window.location

    const search = route.search.replace("?", "")
    let owner = ""
    let path = ""
    if(search.indexOf("&") != -1){
        const splited = search.split("&")
        splited.map((param) => {
            if(param.indexOf("owner=") != -1){
                owner = param.replace("owner=", "")
            }
            if(param.indexOf("path=") != -1){
                path = param.replace("path=", "")
            }
        })
    }else{
        if(search.indexOf("owner=") != -1){
            owner = search.replace("owner=", "")
        }
    }

    let elements = JSON.parse(localStorage.getItem('elements'))
    elements = [elements]

    let list = elements.filter((el) => el.owner == owner)
    if(!!path){
        if(path.indexOf('-') != -1){
            let listPath = path.split('-')
            let listCopy = list

            listCopy = listCopy[0].elements

            for(let i = 0; i< listPath.length; i++){
                listCopy.map((el) => {
                    if(el.type =="folder" && el.folderId == listPath[i]){
                        listCopy = el.elements
                    }
                })
            }

            list = listCopy

        }else{
            list = list[0].elements
        }
    }

    if(type == "link"){
        list.push({
            "id": Date.now(),
            "owner": owner,
            "name": name,
            "type": type,
            "to": link,
            "visible": true
        })
    }
    if(type == "folder"){
        list.push({
            "id": Date.now(),
            "name": name,
            "folderId": Date.now(),
            "type": type,
            "elements": [],
            "visible": true
        })
    }
    
    localStorage.setItem('elements', JSON.stringify(elements[0]))
    window.location.reload()
}

function generateElement(list, element){

    if(!element.visible){
        return
    }

    const container = document.createElement("div")
    container.style.display = "flex"

    /*  As we need to redirect our user, we should use
        the HTML element 'a', so we remove they styles before anything ele
    */
    const innerContainer = document.createElement("a")
    innerContainer.style.color = "unset"
    innerContainer.style.width = "100%"
    innerContainer.style.display = "flex"

    /*  We have two type os redirects, one is the Link
        leting us move to another tab with the desired content.
        The another one is the folder, we just manage to modify
        the search param and we stay in our project base URL
    */

    if(element.type == "folder"){
        innerContainer.addEventListener("click", () =>{
            window.location.search = window.location.search + `-${element.folderId}` 
        })
    }else {
        innerContainer.href = element.to
        innerContainer.target = "_blank"
    }

    innerContainer.classList.add("element")

    /*  Just decide the properly SVG, we are currently hosting
        this project on GitHubPages, so we can't use heavy images or SVGs.
        As a workaround we use the raw user content URL provided by GitHub 
        when we push images to a repository
    */
    const iconImg = document.createElement("img")
    iconImg.src = `${element.type == "folder" ? folderSvg : linkSvg}`

    const p = document.createElement("p")
    p.innerHTML = element.name

    const deleteImg = document.createElement("img")
    deleteImg.src = `${trashSvg}`
    deleteImg.style.width = "32px"
    deleteImg.style.cursor = "pointer"
    deleteImg.id = element.id

    deleteImg.addEventListener("click",removeElement)


    innerContainer.appendChild(iconImg)
    innerContainer.appendChild(p)
    
    container.appendChild(innerContainer)
    container.appendChild(deleteImg)

    list.appendChild(container)
}


function createInputs(list){
    // Create input Name field
    const nameInput = document.createElement("input")
    nameInput.id = "name"
    nameInput.placeholder = "Nome"
    list.appendChild(nameInput)
    
    // Create Type selector
    const select = document.createElement("select")
    select.id = "type"
    const folderOption = document.createElement("option")
    folderOption.value = "folder"
    folderOption.innerHTML = "folder"
    const linkOption = document.createElement("option")
    linkOption.value = "link"
    linkOption.innerHTML = "link"
    select.options.add(folderOption)
    select.options.add(linkOption)

    list.appendChild(select)

    // Create Link input for Link objects
    const linkInput = document.createElement("input")
    linkInput.id = "link"
    linkInput.placeholder = "Link"

    list.appendChild(linkInput)
}

function createNewElementSection(list){
    // First create inputs
    createInputs(list)

    // Create the Add button after
    const div = document.createElement("div")
    div.classList.add("addElement")
    const p = document.createElement("p")
    p.innerHTML = "Adicionar"

    div.appendChild(p)

    div.addEventListener("click", createNewItem)

    list.appendChild(div)
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
        header.innerHTML = "In??cio"
    }

    list.appendChild(header)

    elements.map((el) => {
        generateElement(list, el)
    })

    createNewElementSection(list)
}

export { generateElementList }