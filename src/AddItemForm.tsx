import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';

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
            <TextField
                value={newTitle}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownInputHandler}
                variant={'outlined'}
                error={!!error}
                label={'Новое задание...'}
                helperText={error}
            />
            <IconButton onClick={addTaskHandler}>
                <AddCircle fontSize={'large'} color={'primary'}/>
            </IconButton>
        </div>
    )
}