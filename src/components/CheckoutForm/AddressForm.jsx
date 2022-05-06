import React, { useState, useEffect } from "react";
//  * Material 
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
// */React Form hook
import { useForm, FormProvider } from 'react-hook-form';
// * Form Input
import FormInput from './CustomTextField';
// * Commerce
import { commerce } from '../../lib/commerce';
import { TrackChangesTwoTone } from "@material-ui/icons";

const AddressForm = ({ checkoutToken }) => {

    // * States
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingSubDivision, setShippingSubDivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();


    // const countries = Object.entries(shippingCountries).map(([code , names]) => ({id: code , label: names});
    const countries = Object.entries(shippingCountries).map(([code, names]) => ({ id: code, label: names }));
    const subDivisions = Object.entries(shippingSubDivisions).map(([code, names]) => ({ id: code, label: names }));
    // * Use Commerce   

    // ? Get the list of countries where shipment is available  
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }
    // ? Get the subdivision of the countries, in the case of the us, get all the states
    const fetchSubDivisions = async (countryCode) => {
        const { subDivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubDivisions(subDivisions);
        setShippingSubDivision(Object.keys(subDivisions)[0]);
    }

    //  * Get the with available shipping after rendering 
    //  ? Type, componentDidMount
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)

    }, []);

    // * Is acceptable to use more than one useEffect()
    useEffect(() => {
        if (shippingCountry) fetchSubDivisions(shippingCountry)
        // * This is a dependency for useEffect, if "shippingCountry" changes
        // * the effect will be re-run
    }, [shippingCountry]);


    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit="">
                    <Grid container spacing={3}>

                        <FormInput required name='firstName' label='First Name' />
                        <FormInput required name='lastName' label='Last Name' />
                        <FormInput required name='address' label='Address' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='city' label='City' />
                        <FormInput required name='zipCode' label='Zip code' />
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
                        <InputLabel>Shipping sub-division</InputLabel>
                        <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)}>
                            {subDivisions.map((subDivision) => (
                                <MenuItem key={subDivision.id} value={subDivision.id}>
                                    {subDivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={ } fullWidth onChange={ }>
                            <MenuItem key={ } value={ }>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid> */}
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
