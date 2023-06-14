import {
    beforeAll,
    describe,
    expect,
    it
} from 'vitest'
import { JSDOM } from 'jsdom'

import { get_positions_range, get_time_period } from '../src/publish_subscribe/data_manager'
import { create } from '../src/components/utilities'
import Visualization from '../src/components/visualization/component'
import Table from '../src/components/visualization/table/component'
import Chart from '../src/components/visualization/chart/component'
import Title from '../src/components/title/component'
import Content from '../src/components/content/component'
import Controls from '../src/components/controls/component'

/** @type { HTMLElement } */
let body

beforeAll(() => {

    const table_margin = {
        top: 0,
        right: 20,
        bottom: 0,
        left: 0
    }

    const table_dimension = {
        width: 300,
        height: 320
    }

    const chart_margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    const chart_dimension = {
        width: 820,
        height: 350
    }

    const position_range = get_positions_range()
    const time_period = get_time_period()

    const girls_visual = new Visualization(
        { title: 'Girls', icon: 'Baby-Girl' },
        new Table(
            table_dimension,
            table_margin
        ),
        new Chart(
            chart_dimension,
            chart_margin,
            position_range,
            time_period
        )
    )

    const boys_visual = new Visualization(
        { title: 'Boys', icon: 'Baby-Boy' },
        new Table(
            table_dimension,
            table_margin
        ),
        new Chart(
            chart_dimension,
            chart_margin,
            position_range,
            time_period
        )
    )

    const app = create('div', 'App')
    app.append(
        Title('Most Popular Baby Names in Germany'),
        Content(
            girls_visual,
            boys_visual
        ),
        Controls()
    )

    const dom = new JSDOM('<!DOCTYPE html>')
    body = dom.window.document.body
    body.appendChild(app)
})

describe('Test Content', () => {
    it('Content is created and displayed correctly', () => {
        /** @type { HTMLElement } */
        const content = body.querySelector('.Content')
        expect(content).toBeDefined()
        expect(content).toBeInstanceOf(HTMLElement)
    })
    it('Data Tables are created and displayed correctly', () => {
        const visualizations = body.querySelectorAll('.Visualization')
        expect(visualizations.length).toBe(2)
        visualizations.forEach((visualization) => {
            const title = visualization.querySelector('.Title')

            const table_svg_wrapper = visualization.querySelector('.Table')
            const table_svg = table_svg_wrapper.querySelector('svg')

            const chart_svg_wrapper = visualization.querySelector('.Chart')
            const chart_svg = chart_svg_wrapper.querySelector('svg')

            expect(visualization).toBeDefined()
            expect(visualization).toBeInstanceOf(HTMLElement)

            expect(title).toBeDefined()
            expect(title).toBeInstanceOf(HTMLElement)

            expect(table_svg_wrapper).toBeDefined()
            expect(table_svg_wrapper).toBeInstanceOf(HTMLElement)
            expect(table_svg).toBeDefined()
            expect(table_svg).toBeInstanceOf(SVGElement)

            expect(chart_svg_wrapper).toBeDefined()
            expect(chart_svg_wrapper).toBeInstanceOf(HTMLElement)
            expect(chart_svg).toBeDefined()
            expect(chart_svg).toBeInstanceOf(SVGElement)
        })
    })
})
