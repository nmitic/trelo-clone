import {useState} from 'react';

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
            <div>{content}</div>
            <button onClick={() => setMode(MODES.EDIT)}>edit</button>
            <button onClick={() => setMode(MODES.MOVE)}>move</button>
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
            <input ref={input => input && input.focus()} type='text' value={content} onChange={handleContentChange}/>
            <button type='button' onClick={() => setMode(MODES.DISPLAY)}>Cancel</button>
            <button type='submit'>save</button>
        </form>
    )
}

export const Empty = ({setMode, label}) => {
    return (
        <div>
            <button onClick={() => setMode(MODES.ADD_NEW)}>{label}</button>
        </div>
    )
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
        <button type='submit'>Move</button>
        <button type="button" onClick={() => setMode(MODES.DISPLAY)}>Cancel</button>
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
            <input ref={input => input && input.focus()} type='text' value={content} onChange={handleContentChange}/>
            <button type='button' onClick={() => setMode(MODES.EMPTY)}>Cancel</button>
            <button type='submit'>save</button>
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