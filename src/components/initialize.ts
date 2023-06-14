import { get_positions_range, get_time_period, reset as reset_data_manager } from '../publish_subscribe/data_manager'
import { Theme, subscribe } from '../publish_subscribe/broker'

import { create } from './utilities'
import Content from './content/component'
import Controls from './controls/component'
import Title from './title/component'

import Visualization from './visualization/component'
import Table from './visualization/table/component'
import Chart from './visualization/chart/component'

import './style.css'

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

const init = (parent: HTMLElement) => {

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
    subscribe(Theme.Girls, girls_visual.update)

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
    subscribe(Theme.Boys, boys_visual.update)

    const app = create("div", "App")
    app.append(
        Title("Most Popular Baby Names in Germany"),
        Content(
            girls_visual,
            boys_visual
        ),
        Controls()
    )
    parent.appendChild(app)

    reset_data_manager()
}

export default init
