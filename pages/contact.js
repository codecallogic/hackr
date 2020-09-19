import React, { Component, useState } from 'react';
import {TextField, Select, MenuItem, FormHelperText, FormControl, InputLabel, ThemeProvider, Button} from '@material-ui/core';
import theme from '../styles/theme'

const Contact = ({ classes }) => {
        const [state, setState] = useState({
            name: '',
            email: '',
            category: '',
            question: '',
            buttonText: 'Submit',
        })

        const {name, email, category, question, buttonText} = state

        const handleChange = (name) => (e) => {
            setState({...state, [name]: e.target.value});
        };

        return (
            <ThemeProvider theme={theme}>
            <div className="contactpage">
                <form className="contact" noValidate autoComplete="off">
                    <TextField 
                        id="standard-basic"
                        label="Name"                        
                        value={name}
                        onChange={handleChange('name')}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Email" 
                        type="email"
                        value={email}
                        onChange={handleChange('email')}
                    />
                    <FormControl>
                    <InputLabel 
                        id="demo-simple-select-helper-label"
                        
                        >Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={category}
                        onChange={handleChange('category')}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField 
                        id="standard-basic" 
                        label="Insert question here?" 
                        value={question}
                        onChange={handleChange('question')}
                    />
                    <Button variant="outlined" color="primary">{buttonText}</Button>
                </form>
            </div>
            </ThemeProvider>
        )
}

export default Contact;