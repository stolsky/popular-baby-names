import { create } from '../utilities'
import Diagram from '../visualization/Diagram'
import './style.css'

class Tooltip {

    private callback: Function | null = null

    private fade_to = (opacity: number) => {
        if (opacity > 0) {
            this.html.style.visibility = 'visible'
        } else {
            this.callback = () => { this.html.style.visibility = 'hidden' }
        }
        this.html.style.opacity = String(opacity)
    }

    private name_text: HTMLElement
    private year_text: HTMLElement
    private position_text: HTMLElement
    private position_change_icon: HTMLElement

    private html: HTMLElement

    constructor() {

        this.html = create('div', 'Tooltip')
        this.html.style.transitionDuration = `${Diagram.DEFAULT_HIGHLIGHT_DURATION}ms`
        this.html.addEventListener('transitionend', () => {
            if (this.callback instanceof Function) {
                this.callback()
                this.callback = null
            }
        })
        this.html.addEventListener('transitioncancel', () => {
            this.callback = null
        })

        const name_label = create('span', 'Label')
        name_label.textContent = 'name'
        this.name_text = create('span', 'Text')
        const name_container = create('p', 'Name')
        name_container.append(
            name_label,
            this.name_text
        )

        const year_label = create('span', 'Label')
        year_label.textContent = 'year'
        this.year_text = create('span', 'Text')
        const year_container = create('p', 'Year')
        year_container.append(
            year_label,
            this.year_text
        )

        const position_label = create('span', 'Label')
        position_label.textContent = 'position'
        this.position_text = create('span', 'Text')
        this.position_change_icon = create('span', 'Icon')
        const position_container = create('p', 'Position')
        position_container.append(
            position_label,
            this.position_text,
            this.position_change_icon
        )

        this.html.append(
            name_container,
            year_container,
            position_container
        )
    }

    get_html = () => this.html ?? {} as HTMLElement

    hide = () => {
        this.fade_to(0)
    }

    show = (
        position: { x: number, y: number },
        information: {
            name: string,
            year: string,
            position: string,
            change: string,
            color: string,
        }
    ) => {
        const { style } = this.html
        style.borderColor = `${information.color}80`
        style.backgroundColor = `${information.color}80`
        style.transform = `translate(${position.x + 20}px, ${position.y - 10}px)`

        this.name_text.textContent = information.name
        this.year_text.textContent = information.year
        this.position_text.textContent = information.position
        this.position_change_icon.className = `Icon ${information.change}`

        this.fade_to(1)
    }
}

export default Tooltip
