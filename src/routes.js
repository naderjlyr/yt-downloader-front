import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Searches from "./pages/searches";
import queryString from 'query-string';
import Results from "./pages/results";
import SingleMusic from "./components/single_music";

const AppRoutes = () => (

    <Router>

        <Route exact path="/">
            <Searches/>
        </Route>
        {/*<Route path="/test" render={(props) => console.log(queryString.parse(props.location.search))}/>*/}
        <Route path="/search" render={(props) => <Results query={queryString.parse(props.location.search)}/>}/>
        <Route path="/test" component={SingleMusic}/>
    </Router>
)

export default AppRoutes


