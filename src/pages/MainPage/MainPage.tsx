import React, {useEffect} from 'react';
import NewsItem from "../../components/NewsItem/NewsItem";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchNews} from "../../store/newsReducer";
import {Button, CircularProgress, Container} from "@mui/material";
import Header from "../../layouts/Header/Header";

export const MainPage = (): JSX.Element => {

    const dispatch = useAppDispatch()
    const news = useAppSelector(state => state.news.news)
    const status = useAppSelector(state => state.app.status)


    useEffect(() => {

        dispatch(fetchNews())

        const interval = 60000

        let timerId = setInterval(() => {
            dispatch(fetchNews())
        }, interval)

        return () => {
            clearInterval(timerId)
        }

    }, [])


    return (
        <Container maxWidth="md">
            <Header>
                <Button color="inherit" onClick={() => {
                    dispatch(fetchNews())
                }}>Update news list</Button>
            </Header>
            {!(status === 'loading') ?
                <Container disableGutters sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
                    {news?.map((item) => (
                        <NewsItem
                            key={item.id ? item.id : +(new Date())}
                            id={item.id ? item.id : +(new Date())}
                            by={item.by}
                            score={item.score}
                            title={item.title}
                            time={item.time}
                        />
                    ))}
                </Container> :
                <CircularProgress size={120} sx={{marginTop: '300px'}}/>}
        </Container>

    );
};

export default MainPage;