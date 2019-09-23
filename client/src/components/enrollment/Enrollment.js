import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { FormGroup, Typography, Button, Paper, Input } from "@material-ui/core";
import axios from "axios";

import styles from "../styles/formStyles";

class Enrollment extends Component {
    state = {
        file: null,
        fileResponse: null
    };
    componentDidMount() {}
    componentDidUpdate(prevProps) {}

    handleUploadFile = e => {
        if (e.target.files) {
            const file = e.target.files[0];
            this.setState({ file });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        // First Parse the File into String
        if (this.state.file) {
            const reader = new FileReader();
            reader.onload = evt => {
                const fileString = evt.target.result;
                // console.log("FILE AS STRING", fileString);
                const postObj = { fileString, fileName: this.state.file.name };
                this.postFileToServer("/api/enrollment", postObj);
            };
            reader.readAsText(this.state.file);
        }
    };

    postFileToServer = (url, content) => {
        axios
            .post(url, content)
            .then(({ data }) => {
                console.log(
                    "DATA RECEIVED FROM SUBMITTING ENROLLMENT FILE",
                    data
                );
                this.setState({ fileResponse: data });
                // TODO FIRE AN ACTION AND OR A SNACKBAR MESSAGE TO NOTIFY USER THAT ACTION IS COMPLETE!
            })
            .catch(err => {
                console.error(
                    "FAILURE SUBMITTING ENROLLMENT FILE",
                    err.message,
                    err
                );
                // TODO FIRE AN ACTION AND OR A SNACKBAR MESSAGE TO NOTIFY USER OF THE FAILURE!
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.root}>
                <Typography variant="h5" className={classes.formHeader}>
                    Enrollment Information
                </Typography>
                <Typography variant="subtitle1" className={classes.formHeader}>
                    Please upload the enrollment data by clicking Upload CSV
                </Typography>
                <Paper className={classes.formContentPaper}>
                    <FormGroup row className={classes.formRow}>
                        <input
                            accept=".csv"
                            className={classes.hiddenInput}
                            id="enrollment-file-input"
                            multiple
                            type="file"
                            onChange={this.handleUploadFile}
                        />
                        <label htmlFor="enrollment-file-input">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                className={classes.button}
                            >
                                Upload CSV
                            </Button>
                        </label>
                        <Typography
                            variant="subtitle1"
                            gutterBottom={false}
                            className={classes.fieldDescription}
                        >
                            File Name:{" "}
                            <span>
                                {this.state.file && this.state.file.name}
                            </span>
                        </Typography>
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
                    </FormGroup>
                </Paper>
                {this.state.fileResponse ? (
                    <Paper className={classes.formContentPaper}>
                        <FormGroup row className={classes.formRowLeft}>
                            <Typography
                                variant="subtitle1"
                                className={classes.formHeaderLeft}
                            >
                                Headers Found:{" "}
                                <span>
                                    {this.state.fileResponse.headersFound &&
                                        this.state.fileResponse.headersFound.join(
                                            " | "
                                        )}
                                </span>
                            </Typography>
                            <FormGroup
                                row
                                className={classes.formRowLeft}
                            ></FormGroup>
                            <Typography
                                variant="subtitle1"
                                className={classes.formHeaderLeft}
                            >
                                Total Records Processed:{" "}
                                <span>
                                    {this.state.fileResponse
                                        .totalRecordsProcessed &&
                                        this.state.fileResponse
                                            .totalRecordsProcessed}
                                </span>
                            </Typography>
                            <FormGroup
                                row
                                className={classes.formRowLeft}
                            ></FormGroup>
                            <Typography
                                variant="subtitle1"
                                className={classes.formHeaderLeft}
                            >
                                Duplicate Records Found:{" "}
                                <span>
                                    {this.state.fileResponse
                                        .totalDuplicateRecords &&
                                        this.state.fileResponse
                                            .totalDuplicateRecords}
                                </span>
                            </Typography>
                        </FormGroup>
                    </Paper>
                ) : null}
            </form>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Enrollment));
