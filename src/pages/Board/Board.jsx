import {List} from './components/List/List'
import style from './Board.module.css'
import {useEffect, useReducer} from "react";
import {ListAddNew} from "./components/ListAddNew/ListAddNew";
import {ACTIONS, reducer} from "./service";

export const Board = () => {
    const localData = localStorage.getItem('data')
    const [boardState, dispatch] = useReducer(reducer, {data: JSON.parse(localData), boardFetched: true})
    const {data, boardFetched} = boardState

    // Update remote only on user dispatched actions by checking boardFetched flag
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
        if (!boardFetched) {
            fetch("http://localhost:3000/userBoards/boardId/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({data})
            })
                .then(res => res.json())
                .then(result => console.log(result))
                .catch(console.log);
        }
    }, [boardState])

    // Fetch board data from remote only if board is not persistent in local storage
    useEffect(() => {
        if (!localData) {
            fetch("http://localhost:3000/userBoards/boardId")
                .then(res => res.json())
                .then(({data}) => {
                        dispatch({
                            type: 'SET_INITIAL_BOARD_STATE',
                            payload: {data, boardFetched: true}
                        })
                    }
                )
                .catch(console.log)
        }
    }, [])

    return <div className={style.Board}>
        {
            data && data.map(listItem =>
                <List
                    listItem={listItem}
                    dispatch={dispatch}
                    boardData={data}
                    key={listItem.id}
                />
            )
        }
        <ListAddNew
            onAddNew={content => {
                dispatch({
                    type: ACTIONS.ADD_LIST,
                    payload: {content}
                })
            }}
        />
    </div>
}