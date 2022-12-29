import {useState} from "react"
import {AddNew, Empty} from "../Card/Card"
import {MODES} from '../Card/Card'
import style from './ListAddNew.module.css'

export const ListAddNew = ({onAddNew}) => {
    const [mode, setMode] = useState(MODES.EMPTY)
    const renderListMode = () => {
        switch (mode) {
            case MODES.ADD_NEW:
                return <AddNew
                    setMode={setMode}
                    onAddNew={((content) => onAddNew(content))}
                />
            case MODES.EMPTY:
                return <Empty
                    setMode={setMode}
                    label='add new list'
                />
        }
    }

    return <div>
        <div className={style.ListAddNew}>{renderListMode()}</div>
    </div>
}