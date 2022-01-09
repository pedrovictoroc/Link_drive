import { generateElementList } from './elements.module.js'

function routing(){
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