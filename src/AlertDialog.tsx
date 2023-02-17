import React from 'react';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type AlertDialogPropsType = {
    dialogTitle: string
    callback: () => void
}

export function AlertDialog(props: AlertDialogPropsType) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseNo = () => {
        setOpen(false);
    };

    const handleCloseYes = () => {
        props.callback()
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen} aria-label="delete">
                <Delete/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleCloseNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" variant={'body2'}>
                    {`Вы действительно хотите удалить ${props.dialogTitle}?`}
                </DialogTitle>
                {/*<DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>*/}
                <DialogActions style={{justifyContent: 'center', columnGap: '20px'}}>
                    <Button onClick={handleCloseNo} variant={'contained'} color={'error'}>No</Button>
                    <Button onClick={handleCloseYes} autoFocus variant={'contained'} color={'success'}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}