import React, {useState, useEffect, createRef} from 'react';
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage}, i, active}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop -50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    },[]);

    useEffect(() => {
        if(i === active && elRefs[active]) {
            scrollToRef(elRefs[active]);
        }
    }, [i, active, elRefs]);

    return (
        <Card ref={elRefs[i]} className={classNames(classes.card, active === i ? classes.activeCard : null)}  >
            <CardActionArea href={url} target="_blank" >
                <CardMedia className={classes.media} image={urlToImage || 'https://img.favpng.com/3/13/7/logo-portable-network-graphics-news-banner-brand-png-favpng-gNDeCvf2NzrNytuxkRPdrEyMw.jpg' } />
                <div className={classes.details}>
                    <Typography variant='body2' color="textSecondary" component="h2" > {(new Date(publishedAt)).toDateString()} </Typography>
                    <Typography variant='body2' color="textSecondary" component="h2" > {source.name} </Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" >  {title} </Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"> {description} </Typography>
                </CardContent>  
            </CardActionArea>
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
