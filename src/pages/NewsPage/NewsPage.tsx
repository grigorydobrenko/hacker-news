import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button, Card, Container, Divider, Link, Paper, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {fetchComments, fetchSingleNews} from "../../store/newsReducer";
import Header from "../../layouts/Header/Header";

export const NewsPage = (): JSX.Element => {

        const {id} = useParams()

        const navigate = useNavigate()

        const dispatch = useAppDispatch()
        const currentNews = useAppSelector(state => state.news.currentNews)
        const comments = useAppSelector(state => state.news.comments)

        const onClickHandler = (kids: number[]) => {
            dispatch(fetchComments(kids))
        }

        const backHandler = () => {
            navigate('../')
        }

        useEffect(() => {
            if (id) {
                dispatch(fetchSingleNews(id))
            }
        }, [])


        return (
            <Container maxWidth="md">
                <Header>
                    <div>
                        <Button color="inherit" onClick={() => {
                            if (currentNews) {
                                dispatch(fetchComments(currentNews.kids))
                            }
                        }}>Update comments</Button>
                        <Button onClick={backHandler} color='inherit'>
                            Back to news
                        </Button>
                    </div>
                </Header>
                <Card>
                    <Typography gutterBottom sx={{padding: '12px', marginBottom: '0', textAlign: 'left'}}>
                        {currentNews?.title}
                    </Typography>
                    <Divider/>
                    <Link href={currentNews?.url} component="a" style={{textAlign: 'left'}}>
                        {currentNews?.url}
                    </Link>
                    <Container sx={{display: 'flex', padding: '10px', gap: '10px'}}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {currentNews?.score} points
                        </Typography>
                        <Typography variant="body2" component="p" sx={{display: 'flex', gap: '20px'}}>
                            <span>by {currentNews?.by}</span>
                        </Typography>
                    </Container>
                    <Container>
                        {comments?.map(item => <Paper key={item.id}
                                                      onClick={() => onClickHandler(item.kids)}>{item.text}</Paper>)}
                    </Container>
                </Card>

            </Container>

        );
    }
;

export default NewsPage;