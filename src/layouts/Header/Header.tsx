import React, {ReactNode} from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const Header: React.FC<Props> = ({children}) => {

    return (
        <Box sx={{flexGrow: 1, marginBottom: '20px'}}>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div">
                        Hacker News
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

type Props = {
    children: ReactNode;
}
