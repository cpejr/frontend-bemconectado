import React, { useState } from 'react';
import Total from "./Total";
import Month from "./Month";
import PropTypes from 'prop-types';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className="d-flex flex-column"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
    },
    textName: {
        backgroundColor: "#333"
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = createMuiTheme({
        palette: {
            primary: {main:'#333'},
            secondary: {main:'#fff'}
        }
    });

    return (
        <div className={classes.root}>
            <AppBar style={{ position: 'static', backgroundColor: "#fff" }}>
                <MuiThemeProvider muiTheme={theme}>
                    <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Gráfico Anual" {...a11yProps(0)} />
                        <Tab label="Gráfico Mensal" {...a11yProps(1)} />
                    </Tabs>
                </MuiThemeProvider>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Total />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Month />
            </TabPanel>
        </div>
    );
}