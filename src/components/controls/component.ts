import './style.css'

import { create } from '../utilities'
import { increment_index } from '../../publish_subscribe/data_manager';

const component = () => {

    const comp = create('div', 'Controls')

    const button_next = create('span', 'Button Icon icon-next2')
    button_next.addEventListener('click', () => increment_index())

    // const button_previous = create('span', 'Button Icon icon-previous2')
    // button_previous.addEventListener('click', () => decrement_index())

    comp.append(
        // button_previous,
        button_next
    )

    return comp
};

export default component
