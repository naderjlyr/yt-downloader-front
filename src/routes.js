import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import AllVideos from "./pages/all_videos";
import ListVideos from "./components/list_videos";

const AppRoutes = () => (

    <Router>
        <Route exact path="/">
            <AllVideos/>
        </Route>
        <Route exact path="/test">
            <ListVideos/>
        </Route>
    </Router>
)

export default AppRoutes


