import React, {useCallback} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    withRouter
} from "react-router-dom";
import MainInfo from "./main-info/MainInfo";
import Comments from "./comments/Comments";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TabPanel from "./tab-panel/TabPanel";
import PieChart from "../chart/Chart";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function RepoDetails(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { state: { row } = { row: {} } }= props.location;

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    });

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Details" />
                <Tab label="Comments" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <MainInfo>
                    {/* @TO_DO make request for langs on direct access to details page */}
                    <PieChart data={row.languages.edges.map(item => ({color: item.node.color, value: item.size, title: item.node.name}))}/>
                </MainInfo>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Comments></Comments>
            </TabPanel>
        </Paper>
    );
}

export default withRouter(RepoDetails);