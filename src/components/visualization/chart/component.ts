import './style.css'

import {
    ScaleLinear,
    ScaleTime,
    axisBottom,
    line,
    scaleLinear,
    scaleTime
} from 'd3'

import { TDimension, TMargin, TNameData, TPositionRange, TTimePeriod } from '../../shared_types'
import Diagram from '../Diagram'
import { validate_class_name } from '../../../publish_subscribe/data_manager'
import { Tooltip } from '../../content/component'

class Chart extends Diagram {

    private scale_x: ScaleTime<number, number, never>

    private scale_y: ScaleLinear<number, number, never>

    private line_generator
    
    constructor (
            { width, height }: TDimension,
            { top, right, bottom, left }: TMargin,
            { first, last}: TPositionRange,
            { start, end }: TTimePeriod) {
        
        super(
            'Chart',
            { width, height },
            { top, right, bottom, left }
        )

        this.scale_x = scaleTime()
            .domain([start, end])
            .range([ 0, width - left - right ])

        this.scale_y = scaleLinear()
            .domain([last, first])
            .range([ height - height * .175, 0 ])

        this.line_generator = line<{ year: Date, pos: number }>()
            // .x((d) => this.scale_x(d[0]))
            // .y((d) => this.scale_y(d[1]))
            // .defined((d) => d[1] >= first && d[1] <= last)
            .x((d) => this.scale_x(d.year))
            .y((d) => this.scale_y(d.pos))
            .defined((d) => d.pos >= first && d.pos <= last)
        
        this.selection.append('g')
            .attr('transform', `translate(${5}, ${height - height * .1})`)
            .call(axisBottom(this.scale_x).tickSize(0))

        // remove x-axis line
        this.selection.select('.domain').remove()

    }
    update = (year: Date, data?: TNameData[]) => {

        if (!data) {
            return
        }

        const HEIGHT_04 = this.dimension.height * .035

        this.selection.selectAll('path').remove()
        this.selection.selectAll<SVGElement, TNameData>('lines')
            .data(this.data_binding.values())
            .enter()
            .append('path')
                .on('mouseenter', (_d, i) => this.highlight(i.name))
                .on('mouseleave', this.dehighlight)
                .attr('class', (d) => validate_class_name(d.name))
                .attr('transform', `translate(${5}, ${HEIGHT_04})`)
                // .attr('d', (d) => this.line_generator(d.values.map((value) => [value.year.getFullYear(), value.pos])))
                .attr('d', (d) => this.line_generator(d.values))
                .style('fill', 'none')
                .style('stroke', (d) => d.color)
                .style('stroke-width', 3)
                .style('visibility', (d) => (d.color === Diagram.DEFAULT_COLOR) ? 'hidden' : 'visible')
    
        const current_names = data.map((set) => set.name)
        this.selection.selectAll<SVGElement, TNameData>('circle')
            .style('visibility', (d) => (current_names.includes(d.name)) ? 'visible' : 'hidden')
            .attr('fill', (d) => d.color ?? Diagram.DEFAULT_COLOR)
            .raise()
        
        this.selection.selectAll('dots')
            .data(data)
            .join('circle')
                .attr('class', (d) => validate_class_name(d.name))
                .on('mouseenter', (d, i) => {
                    const { clientX: x, clientY: y } = d
                    const { name, pos } = i
                    const color = this.data_binding.get(name)?.color ?? ''
                    this.highlight(name)
                    Tooltip.show(
                        { x, y },
                        {
                            name,
                            year: String(year.getFullYear()),
                            position: String(pos),
                            change: this.calculate_change(name, pos, year, 'HTML'),
                            color
                        })
                })
                .on('mouseleave', () => {
                    this.dehighlight()
                    Tooltip.hide()
                })
                .attr('transform', `translate(${5}, ${HEIGHT_04})`)
                .style('fill', (d) => d.color ?? Diagram.DEFAULT_COLOR)
                .attr('cx', () => this.scale_x(year) )
                .attr('cy', (d) => this.scale_y(d.pos) )
                .attr('r', 5)
        
        data.forEach((set) => this.selection.selectAll(`circle.${validate_class_name(set.name)}`)
            .style('fill', set.color ?? Diagram.DEFAULT_COLOR)
        )
    }
}

export default Chart
