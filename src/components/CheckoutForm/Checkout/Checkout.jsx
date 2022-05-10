import React, { useState, useEffect } from 'react'
// * Material UI
import { Paper, Stepper, Step, StepLabel, CircularProgress, Divider, Button, Typography } from "@material-ui/core";
// * Commerce API
import { commerce } from '../../../lib/commerce';
// * Styles
import useStyles from "./Styles";
import { ConfirmationNumber } from '@material-ui/icons';
//  * ste Components
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping Address', 'Payment details']



const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
        const generateToken = async () => {

            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                console.log(token, "token");
                setCheckoutToken(token)
            } catch (error) {

            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((previousStep) => previousStep + 1);
    const backStep = () => setActiveStep((previousStep) => previousStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation Component
        </div>
    )

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />

    //  * JS Returned
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>

            </main>
        </>
    )
}

export default Checkout
