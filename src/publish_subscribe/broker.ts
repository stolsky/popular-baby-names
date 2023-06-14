import { TNameData, TTimeStrings } from '../components/shared_types'
import { is_empty_string, is_function } from '../components/utilities'
import { get_current_data_set, get_previous_data_set } from './data_manager'

type Subscription = {
    theme: string
    callback: (year: TTimeStrings, data?: TNameData[]) => void
}

enum Theme {
    Girls = 'Girls',
    Boys = 'Boys',
    Year = 'Year'
}

const subscriptions = [] as Subscription[]

const notify = () => subscriptions.forEach((sub) => {
    const { year, girls, boys } = get_current_data_set()
    const { year: last_year } = get_previous_data_set()

    if (sub.theme === Theme.Girls) {
        sub.callback({ now: year, last: last_year }, girls)
    } else if (sub.theme === Theme.Boys) {
        sub.callback({ now: year, last: last_year }, boys)
    } else if (sub.theme === Theme.Year) {
        sub.callback({ now: year })
    }
})

const subscribe = (
    theme: string,
    callback: (year: TTimeStrings, data?: TNameData[]) => void
) => {
    if (!is_empty_string(theme) && is_function(callback)) {
        subscriptions.push({ theme, callback })
    }
}

export {
    Theme,
    notify,
    subscribe
}