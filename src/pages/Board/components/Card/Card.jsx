import {useState} from 'react'
import style from './Card.module.css'

export const MODES = {
    DISPLAY: 'DISPLAY',
    EDIT: 'EDIT',
    EMPTY: 'EMPTY',
    MOVE: 'MOVE',
    ADD_NEW: 'ADD_NEW'
}

export const Display = ({cardItem: {content}, setMode}) => {
    return (
        <div>
            <div className={style.Content}>{content}</div>
            <button className={style.EditBtn} onClick={() => setMode(MODES.EDIT)}>edit</button>
            <button className={style.ModeBtn} onClick={() => setMode(MODES.MOVE)}>move</button>
        </div>
    )
}

export const Edit = ({setMode, cardItem, onSave}) => {
    const {content: initialContent} = cardItem
    const [content, setContent] = useState(initialContent)

    const handleContentChange = e => {
        setContent(e.target.value)
    }

    const handleSave = (e) => {
        e.preventDefault();
        setMode(MODES.DISPLAY)
        onSave(content)
    }
    return (
        <form onSubmit={handleSave}>
            <textarea
                ref={input => input && input.focus()}
                className={style.TextArea}
                value={content}
                onChange={handleContentChange}
            />
            <button className={style.CancelBtn} type='button' onClick={() => setMode(MODES.DISPLAY)}>Cancel</button>
            <button className={style.SaveBtn} type='submit'>save</button>
        </form>
    )
}

export const Empty = ({setMode, label}) => {
    return <button className={style.AddNewBtn} onClick={() => setMode(MODES.ADD_NEW)}>{label}</button>
}

export const Move = ({cardItem, setMode, boardData, onMove}) => {
    const [position, setPosition] = useState('')
    const [listIdDestination, setListIdDestination] = useState(boardData[0].id)
    const [selectedList, setSelectedList] = useState(boardData[0])

    const handleListDestinationSelect = e => {
        setListIdDestination(e.target.value)
        setSelectedList(boardData.find(list => list.id === e.target.value))
    }

    const handlePositionSelect = e => {
        setPosition(e.target.value)
    }

    const handleMove = (e) => {
        e.preventDefault()

        setMode(MODES.DISPLAY)
        onMove({listIdDestination, position, cardItem})
    }
    return <form onSubmit={handleMove}>
        <label className={style.Label}>
            Position:
            <select
                value={position}
                onChange={handlePositionSelect}
            >
                {
                    selectedList.cards.map((card, index) => {
                        return <option
                            value={index}
                            key={card.id}
                            onChange={handlePositionSelect}
                        >
                            {index + 1}
                        </option>
                    })
                }
                <option
                    value={selectedList.cards.length + 1}
                    onChange={handlePositionSelect}
                >
                    {selectedList.cards.length + 1}
                </option>
            </select>
        </label>
        <label className={style.Label}>
            List:
            <select
                value={listIdDestination}
                onChange={handleListDestinationSelect}
            >
                {
                    boardData.map(list => {
                        return <option value={list.id} key={list.id}>{list.label}</option>
                    })
                }
            </select>
        </label>
        <button className={style.ModeBtn} type='submit'>Move</button>
        <button className={style.CancelBtn} type="button" onClick={() => setMode(MODES.DISPLAY)}>Cancel</button>
    </form>
}


export const AddNew = ({setMode, onAddNew}) => {
    const [content, setContent] = useState('')

    const handleContentChange = e => {
        setContent(e.target.value)
    }

    const handleSave = (e) => {
        e.preventDefault();
        setMode(MODES.EMPTY)
        onAddNew(content)
    }
    return (
        <form onSubmit={handleSave}>
            <textarea
                className={style.TextArea}
                ref={input => input && input.focus()} // focus on render
                value={content}
                onChange={handleContentChange}
            />
            <button className={style.CancelBtn} type='button' onClick={() => setMode(MODES.EMPTY)}>Cancel</button>
            <button className={style.SaveBtn} type='submit'>save</button>
        </form>
    )
}
export const Card =
    ({
         cardItem,
         boardData,
         initialMode = MODES.DISPLAY,
         onSave,
         onAddNew,
         onMove
     }) => {
        const [mode, setMode] = useState(initialMode)
        const renderCardMode = () => {
            switch (mode) {
                case MODES.DISPLAY:
                    return <Display cardItem={cardItem} setMode={setMode}/>
                case MODES.EDIT:
                    return <Edit
                        setMode={setMode}
                        cardItem={cardItem}
                        onSave={onSave}
                    />
                case MODES.ADD_NEW:
                    return <AddNew
                        setMode={setMode}
                        onAddNew={onAddNew}
                    />
                case MODES.EMPTY:
                    return <Empty setMode={setMode} label='add new card'/>
                case MODES.MOVE:
                    return <Move
                        setMode={setMode}
                        cardItem={cardItem}
                        boardData={boardData}
                        onMove={onMove}
                    />

                default:
                    return null
            }
        }

        return <div className={style.Card}>{renderCardMode()}</div>
    }