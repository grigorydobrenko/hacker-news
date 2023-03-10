import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/hooks";
import {fetchNews} from "../../store/newsReducer";

const Header = (): JSX.Element => {

    const dispatch = useAppDispatch()

    return (
        <Box sx={{flexGrow: 1, marginBottom: '20px'}}>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div">
                        Hacker News
                    </Typography>
                    <Button color="inherit" onClick={() => {
                        dispatch(fetchNews())
                    }}>Update news list</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;