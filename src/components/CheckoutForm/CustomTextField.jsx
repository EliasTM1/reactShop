import React from "react";
// * Material UI
import { Grid, TextField, Input } from "@material-ui/core";
// * React-hook-form
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }) => {
    //  * Get access to the methods insider 
    const { control } = useFormContext();
    //  ? REACT_HOOK_FORMS
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                // render={({ field }) => (
                //     <Select{...field}>
                //         <MenuItem value={10}>Ten</MenuItem>
                //         <MenuItem value={20}>Cinque</MenuItem>
                //     </Select>
                // )}
                render={({ field }) => <Input {...field} placeholder={label} />}
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required

            />
        </Grid>
    );
};

export default FormInput;
