import {
    describe,
    expect,
    it
} from 'vitest'

import { create, is_empty_string, is_function, is_string } from '../src/components/utilities'

describe('test is_string', () => {
    it('returns true if parameter is standard string', () => {
        expect(is_string('')).toEqual(true)
        expect(is_string('bla')).toEqual(true)
        expect(is_string('1')).toEqual(true)
    })

    it('returns true if parameter is string literal', () => {
        // eslint-disable-next-line quotes
        expect(is_string(`template literal`)).toEqual(true)
        expect(is_string(`${'template'} literal`)).toEqual(true)
    })

    it('returs true if parameter is string object i.e. String(123)', () => {
        expect(is_string(String(123))).toEqual(true)
        expect(is_string(String('123'))).toEqual(true)
        expect(is_string(String({ key: 'value' }))).toEqual(true)
    })

    it('returs true if parameter is string object with empty array as parametet i.e. String([])', () => {
        expect(is_string(String([]))).toEqual(true)
    })

    it('returns false if parameter is not a string', () => {
        expect(is_string(123)).toEqual(false)
        expect(is_string({ key: 'value' })).toEqual(false)
        expect(is_string(['element'])).toEqual(false)
    })

    it('returns false if parameter is string object with new i.e. new String(123)', () => {
        // eslint-disable-next-line no-new-wrappers
        expect(is_string(new String(123))).toEqual(false)
    })
})

describe('test is_empty_string', () => {

    it('returns true if parameter is empty standard string', () => {
        expect(is_empty_string('')).toEqual(true)
    })

    it('returns true if parameter is empty string literal', () => {
        // eslint-disable-next-line quotes
        expect(is_empty_string(``)).toEqual(true)
        expect(is_empty_string(`${''}`)).toEqual(true)
    })

    it('returs true if parameter is empty string object i.e. String()', () => {
        expect(is_empty_string(String())).toEqual(true)
        expect(is_empty_string(String(''))).toEqual(true)
    })

    it('returns false if parameter is standard not empty string', () => {
        expect(is_empty_string('bla')).toEqual(false)
    })

    it('returns false if parameter is not empty string literal', () => {
        // eslint-disable-next-line quotes
        expect(is_empty_string(`template literal`)).toEqual(false)
        expect(is_empty_string(`${'template'} literal`)).toEqual(false)
    })

    it('returs false if parameter is not empty string object i.e. String(123)', () => {
        expect(is_empty_string(String(123))).toEqual(false)
        expect(is_empty_string(String('123'))).toEqual(false)
        expect(is_empty_string(String({ key: 'value' }))).toEqual(false)

        expect(is_empty_string(String({}))).toEqual(false)
    })

    it('returns false if parameter is not a string', () => {
        expect(is_empty_string(123)).toEqual(false)
        expect(is_empty_string({ key: 'value' })).toEqual(false)
        expect(is_empty_string(['element'])).toEqual(false)
    })
})

describe('test is_function', () => {

    it('returns true if function', () => {
        const func = function () { return true }
        expect(is_function(func)).toBe(true)
        const func2 = function (a, b) { return a + b }
        expect(is_function(func2)).toBe(true)
    })

    it('returns true if arrow function', () => {
        const func = () => true
        expect(is_function(func)).toBe(true)
        const func2 = (a, b) => a + b
        expect(is_function(func2)).toBe(true)
    })

    it('returns true if generator function', () => {
        const generator = function * (i) {
            yield i
            yield i + 10
        }
        expect(is_function(generator)).toBe(true)
    })

    it('returns false if other than function', () => {
        expect(is_function('Function')).toBe(false)
        expect(is_function(523)).toBe(false)
        expect(is_function([])).toBe(false)
        expect(is_function([3, 4, 5])).toBe(false)
    })

    it('returns false if an object', () => {
        expect(is_function({})).toBe(false)
        expect(is_function({ a: 5, b: 3 })).toBe(false)
        expect(is_function({ a: () => false, b: (c, d) => c * d })).toBe(false)
    })

})

describe('test create', () => {

    it('returns HTMLElement for any given tag name', () => {
        const div_element = create('div')
        expect(div_element).toBeInstanceOf(HTMLElement)
        const any_element = create('any')
        expect(any_element).toBeInstanceOf(HTMLElement)
    })

    it('returns an empty object if no parameter is given', () => {
        const div_element = create()
        const values = Object.values(div_element)
        expect(div_element).toBeInstanceOf(Object)
        expect(values.length).toEqual(0)
    })

    it('returns an empty object if empty string as tagName is given', () => {
        const div_element = create('')
        const values = Object.values(div_element)
        expect(div_element).toBeInstanceOf(Object)
        expect(values.length).toEqual(0)
    })

    it('className exists on HTMLElement if set as parameter', () => {
        const className = 'Test'
        const div_element = create('div', className)
        expect(div_element).toBeInstanceOf(HTMLElement)
        expect(div_element.classList.length).toEqual(1)
        expect(div_element.classList.contains(className)).toEqual(true)
        expect(div_element.className).toEqual(className)
    })

    it('multiple classNames can be set seperated by whitespace', () => {
        const classNames = 'Test1 Test2 Test3'
        const names = classNames.split(' ')
        const div_element = create('div', classNames)
        expect(div_element).toBeInstanceOf(HTMLElement)
        expect(div_element.classList.length).toEqual(names.length)
        names.forEach((name) => expect(div_element.classList.contains(name)).toEqual(true))
        expect(div_element.className).toEqual(classNames)
    })

    it('no className exists on HTMLElement if not set as parameter', () => {
        const div_element = create('div')
        expect(div_element).toBeInstanceOf(HTMLElement)
        expect(div_element.classList.length).toEqual(0)
        expect(div_element.className).toEqual('')
    })

})
