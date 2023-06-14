import {
    beforeEach,
    describe,
    expect,
    it
} from 'vitest'

import {
    decrement_index,
    get_current_data_set,
    get_current_index,
    get_positions_range,
    get_time_period,
    increment_index,
    reset,
    reset as reset_data_manager,
    validate_class_name
} from '../src/publish_subscribe/data_manager'

beforeEach(async () => {
    reset_data_manager()
})

describe('test increment_index', () => {
    it('increments the index with every call by 1', () => {
        const previous_data_set = get_current_data_set()
        const previous_index = get_current_index()
        increment_index()
        const current_data_set = get_current_data_set()
        const current_index = get_current_index()

        expect(previous_data_set.year).not.toBe(current_data_set.year)
        expect(current_index).toBe(previous_index + 1)
    })
    it('highest index possible is length minus one', () => {
        let previous_index = get_current_index()
        let current_index
        while (previous_index !== current_index) {
            previous_index = get_current_index()
            increment_index()
            current_index = get_current_index()
        }
        expect(previous_index).toBe(current_index)
    })
})

describe('test decrement_index', () => {
    it('lowest possible index is zero', () => {
        expect(get_current_index()).toBe(0)
        decrement_index()
        expect(get_current_index()).toBe(0)
    })
    it('decrements the index with every call by 1', () => {

        // increment 5 times to not decrement 0
        for (let i = 0; i <= 5; i = i + 1) {
            increment_index()
        }

        const previous_data_set = get_current_data_set()
        const previous_index = get_current_index()
        decrement_index()
        const current_data_set = get_current_data_set()
        const current_index = get_current_index()

        expect(previous_data_set.year).not.toBe(current_data_set.year)
        expect(current_index).toBe(previous_index - 1)
    })
})

describe('test get_current_index', () => {
    it('returned index of zero if nothing changed/after reset', () => {
        expect(get_current_index()).toBe(0)
        reset_data_manager()
        expect(get_current_index()).toBe(0)
    })
    it('returned "n" after "n" increment', () => {
        const n = 5
        for (let i = 0; i < n; i = i + 1) {
            increment_index()
        }
        expect(get_current_index()).toBe(n)
    })
})

describe('test get_current_data_set', () => {
    it('returned data set has correct data structure', () => {
        const data_set = get_current_data_set()

        expect(data_set).toHaveProperty('year')
        expect(data_set.year).toBeTypeOf('string')
        expect(data_set).toHaveProperty('girls')
        expect(data_set.girls).toBeInstanceOf(Array)
        expect(data_set).toHaveProperty('boys')
        expect(data_set.boys).toBeInstanceOf(Array)
    })
})

describe('test reset method', () => {
    it('after initialization nothing should be changed', () => {
        const data_set_before_reset = get_current_data_set()
        expect(get_current_index()).toBe(0)
        reset()
        const data_set_after_reset = get_current_data_set()
        expect(get_current_index()).toBe(0)
        expect(data_set_before_reset.year).toEqual(data_set_after_reset.year)
        expect(data_set_before_reset.girls).toEqual(data_set_after_reset.girls)
        expect(data_set_before_reset.boys).toEqual(data_set_after_reset.boys)
    })
    it('after interaction everything should be resetted', () => {
        const data_set_before = get_current_data_set()
        expect(get_current_index()).toBe(0)
        increment_index()

        // compare after interaction/increment
        const data_set_middle = get_current_data_set()
        expect(get_current_index()).toBe(1)
        expect(data_set_before.year).not.toEqual(data_set_middle.year)
        expect(data_set_before.girls).not.toEqual(data_set_middle.girls)
        expect(data_set_before.boys).not.toEqual(data_set_middle.boys)

        reset()
        const data_set_after = get_current_data_set()
        expect(get_current_index()).toBe(0)
        expect(data_set_before.year).toEqual(data_set_after.year)
        expect(data_set_before.girls).toEqual(data_set_after.girls)
        expect(data_set_before.boys).toEqual(data_set_after.boys)
    })

})

describe('test get_positions_range', () => {
    it('returned object with attributes "first" & "last", both of type number', () => {
        const positions_range = get_positions_range()
        expect(positions_range).toHaveProperty('first')
        expect(positions_range.first).toBeTypeOf('number')
        expect(positions_range.first).toBeGreaterThan(0)
        expect(positions_range).toHaveProperty('last')
        expect(positions_range.last).toBeTypeOf('number')
        expect(positions_range.last).toBeGreaterThan(0)
        expect(positions_range.first).not.toEqual(positions_range.last)
    })
})

describe('test get_time_period', () => {
    it('returned object with attributes "start" & "end", both with type "Date"', () => {
        const time_period = get_time_period()
        expect(time_period).toHaveProperty('start')
        expect(time_period.start).toBeInstanceOf(Date)
        expect(time_period.start.valueOf()).not.toBeNaN()
        expect(time_period).toHaveProperty('end')
        expect(time_period.end).toBeInstanceOf(Date)
        expect(time_period.end.valueOf()).not.toBeNaN()
        expect(time_period.start).not.toEqual(time_period.end)
    })
})

describe('test validate_class_name', () => {
    it('replaces slash with minus', () => {
        const input = 'Anna/Anne'
        expect(input).toContain('/')
        const result = validate_class_name(input)
        expect(result).toContain('-')
        expect(result).not.toContain('/')
    })
})
