import React, { useState, useEffect } from "react";
//  * Router
import { Link } from 'react-router-dom';
//  * Material 
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
// */React Form hook
import { useForm, FormProvider } from 'react-hook-form';
// * Form Input
import FormInput from './CustomTextField';
// * Commerce
import { commerce } from '../../lib/commerce';


const AddressForm = ({ checkoutToken, next }) => {

    // * States
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingSubDivision, setShippingSubDivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, names]) => ({ id: code, label: names }));
    const subdivisions = Object.entries(shippingSubDivisions).map(([code, names]) => ({ id: code, label: names }));
    const options = shippingOptions.map((sO) => ({ id: sO, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    // * Use Commerce   
    // ? Get the list of countries where shipment is available  

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    // ? Get the subdivision of the countries, in the case of the us, get all the states

    const fetchSubDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubDivisions(subdivisions);
        setShippingSubDivision(Object.keys(subdivisions)[0]);
    }

    // ? Get all the available shipping options from the API
    const fetchShippingActions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    //  * Get the with available shipping after rendering 

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);
    useEffect(() => {
        if (shippingCountry) fetchSubDivisions(shippingCountry)
    }, [shippingCountry]);
    useEffect(() => {
        if (shippingSubDivision) fetchShippingActions(checkoutToken.id, shippingCountry, shippingSubDivision)
    }, [checkoutToken.id, shippingCountry, shippingSubDivision]);

    //  * Render method
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubDivision, shippingOption }))} >
                    <Grid container spacing={3}>

                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zipCode' label='Zip code' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivisions</InputLabel>
                        <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                            {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back To Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
