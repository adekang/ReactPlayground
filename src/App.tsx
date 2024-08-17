import ReactPlayground from './ReactPlayground';
import {PlaygroundProvider} from "./ReactPlayground/PlaygroundContext.tsx";
import './App.scss'

function App() {

    return (
        <PlaygroundProvider>
            <ReactPlayground/>
        </PlaygroundProvider>
    )
}

export default App
