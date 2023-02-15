import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.callback(newTitle.trim())
        } else {
            setError('Название обязательно!')
        }
        setNewTitle('')
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={newTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}