import './style.css'

import { create } from '../utilities'
import Visualization from '../visualization/component'
import Tooltip from '../tooltip/component';

let tooltip: Tooltip

const component = (...visualizations: Visualization[]) => {

    const comp = create('div', 'Content')

    visualizations.forEach((visualization) => comp.appendChild(visualization.get_html()))

    tooltip = new Tooltip()
    comp.appendChild(tooltip.get_html())  

    return comp
};

export default component
export {
    tooltip as Tooltip
}