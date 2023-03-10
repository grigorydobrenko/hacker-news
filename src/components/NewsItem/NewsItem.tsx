import React from 'react';
import {Card, Container, Divider, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

const NewsItem: React.FC<Props> = (props) => {

    const {id, by, score, title, time} = props;

    const formattedDate = new Date(time * 1000).toLocaleDateString();

    return (
        <Typography component={RouterLink} to={`/${id}`} sx={{textDecoration: 'none'}}>
            <Card>
                <Typography gutterBottom variant="h5" sx={{padding: '12px', marginBottom: '0', textAlign: 'left'}}>
                    {title ? title : 'NewsPage without title'}
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
        </Typography>
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