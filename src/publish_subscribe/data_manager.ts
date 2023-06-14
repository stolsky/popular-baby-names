import { TNamesPerYear, TPositionRange, TTimePeriod } from '../components/shared_types'
import first_names from './first_names_per_year.json'
import { notify } from './broker'

let data_base = first_names
    .filter((data_set) => !data_set.year.includes('O'))
    .reverse()
let current_index: number
let current_data_set = {} as TNamesPerYear
let previous_data_set = {} as TNamesPerYear

const change_index_by_value = (value: number) => {
    let notify_subscribers = true
    previous_data_set = data_base[current_index]
    current_index = current_index + value
    if (current_index < 0) {
        current_index = 0
        notify_subscribers = false
    } else if (current_index > data_base.length - 1) {
        current_index = data_base.length - 1
        notify_subscribers = false
    }
    current_data_set = data_base[current_index]

    if (notify_subscribers) {
        notify()
    }
}

const decrement_index = () => change_index_by_value(-1)

const get_current_data_set = () => current_data_set
const get_current_index = () => current_index
const get_previous_data_set = () => previous_data_set

const get_positions_range = () => {
    const positions = data_base.at(0)?.girls.map((girl) => girl.pos) ?? [0]
    return {
        first: Math.min(...positions),
        last: Math.max(...positions)
    } as TPositionRange
}

const get_time_period = () => ({
    start: new Date(data_base.at(0)?.year ?? "0"),
    end: new Date(data_base.at(-1)?.year ?? "0")
}) as TTimePeriod

const increment_index = () => change_index_by_value(1)

const reset = () => {
    current_index = 0
    previous_data_set = {} as TNamesPerYear
    current_data_set = data_base[current_index]
    notify()
}

const validate_class_name = (class_name: string) => class_name
    .replace(/\//, '-')
    .replace(/\(/g, '')
    .replace(/\)/g, '')

export {
    decrement_index,
    get_current_data_set,
    get_current_index,
    get_previous_data_set,
    get_positions_range,
    get_time_period,
    increment_index,
    reset,
    validate_class_name
}
