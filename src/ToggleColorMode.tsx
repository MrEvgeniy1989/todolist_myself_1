import useMediaQuery from '@mui/material/useMediaQuery';
import React, {useEffect} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AppWithRedux} from './AppWithRedux';

export const ColorModeContext = React.createContext({toggleColorMode: () => {}});
export const ToggleColorMode = React.memo(() => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let initialMode: 'light' | 'dark' = prefersDarkMode ? 'dark' : 'light'

    const getData = (value: string | null) => {
        if (value) {
            return JSON.parse(value)
        } else {
            return null
        }
    }

    const [mode, setMode] = React.useState<'light' | 'dark'>(getData(localStorage.getItem('mode')) || initialMode);

    useEffect(() => {
        localStorage.setItem('mode', JSON.stringify(mode))
    }, [mode])

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme({palette: {mode},}),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>

                <AppWithRedux/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
})