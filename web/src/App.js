
import Landing from './Screen/landing';
import Login from './Screen/login';
import SignUp from './Screen/signup';
import { BrowserRouter as Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default App