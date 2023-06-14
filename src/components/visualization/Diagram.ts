import { create } from '../utilities'
import { TDataByName, TDimension, TMargin, TNameData } from '../shared_types'
import { BaseType, select, selectAll } from 'd3'
import { validate_class_name } from '../../publish_subscribe/data_manager'

class Diagram {

    static DEFAULT_COLOR = '#000000'

    static DEFAULT_CHANGE_DURATION = 1000
    static DEFAULT_HIGHLIGHT_DURATION = 500

    protected dimension: TDimension

    protected margin: TMargin

    protected data_binding = new Map<string, TDataByName>()

    protected html: HTMLElement

    protected selection

    constructor (
        type: string,
        { width, height }: TDimension,
        { top, right, bottom, left }: TMargin
    ) {

        this.dimension = {
            width: width - left - right,
            height: height - top - bottom
        }
        this.margin = { top, right, bottom, left }

        this.html = create('div', `Diagram ${type}`)

        this.selection = select(this.html)
            .append('svg')
            .attr('width', this.dimension.width)
            .attr('height', this.dimension.height)
            .attr('transform', `translate(${left}, ${top})`)
    }

    protected highlight = (class_name: string) => {  
        const valid_class_name = validate_class_name(class_name)
        selectAll(`.${valid_class_name}`).each(function () {
            if (this instanceof Node && this.parentNode) {
                select(this.parentNode as BaseType).selectAll(`${this.nodeName}:not(.${valid_class_name})`)
                    .transition().duration(Diagram.DEFAULT_HIGHLIGHT_DURATION)
                        .style('opacity', 0.2)
                select(this)
                    .raise()
                    .transition().duration(Diagram.DEFAULT_HIGHLIGHT_DURATION)
                    .style('opacity', 1)
            }
        })
    }

    protected dehighlight = () => {
        ['g', 'path', 'circle'].forEach((nodeName) => selectAll(nodeName)
            .transition().duration(Diagram.DEFAULT_HIGHLIGHT_DURATION)
            .style('opacity', 1)
        )
    }

    protected format_position = (position: number) => `${(position < 10) ? `0` : ''}${position}`

    protected get_best_position = (id: string) => {
        const name = this.data_binding.get(id) as TDataByName
        const best_position = name.values
            .filter((value) => value.pos !== -1)
            .reduce((acc, now) => Math.min(acc, now.pos), 10)
        return (best_position) ? this.format_position(best_position) : '-'
    }

    protected calculate_change = (id: string, current_position: number, year?: Date, format = 'SVG') => {
        let icon_string = ''
        let class_name = ''
        const { values } = this.data_binding.get(id) as TDataByName

        let previous_position = -1
        let is_first_year = false
        if (year) {
            const index_of_year_to_compare = values.findIndex((value) => value.year === year)
            if (index_of_year_to_compare > 0) {
                previous_position = values[index_of_year_to_compare - 1].pos
            } else if (index_of_year_to_compare === 0) {
                is_first_year = true
            }
        } else {
            previous_position = values.at(-2)?.pos ?? -1
        }

        if (values.length === 1 || is_first_year) {
            icon_string = '\uea0a' // new entry
            class_name = 'icon-plus'
        } else if (current_position === previous_position) {
            icon_string = '\uea56' // stay
            class_name = 'icon-radio-unchecked'
        } else if (current_position < previous_position) {
            icon_string = '\uea32' // rise
            class_name = 'icon-arrow-up'
        } else if(current_position > previous_position && previous_position !== -1) {
            icon_string = '\uea36' // fall
            class_name = 'icon-arrow-down'
        } else if (previous_position === -1 && values.find((value) => value.pos !== -1)) {
            icon_string = '\ue984' // reentry
            class_name = 'icon-spinner11'
        }

        if (format === 'SVG') {
            return icon_string
        } else if (format === 'HTML') {
            return class_name
        }
        return ''
    }

    bind_data = (data: Map<string, TDataByName>) => {
        this.data_binding = data
    }

    get_html = (): HTMLElement => this.html

    update = (_year: Date, _data?: TNameData[]): void => {}
}

export default Diagram