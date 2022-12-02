import React, {useState} from 'react';
import './App.css';
import {Counter} from './components/Сounter/Сounter';

function App() {
    let [value, setValue] = useState<number>(0)
    let [initialValue, setInitialValue] = useState<number>(0)
    let [finalValue, setFinalValue] = useState<number>(5)

    return (
        <div className="App">
            {/*<div>*/}
            {/*    <h3>What to learn</h3>*/}
            {/*    <div>*/}
            {/*        <input/>*/}
            {/*        <button>+</button>*/}
            {/*    </div>*/}
            {/*    <ul>*/}
            {/*        <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
            {/*        <li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
            {/*        <li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            {/*    </ul>*/}
            {/*    <div>*/}
            {/*        <button>All</button>*/}
            {/*        <button>Active</button>*/}
            {/*        <button>Completed</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div>
                <Counter
                    value={value}
                    setValue={setValue}
                    initialValue={initialValue}
                    setInitialValue={setInitialValue}
                    finalValue={finalValue}
                    setFinalValue={setFinalValue}
                />
            </div>
        </div>
    );
}

export default App;
