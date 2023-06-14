import {
    beforeAll,
    describe,
    expect,
    it
} from 'vitest'
import { JSDOM } from 'jsdom'

import init_ui from '../src/components/initialize'

/** @type { HTMLElement } */
let body

beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html>')
    body = dom.window.document.body
    init_ui(body)
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
        console.log('app', body.querySelector('.Content'))
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
