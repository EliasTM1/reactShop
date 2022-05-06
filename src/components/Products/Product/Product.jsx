import React from 'react'
// * Material-ui
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Rating } from '@material-ui/core';
// * Material-icons
import { AddShoppingCart } from "@material-ui/icons";
// * Styles
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    //  * Hook Initialization 
    const classes = useStyles();
    return (

        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' >
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='textSecondary' />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to the card" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>


            </CardActions>
        </Card>
    )
}

export default Product
