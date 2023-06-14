import './style.css'

import { TDimension, TMargin, TNameData } from '../../shared_types';
import Diagram from '../Diagram';
import { validate_class_name } from '../../../publish_subscribe/data_manager';
import { EnterElement, Selection } from 'd3';

class Table extends Diagram {

    private static RECT_HEIGHT = 25
    private static ROW_GAP = 32

    private enter_data = (enter: Selection<EnterElement, TNameData, SVGSVGElement, unknown>) => enter
        .append('g')
            .attr("transform", (_d, _i) => `translate(0,${320})`)
            .attr('class', (d) => validate_class_name(d.name))
            .style('opacity', 1)
            .on('mouseenter', (_d, i) => this.highlight(i.name))
            .on('mouseleave', this.dehighlight)
        .call((g) => g.transition().duration(Diagram.DEFAULT_CHANGE_DURATION)
            .attr('transform', (_d, i: number) => `translate(0,${i * Table.ROW_GAP})`)
            .style('opacity', 1))
        .call((g) => g.append('rect')
            .attr('width', this.dimension.width)
            .attr('height', Table.RECT_HEIGHT)
            .attr('fill', (d) => d.color ?? Diagram.DEFAULT_COLOR)
            .style('opacity', 0.7)
            .attr('rx', 3))
        .call((g) => {
            const text = g.append('text')
                .attr('x', 5)
                .attr('dy', '1.2em')
                // .raise()
            text.append('tspan')
                .attr('class', 'Position').text((d) => `${this.format_position(d.pos)}.`)
            text.append('tspan').attr('class', 'Change icon-plus')
                .text((d) => this.calculate_change(d.name, d.pos))
                .attr('dx', 5)
            text.append('tspan').attr('class', 'Name')
                .text((d) => d.name)
                .attr('dx', 10)
        })

    private exit_data = (exit: Selection<SVGElement, TNameData, SVGSVGElement, unknown>) => exit
        .call((g) => g
            .transition()
            .duration(Diagram.DEFAULT_CHANGE_DURATION)
            .attr('transform', `translate(0, ${this.dimension.height})`)
            .style('opacity', 0)
            .remove()
        )

    private update_data = (update: Selection<SVGElement, TNameData, SVGSVGElement, unknown>) => update
        .call((g) => g.transition().duration(Diagram.DEFAULT_CHANGE_DURATION).attr('transform', (_d, i: number) => `translate(0,${i * Table.ROW_GAP})`))
        .call((g) => g.select('text tspan.Position').text((d) => `${this.format_position(d.pos)}.`))
        .call((g) => g.select('text tspan.Change').text((d) => this.calculate_change(d.name, d.pos)))
        .call((g) => g.select('text tspan.Name').text((d) => d.name))
        .call((g) => g.select('rect').attr('fill', (d) => d.color ?? Diagram.DEFAULT_COLOR))

    constructor(
        { width, height }: TDimension,
        { top, right, bottom, left }: TMargin
    ) {
        super(
            'Table',
            { width, height },
            { top, right, bottom, left }
        )
    }

    update = (_year: Date, data?: TNameData[]) => {

        if (!data) {
            return
        }

        this.selection.selectAll<SVGElement, TNameData>('g')
            .data(data, (d) => d.name)
            .join(
                (enter) => this.enter_data(enter),
                (update) => this.update_data(update),
                (exit) => this.exit_data(exit)
            );
    }
}

export default Table
