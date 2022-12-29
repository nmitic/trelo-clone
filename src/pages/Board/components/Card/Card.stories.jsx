import React from "react";

import { Card } from './Card'

export default {
    title: 'board/components/Card',
    component: Card,
    // argTypes: {
    //     mode: {
    //         options: [MODES.DISPLAY, MODES.EDIT, MODES.EMPTY],
    //         control: { type: 'select' }
    //     },
    // },
}

export function Display(args) {
    return <Card {...args} />
}

// Display.args = {
//     mode: MODES.DISPLAY
// }