import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)

    const editModeActivated = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }
    const editModeDeactivated = () => {
        setEditMode(false)
    }
    const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        props.callback(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                variant={'standard'}
                value={newTitle}
                onChange={onChangeNewTitle}
                onBlur={editModeDeactivated}
                autoFocus
            />
            : <span onDoubleClick={editModeActivated}>{props.title}</span>
    )
}