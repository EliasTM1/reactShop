import React, { useState, useEffect } from "react";
// * Commerce
import { commerce } from "./lib/commerce";
// * Components
import { Products, NavBar, Cart, Checkout } from "./components";
// * Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const handleUpdateCartQt = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart);
    }

    const handleRemoveCartQt = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart);
    }

    const handleEmpty = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            console.log('monos');
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log({ cart })
    // console.log(cart.line_items)
    console.log({ products })

    return (
        <>
            <Router>
                <NavBar totalItems={cart.total_items} />
                <Routes>
                    <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}>
                    </Route>
                    <Route
                        exact
                        path="/cart"
                        element={<Cart cart={cart}
                            handleUpdateCartQt={handleUpdateCartQt}
                            handleRemoveCartQt={handleRemoveCartQt}
                            handleEmpty={handleEmpty}

                        />}>
                    </Route>
                    <Route
                        exact
                        path="/checkout"
                        element={<Checkout
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage} />}
                    >
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
