import React from 'react';
import {Card, Container, Divider, Typography} from "@mui/material";

const NewsItem: React.FC<Props> = (props) => {

    const {by, score, title, time} = props;

    const formattedDate = new Date(time * 1000).toLocaleDateString();

    return (
        <Card>
            <Typography gutterBottom variant="h5" sx={{padding: '12px', marginBottom: '0', textAlign: 'left'}}>
                {title ? title : 'News without title'}
            </Typography>
            <Divider/>
            <Container sx={{display: 'flex', padding: '10px', gap: '10px'}}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {score} points
                </Typography>
                <Typography variant="body2" component="p" sx={{display: 'flex', gap: '20px'}}>
                    <span>by {by}</span>
                    <span>date {formattedDate}</span>
                </Typography>
            </Container>
        </Card>
    );
}

export default NewsItem;

type Props = {
    id: number
    by: string
    score: number
    title: string
    time: number
}