import {
    beforeAll,
    beforeEach,
    describe,
    expect,
    it
} from 'vitest'
import { JSDOM } from 'jsdom'

import Controls from '../src/components/controls/component'
import { get_current_index, reset as reset_data_manager } from '../src/publish_subscribe/data_manager'

/** @type {HTMLElement} */
let body

beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html>')
    body = dom.window.document.body
    const controls = Controls()
    body.appendChild(controls)
})

beforeEach(async () => {
    reset_data_manager()
})

describe('test controls', () => {

    it('Check that button next is created and displayed', () => {

        const button = body.querySelector('.icon-next2')
        const { classList, tagName } = button
        const classListArray = [...classList]

        expect(tagName.toUpperCase()).toBe('SPAN')
        expect(classListArray).toContain('Button')
        expect(classListArray).toContain('Icon')
        expect(classListArray).toContain('icon-next2')

    })

    it.skip('Check that button previous is created and displayed', () => {

        const button = body.querySelector('.icon-previous2')
        const { classList, tagName } = button
        const classListArray = [...classList]

        expect(tagName.toUpperCase()).toBe('SPAN')
        expect(classListArray).toContain('Button')
        expect(classListArray).toContain('Icon')
        expect(classListArray).toContain('icon-previous2')

    })

    it('Click event on next button works and increments index', () => {

        const button_next = body.querySelector('.icon-next2')

        expect(get_current_index()).toBe(0)
        button_next.click()
        expect(get_current_index()).toBe(1)
        button_next.click()
        expect(get_current_index()).toBe(2)

    })

    it.skip('Click event on previous button works, reduces index but never below zero', () => {

        const button_next = body.querySelector('.icon-next2')
        const button_prev = body.querySelector('.icon-previous2')

        expect(get_current_index()).toBe(0)
        button_next.click()
        button_next.click()
        expect(get_current_index()).toBe(2)

        button_prev.click()
        expect(get_current_index()).toBe(1)
        button_prev.click()
        expect(get_current_index()).toBe(0)
        button_prev.click()
        expect(get_current_index()).toBe(0)

    })

})
