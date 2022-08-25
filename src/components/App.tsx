import React, {FC} from 'react';
import {Typography} from "@mui/material";
import Bookmarks from "./Bookmarks";

interface AppProps {
    path: string;
}
const App:FC<AppProps> = () => (
    <div>
        <Bookmarks/>
    </div>
);

export default App;
