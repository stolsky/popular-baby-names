import './style.css'

import { schemeCategory10 } from 'd3'
import { create, is_empty_string } from '../utilities'
import Diagram from './Diagram'
import { TDataByName, TNameData, TTimeStrings } from '../shared_types'

class Visualization {

    private last_top10 = [] as string[]
    private data_base = new Map<string, TDataByName>()

    private colors: string[]

    private html: HTMLElement

    private diagrams = [] as Diagram[]

    constructor(
        { title, icon }: { title: string, description?: string, icon?: string },
        ...diagrams: Diagram[]
    ) {

        this.colors = [...schemeCategory10].sort(() => 0.5 - Math.random())

        this.html = create('div', `Visualization ${title}`)

        const title_container = create('div', 'Title')
        this.html.appendChild(title_container)

        if (icon && !is_empty_string(icon)) {
            const title_icon = create('p', `Icon ${icon}`)
            title_container.appendChild(title_icon)
        }
        if (!is_empty_string(title)) {
            const title_text = create('p', 'Text')
            title_text.textContent = title
            title_container.appendChild(title_text)
        }

        diagrams.forEach((diagram) => this.add_diagram(diagram))      
    }

    private parse_date = (date: string) => new Date(date.replace(/\D/g, ''))

    private split_data = (data: TNameData[]) => {

        const new_top10_names = data.map((elem) => elem.name)

        const data_to_enter = data.filter((elem) => !this.last_top10.includes(elem.name))
        const data_to_exit = this.last_top10.filter((top10_name) => !new_top10_names.includes(top10_name))
        const data_to_update = data.filter((elem) => this.last_top10.includes(elem.name))

        this.last_top10 = new_top10_names

        return {
            data_to_enter,
            data_to_exit,
            data_to_update
        }
    }

    private enter_data = (year: Date, data: TNameData[]) => {
        data.forEach((elem) => {
            const color = this.colors.pop() ?? Diagram.DEFAULT_COLOR
            const value = { year, pos: elem.pos }
            const exists = this.data_base.get(elem.name)
            if (exists) {
                exists.color = color
                exists.values.push(value)
            } else {
                this.data_base.set(elem.name, {
                    name: elem.name,
                    color,
                    values: [value]
                })
            }
            
        })
    }

    private exit_data = (year: Date, data: string[]) => {
        data.forEach((elem) => {
            const data_set = this.data_base.get(elem)
            if (data_set) {
                data_set.values.push({
                    year,
                    pos: -1
                })
                const { color } = data_set
                if (color) {
                    this.colors.push(color)
                    data_set.color = Diagram.DEFAULT_COLOR
                }
            }
        })
    }

    private update_data = (year: Date, data: TNameData[]) => {
        data.forEach((elem) => {
            const data_set = this.data_base.get(elem.name)
            if (data_set) {
                data_set.values.push({
                    year,
                    pos: elem.pos
                })
            }
        })
    }

    add_diagram = (diagram: Diagram) => {
        diagram.bind_data(this.data_base)
        this.diagrams.push(diagram)
        this.html.appendChild(diagram.get_html())
    }

    get_html = () => this.html ?? {} as HTMLElement

    update = (year: TTimeStrings, data?: TNameData[]) => {
        if (data) {
            const this_year = this.parse_date(year.now)
            // const last_year = this.parse_date(year?.last ?? '')
            const { data_to_enter, data_to_exit, data_to_update } = this.split_data(data)
            
            this.exit_data(this_year, data_to_exit)
            this.enter_data(this_year, data_to_enter)
            this.update_data(this_year, data_to_update)

            const new_data = this.last_top10.map((elem) => {
                const { color, name, values } = this.data_base.get(elem) as TDataByName
                return { color, name, pos: values.at(-1)?.pos ?? -1 }
            })
    
            this.diagrams.forEach((diagram) => diagram.update(this_year, new_data))
        }
    }
}

export default Visualization
