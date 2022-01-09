import { routing } from './routing.module.js'
import { elements } from './displayableElements.js'

if(!localStorage.getItem('elements')){
    localStorage.setItem('elements', JSON.stringify(elements[0]))
}

routing()