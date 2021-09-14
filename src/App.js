import './App.css';
import MTable from "./components/table/Table";
import RepoDetails from "./components/repo-details/RepoDetails";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {useGithub} from "./hooks/useGithub";
import React from "react";
import Appbar from "./components/app-bar/Appbar";

function App() {
    const { loading, error, rows, count, fetchMoreData } = useGithub();

    return <>
            <Appbar />
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <MTable fetchMoreData={fetchMoreData}
                                rows={rows}
                                loading={loading}
                                error={error}
                                count={count}
                        />
                    </Route>
                    <Route path="/details/:id">
                        <RepoDetails />
                    </Route>
                </Switch>
            </Router>
        </>
    ;
}

export default App;