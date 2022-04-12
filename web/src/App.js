
import Landing from './Screen/landing';
import Login from './Screen/login';
import SignUp from './Screen/signup';
import Admin from './Screen/admin';
import Manager from './Screen/manager';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlaceManagement from '../src/Screen/placeManagement/PlaceManagement'
function App() {
    return (
        // <div className="App">
        //     <Routes>
        //         <Route path="/" exact element={<Landing />} />
        //         <Route path="login" element={<Login />} />
        //         <Route path="signup" element={<SignUp />} />
        //     </Routes>
        // </div>

        
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/manager" component={Manager} />
                <Route exact path="/admin/placemanagement" component={PlaceManagement}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App