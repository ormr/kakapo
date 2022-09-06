import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';

interface PostPreviewProps {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    author: string;
    // image: string;
    // imageLabel: string;
}

const stockImages = [
    'https://traveltimes.ru/wp-content/uploads/2021/05/2262378-1024x683.jpg',
    'https://ruschemicals.com/wp-content/uploads/2021/11/s1200-7.jpg',
    'https://travels.impress.io/app/uploads/sites/3/2020/09/sergey-pesterev-r6FU8zqrgdM-unsplash-1536x1025.jpg',
    'https://placepic.ru/wp-content/uploads/2018/10/572143_main.jpg',
    'https://korona-severa.ru/wp-content/uploads/d/f/7/df795baa94fc629554cdd3228ae35712.jpeg',
    'https://res.klook.com/image/upload/cities/wjjvjtpdjqzdididt8lb.jpg',
];

export const PostPreview: FC<PostPreviewProps> = (props): ReactElement => {
    const {id, title, description, author, createdAt} = props;

    return (
        <Grid item xs={12} md={6}>
            <Link to={id} style={{ textDecoration: 'none' }}>
                <CardActionArea component="a" href="#">
                    <Card sx={{display: 'flex'}}>
                        <CardContent sx={{flex: 1}}>
                            <Typography component="h2" variant="h5">
                                {title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                {createdAt}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Продолжить чтение...
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 160,
                                display: {xs: 'none', sm: 'block'},
                            }}
                            image={stockImages[Math.floor(Math.random() * 5)]}
                            alt="adskjasdkj"
                        />
                    </Card>
                </CardActionArea>
            </Link>
        </Grid>
    );
};
