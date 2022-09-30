import React, {FC} from 'react';
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
