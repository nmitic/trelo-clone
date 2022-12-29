import { List } from './List'
export default {
    title: 'board/components/List',
    component: List,
    // argTypes: {
    //     mode: {
    //         options: [MODES.DISPLAY, MODES.EDIT, MODES.EMPTY],
    //         control: { type: 'select' }
    //     },
    // },
}

export function ListStory(args) {
    return <List {...args} />
}

ListStory.args = {
    cards: [{content: 'Dance'}, {content: 'Jump'}]
}