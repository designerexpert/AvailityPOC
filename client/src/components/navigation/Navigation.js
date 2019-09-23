import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";

import Logo from "./AvailityLogo";
const styles = theme => ({
    root: {
        display: "flex"
    },

    appBar: {
        height: theme.spacing(7),
        zIndex: 10
    },
    logoContainer: {
        cursor: "pointer",
        width: "100px",
        marginRight: 36
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        height: theme.spacing(7)
    },
    content: {
        flexGrow: 1
        // padding: theme.spacing.unit * 3
    }
});

class Navigation extends Component {
    state = { value: 0 };

    navigate = route => e => {
        if (route === "/") this.setState({ value: 0 });
        else this.setState({ value: 1 });
        this.props.history.push(route);
    };

    handleChange = prop => e => {
        this.setState({ [prop]: e.target.value });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classes.appBar}
                >
                    <Toolbar disableGutters={false}>
                        <div
                            className={classes.logoContainer}
                            onClick={this.navigate("/")}
                        >
                            <Logo />
                        </div>

                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange("value")}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab
                                label="Registration"
                                onClick={this.navigate("/")}
                                value={0}
                            />
                            <Tab
                                label="Enrollment"
                                onClick={this.navigate("/enrollment")}
                                value={1}
                            />
                        </Tabs>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Navigation));
