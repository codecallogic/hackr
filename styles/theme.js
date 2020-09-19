import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            input: {
                fontSize: 16,              
            },
        },
        MuiMenuItem: {
            root: {
                fontSize: 16,               
        }
        },
        MuiInputLabel: {
            root: {
                fontSize: 18,       
        }
        },
        MuiButton: {
            root: {
                fontSize: 14,       
        }
        },
    }
})

export default theme;