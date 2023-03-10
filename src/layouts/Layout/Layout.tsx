import {FC} from 'react';

import Header from '../Header/Header';
import {LayoutProps} from './Layout.props';
import {Container} from "@mui/material";

export const Layout: FC<LayoutProps> = ({children}): JSX.Element => {
    return (
        <Container maxWidth="md">
            <Header/>
            <main>
                {children}
            </main>
        </Container>
    );
};
