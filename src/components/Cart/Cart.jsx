import React from 'react'
//  * Material
import { Container, Typography, Button, Grid } from "@material-ui/core";
// * Components
import CartItem from "./CartItem/CartItem"
//  * Styles
import useStyles from './styles';
//  * Router 
import { Link } from 'react-router-dom';
const Cart = ({ cart, handleUpdateCartQt, handleRemoveCartQt, handleEmpty }) => {
    // const isEmpty = true;
    const classes = useStyles()

    // * SubComponents
    const EmptyCart = () =>
    (
        <>
            <Typography variant='subtitle1'>Empty cart 😪,
                <Link className={classes.link}> Start adding cool stuff to your car</Link>
            </Typography>
        </>
    );

    const FilledCart = () => (<>
        <Grid container spacing={3} >
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQt} onRemoveFromCart={handleRemoveCartQt} />

                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmpty}>Empty Cart</Button>

                <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary' component={Link} to="/checkout" >Checkout</Button>
            </div>
        </div>
    </>);


    if (!cart.total_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} gutterBottom variant="h3">Your Shopping Cart</Typography>
            {!cart.total_items ? <EmptyCart /> : <FilledCart />}

        </Container>
    )
}

export default Cart
