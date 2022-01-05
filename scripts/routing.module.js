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

    switch(route){
        case "/":        
            generateElementList(elements)
            break;
        default:
            generateElementList(elements)
            break;
    }
}

export { routing }