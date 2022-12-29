const getMovedBoard = (
    listIdOrigin,
    listIdDestination,
    position,
    cardItem,
    data
) => {
    const {id: cardId} = cardItem

    return data.map(list => {
        // locate card origin list
        if (list.id === listIdOrigin) {
            // remove card from current list
            list.cards = list.cards.filter(card => card.id !== cardId)
        }

        // locate card destination list
        if (list.id === listIdDestination) {
            // move the card to the new destination if not already moved
            list.cards = [
                ...list.cards.slice(0, position),
                cardItem,
                ...list.cards.slice(position)
            ]
        }

        return list
    })
}

const getUpdatedCardBoard = (content, cardId, listId, data) => {
    return data.map(list => {
        // locate card's list
        if (list.id === listId) {
            // locate card itself
            list.cards.map(card => {
                if (card.id === cardId) {
                    card.content = content
                }
            })
        }

        return list
    })
}

const getAddedCardBoard = (card, destinationListId, data) => {
    return data.map(list => {
        // locate card's list
        if (list.id === destinationListId) {
            list.cards = [...list.cards, card]
        }

        return list
    })
}

const getAddedListBoard = (listItem, data) => {
    return [...data, listItem]
}

export const ACTIONS = {
    MOVE_CARD: 'MOVE_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
    ADD_CARD: 'ADD_CARD',
    ADD_LIST: 'ADD_LIST',
    SET_INITIAL_BOARD_STATE: 'SET_INITIAL_BOARD_STATE'
}

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MOVE_CARD:
            return {
                data: getMovedBoard(
                    action.payload.listIdOrigin,
                    action.payload.listIdDestination,
                    action.payload.position,
                    action.payload.cardItem,
                    state.data),
                boardFetched: false
            }
        case ACTIONS.UPDATE_CARD:
            return {
                data: getUpdatedCardBoard(
                    action.payload.content,
                    action.payload.cardId,
                    action.payload.listId,
                    state.data
                ),
                boardFetched: false
            }
        case ACTIONS.ADD_CARD:
            return {
                data: getAddedCardBoard(
                    {
                        content: action.payload.content,
                        id: Date.now().toString() // naive way, IDs should be assigned on BE and returned back
                    },
                    action.payload.listId,
                    state.data
                ),
                boardFetched: false
            }
        case ACTIONS.ADD_LIST:
            return {
                data: getAddedListBoard(
                    {
                        label: action.payload.content,
                        id: Date.now().toString(), // naive way, IDs should be assigned on BE and returned back
                        cards: []
                    },
                    state.data
                ),
                boardFetched: false
            }
        case ACTIONS.SET_INITIAL_BOARD_STATE:
            return {
                data: action.payload.data,
                boardFetched: action.payload.boardFetched,
            }
        default:
            throw new Error()
    }
}