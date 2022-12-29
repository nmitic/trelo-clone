import {Card, MODES} from "../Card/Card"
import {ACTIONS} from "../../service"
import style from './List.module.css'

export const List = ({listItem, dispatch, boardData}) => {
    const {cards, label, id: listId} = listItem

    return (
        <div>
            <div className={style.List}>
                <h4 className={style.ListLabel}>{label}</h4>
                {
                    cards.map((cardItem) => {
                        const {id: cardId} = cardItem

                        return (
                            <Card
                                key={cardId}
                                cardItem={cardItem}
                                boardData={boardData}
                                onSave={content => {
                                    dispatch({
                                        type: ACTIONS.UPDATE_CARD,
                                        payload: {
                                            content,
                                            cardId,
                                            listId
                                        }
                                    })
                                }}
                                onMove={({listIdDestination, position, cardItem}) => {
                                    dispatch({
                                        type: ACTIONS.MOVE_CARD,
                                        payload: {
                                            listIdOrigin: listId,
                                            listIdDestination,
                                            position,
                                            cardItem,
                                        }
                                    })
                                }}
                            />
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
                            type: ACTIONS.ADD_CARD,
                            payload: {
                                content,
                                listId
                            }
                        })
                    }}
                />
            </div>
        </div>
    )
}