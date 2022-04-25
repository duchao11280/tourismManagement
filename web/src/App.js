import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Screen/landing';
import Login from './Screen/login';
import SignUp from './Screen/signup';
import Admin from './Screen/admin';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlaceManagement from '../src/Screen/placeManagement/PlaceManagement'
import AddPlace from '../src/Screen/placeManagement/AddPlace'
import EditPlace from '../src/Screen/placeManagement/EditPlace'
import UserManagement from '../src/Screen/userManagement/UserManagement'
import AddService from '../src/Screen/servicesManagement/AddService'
import ServicesManagement from '../src/Screen/servicesManagement/ServicesManagement';

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
                
                <Route exact path="/admin/placemanagement" component={PlaceManagement}/>
                <Route exact path="/admin/placemanagement/addplace" component={AddPlace}/>
                <Route exact path="/admin/placemanagement/editplace/:id" component={EditPlace}/>
                <Route exact path="/admin/usermanagement" component={UserManagement}/>
                <Route exact path="/admin/servicemanagement" component={ServicesManagement}/>
                <Route exact path="/admin/servicemanagement/addservice" component={AddService}/>
                

            </Switch>
        </BrowserRouter>
    )
}

export default App