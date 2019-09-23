import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
    TextField,
    MenuItem,
    FormGroup,
    Typography,
    Button,
    Paper
} from "@material-ui/core";
import axios from "axios";

import styles from "../styles/formStyles";

class Registration extends Component {
    state = {
        firstName: "",
        lastName: "",
        npi: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: ""
    };
    componentDidMount() {}
    componentDidUpdate(prevProps) {}
    handleChange = prop => e => {
        this.setState({ [prop]: e.target.value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            npi,
            address1,
            address2,
            city,
            state,
            zip,
            phone,
            email
        } = this.state;
        const postObj = {
            firstName,
            lastName,
            npi,
            address: `${address1} ${address2} ${city}, ${state} ${zip}`,
            phone,
            email
        };
        axios
            .post("/api/providers/registration", postObj)
            .then(({ data }) => {
                console.log("Response from Registration", data);
                // TODO: Dispatch action and or Show Snack Bar Message for user
            })
            .catch(err => {
                console.error(
                    "Error Submitting Registration",
                    err.message,
                    err
                );
                // TODO: Dispatch action and or Show Snack Bar Message for user
            });
        console.log("Submitting");
    };
    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.root}>
                <Typography variant="h5" className={classes.formHeader}>
                    New Provider Registration
                </Typography>
                <Typography variant="subtitle1" className={classes.formHeader}>
                    Please complete the following form and submit.
                </Typography>
                <Paper className={classes.formContentPaper}>
                    <FormGroup row className={classes.formRow}>
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="First Name"
                            helperText="As it appears on your NPI registration"
                            onChange={this.handleChange("firstName")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="Last Name"
                            helperText="As it appears on your NPI registration"
                            onChange={this.handleChange("lastName")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="NPI Number"
                            helperText="As it appears on your NPI registration"
                            onChange={this.handleChange("npi")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="Address Line 1"
                            helperText="The first line of your business mailing address"
                            onChange={this.handleChange("address1")}
                        />
                        <TextField
                            className={classes.formField}
                            type="text"
                            variant="outlined"
                            label="Address Line 2"
                            helperText="The second line of your business mailing address"
                            onChange={this.handleChange("address2")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="City"
                            helperText="The City of your business mailing address"
                            onChange={this.handleChange("city")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="State"
                            helperText="The State of your business mailing address"
                            onChange={this.handleChange("state")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="text"
                            variant="outlined"
                            label="Zip Code"
                            helperText="The Zip Code of your business. 12345 or 12345-1234"
                            onChange={this.handleChange("zip")}
                            inputProps={{
                                pattern: "^[0-9]{5}(?:-[0-9]{4})?$"
                            }}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="tel"
                            variant="outlined"
                            label="Phone Number"
                            helperText="Your business phone number"
                            onChange={this.handleChange("phone")}
                        />
                        <TextField
                            className={classes.formField}
                            required
                            type="email"
                            variant="outlined"
                            label="email"
                            helperText="Your business email address"
                            onChange={this.handleChange("email")}
                        />
                    </FormGroup>

                    <FormGroup row className={classes.formRow}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.submitButton}
                        >
                            Submit
                        </Button>
                    </FormGroup>
                </Paper>
            </form>
        );
    }
}

export default withRouter(
    withStyles(styles, { withTheme: true })(Registration)
);
