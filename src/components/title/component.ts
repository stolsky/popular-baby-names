import './style.css'

import { create, is_empty_string } from '../utilities'
import { Theme, subscribe } from '../../publish_subscribe/broker'
import { TTimeStrings } from '../shared_types'


let title_year: HTMLElement

const update = (year: TTimeStrings) => {
    title_year.textContent = year.now
}

const component = (text?: string) => {
    
    const comp = create('div', 'Title')

    if (text && !is_empty_string(text)) {
        const title_text = create('p', 'Text')
        title_text.textContent = text
        comp.appendChild(title_text)
    }
    
    title_year = create('p', 'Year')
    comp.appendChild(title_year)

    subscribe(Theme.Year, update)

    return comp
};

export default component
