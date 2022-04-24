import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Screen/landing';
import Login from './Screen/login';
import SignUp from './Screen/signup';
import Admin from './Screen/admin';
import Manager from './Screen/manager';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlaceManagement from '../src/Screen/placeManagement/PlaceManagement'
import AddPlace from '../src/Screen/placeManagement/AddPlace'
import EditPlace from '../src/Screen/placeManagement/EditPlace'
import UserManagement from '../src/Screen/userManagement/UserManagement'
import TableManagement from '../src/Screen/tableManagement/TableManagement'
function App() {
    return (
        // <div className="App">
        //     <Routes>
        //         <Route path="/" exact element={<Landing />} />
        //         <Route path="login" element={<Login />} />
        //         <Route path="signup" element={<SignUp />} />
        //     </Routes>
        // </div>
        // <AddPlace/>
        
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/manager" component={Manager} />
                <Route exact path="/admin/placemanagement" component={PlaceManagement}/>
                <Route exact path="/admin/placemanagement/addplace" component={AddPlace}/>
                <Route exact path="/admin/placemanagement/editplace/:id" component={EditPlace}/>
                <Route exact path="/admin/usermanagement" component={UserManagement}/>
                <Route exact path="/services/tablemanagement" component={TableManagement}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App