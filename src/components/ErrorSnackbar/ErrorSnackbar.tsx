import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useSelector} from 'react-redux'
import {AppRootStateType} from 'app/store'
import {selectError} from 'app/app.selectors'
import {setAppErrorAC} from 'app/app-reducer'
import {useAppDispatch} from 'hooks/useAppDispatch'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
  // const [open, setOpen] = useState(true)
  const error = useSelector<AppRootStateType, string | null>(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  )
}
