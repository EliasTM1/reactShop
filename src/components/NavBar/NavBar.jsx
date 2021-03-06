import React from 'react'
// * Material components
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
// * ICONS
import { ShoppingCart } from "@material-ui/icons";
// * Logo
import logo from '../../assets/market.png';
//  * Router
import { Link, useLocation } from 'react-router-dom';
//  * Styles
import useStyles from './styles';

const NavBar = ({ totalItems }) => {
    const classes = useStyles()
    const location = useLocation();


    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color="inherit">
                        <img src={logo} alt='Commerce.js' height="25px" className={classes.image} />
                        Commerce.js <hgroup></hgroup>
                    </Typography>
                    <div className={classes.gorw} />
                    {location.pathname === '/' && (
                        <div className={classes.button} >
                            <IconButton component={Link} to="/cart" aria-label='Show cart items' color='inherit'>
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar
