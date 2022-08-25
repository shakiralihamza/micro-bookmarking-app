import * as React from "react"
import type {HeadFC} from "gatsby"
import {Router} from '@reach/router'
import App from "../components/App";

const IndexPage = () => {
    return (
        <Router>
            <App path={'/'}/>
        </Router>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Bookmarking App</title>
