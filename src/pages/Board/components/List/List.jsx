import {Card, MODES} from "../Card/Card";

export const List = ({listItem, dispatch, boardData}) => {
    const {cards, label, id: listId} = listItem

    return (
        <div>
            <h4>{label}</h4>
            {
                cards.map((cardItem) => {
                    const {id: cardId} = cardItem

                    return (
                        <div>
                            <Card
                                cardItem={cardItem}
                                boardData={boardData}
                                onSave={content => {
                                    dispatch({
                                        type: 'UPDATE_CARD',
                                        payload: {
                                            content,
                                            cardId,
                                            listId
                                        }
                                    })
                                }}
                                onMove={({listIdDestination, position, cardItem}) => {
                                    dispatch({
                                        type: 'MOVE_CARD',
                                        payload: {
                                            listIdOrigin: listId,
                                            listIdDestination,
                                            position,
                                            cardItem,
                                        }
                                    })
                                }}
                            />
                        </div>
                    )
                })
            }
            <Card
                initialMode={MODES.EMPTY}
                listId={listId}
                dispatch={dispatch}
                boardData={boardData}
                onAddNew={content => {
                    dispatch({
                        type: 'ADD_CARD',
                        payload: {
                            content,
                            listId
                        }
                    })
                }}
            />
        </div>
    )
}