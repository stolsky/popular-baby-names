import {
    describe,
    expect,
    it
} from 'vitest'

import { select } from 'd3'
import json_data from '../src/publish_subscribe/first_names_per_year.json'

describe('check d3 methods', () => {

    it('check if method select is available', () => {
        expect(select).toBeInstanceOf(Function)
    })

})

describe('check if json data is available', () => {

    it('json data file is accessible and returning data', async () => {
        expect(json_data).toBeDefined()
    })

    it('json data is not empty array', () => {
        expect(json_data).toBeInstanceOf(Array)
        expect(json_data.length).toBeGreaterThan(0)
    })

    it('all data elements have the structure { year: string, girls: [], boys: [] }', () => {
        if (json_data instanceof Array) {
            let count_correct_year_attribute = 0
            let count_correct_girls_attribute = 0
            let count_correct_boys_attribute = 0
            json_data.forEach((element) => {
                if (typeof element?.year === 'string') {
                    count_correct_year_attribute = count_correct_year_attribute + 1
                }
                if (element?.girls instanceof Array) {
                    count_correct_girls_attribute = count_correct_girls_attribute + 1
                }
                if (element?.boys instanceof Array) {
                    count_correct_boys_attribute = count_correct_boys_attribute + 1
                }
            })
            expect(count_correct_year_attribute).toBe(json_data.length)
            expect(count_correct_girls_attribute).toBe(json_data.length)
            expect(count_correct_boys_attribute).toBe(json_data.length)
        }
    })

})
