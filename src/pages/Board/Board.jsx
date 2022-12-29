import {List} from './components/List/List'
import style from './Board.module.css'
import {useReducer, useState} from "react";
import {ListAddNew} from "./components/ListAddNew/ListAddNew";

const MOCK_DATA = [
    {
        id: 'listID',
        label: 'open',
        cards: [
            {
                id: 'cardIdone',
                content: 'dance'
            },
            {
                id: 'cardId two',
                content: 'jump'
            },
            {
                id: 'cardId three',
                content: 'kiss'
            }
        ]
    },
    {
        id: 'listIDtwo',
        label: 'progress',
        cards: [
            {
                id: 'cardId four',
                content: 'love'
            },
            {
                id: 'cardId five',
                content: 'be kind'
            }
        ]
    },
    {
        id: 'listIDthre',
        label: 'done',
        cards: [
            {
                id: 'cardId six',
                content: 'play'
            },
            {
                id: 'cardId seven',
                content: 'run'
            }
        ]
    }
]

const getMovedBoard = (
    listIdOrigin,
    listIdDestination,
    position,
    cardItem,
    boardData
) => {
    const {id: cardId} = cardItem

    return boardData.map(list => {
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

const getUpdatedCardBoard = (content, cardId, listId, boardData) => {
    console.log(content, cardId, listId)
    return boardData.map(list => {
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

const getAddedCardBoard = (card, destinationListId, boardData) => {
    console.log(card, destinationListId)
    return boardData.map(list => {
        // locate card's list
        if (list.id === destinationListId) {
            list.cards = [...list.cards, card]
        }

        return list
    })
}

const getAddedListBoard = (listItem, boardData) => {
    return [...boardData, listItem]
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'MOVE_CARD':
            return getMovedBoard(
                action.payload.listIdOrigin,
                action.payload.listIdDestination,
                action.payload.position,
                action.payload.cardItem,
                state)
        case 'UPDATE_CARD':
            return getUpdatedCardBoard(
                action.payload.content,
                action.payload.cardId,
                action.payload.listId,
                state
            )
        case 'ADD_CARD':
            return getAddedCardBoard(
                {
                    content: action.payload.content,
                    id: Date.now().toString() // naive way, should be done on BE
                },
                action.payload.listId,
                state
            )
        case 'ADD_LIST':
            return getAddedListBoard(
                {
                    label: action.payload.content,
                    id: Date.now().toString(), // naive way, should be done on BE
                    cards: []
                },
                state
            )
        default:
            throw new Error()
    }
}


export const Board = () => {
    const [boardData, dispatch] = useReducer(reducer, MOCK_DATA)

    return <div className={style.Board}>
        {
            boardData.map(listItem =>
                <List
                    listItem={listItem}
                    dispatch={dispatch}
                    boardData={boardData}
                />
            )
        }
        <ListAddNew
            onAddNew={content => {
                dispatch({
                    type: 'ADD_LIST',
                    payload: {content}
                })
            }}
        />
    </div>
}