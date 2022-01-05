import { elements } from "./displayableElements.js"
import { generateElementList } from './elements.module.js'

const router = [
    {
        "route": "/",
        "render": generateElementList
    }
]

function routing(){
    const route = window.location
    const hasOwner = route.search.indexOf("?owner=")

    if(hasOwner == -1){
        window.location = '/teste'
    }

    let owner = route.search.replace("?owner=", "")

    const hasPath = route.search.indexOf("?path=")

    if(hasPath != -1){
        const search = route.search.slice(hasPath, route.search.length)
        console.log(search)
        owner = search.replace("?path=", "")
    }

    let list = elements.filter((el) => el.owner == owner)

    console.log(owner)
    console.log(list)

    switch(route.pathname){
        case "/":        
            generateElementList(list)
            break;
        default:
            generateElementList(list)
            break;
    }
}

export { routing }