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
import EditService from '../src/Screen/servicesManagement/EditService'
import NotificationManagement from '../src/Screen/notification/NotificationManagement';
import TripManagement from '../src/Screen/tripManagement/TripManagement'
import AddTrip from '../src/Screen/tripManagement/AddTrip'
import EditTrip from '../src/Screen/tripManagement/EditTrip'
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

                <Route exact path="/admin/placemanagement" component={PlaceManagement} />
                <Route exact path="/admin/placemanagement/addplace" component={AddPlace} />
                <Route exact path="/admin/placemanagement/editplace/:id" component={EditPlace} />
                <Route exact path="/admin/usermanagement" component={UserManagement} />
                <Route exact path="/admin/servicemanagement" component={ServicesManagement} />
                <Route exact path="/admin/servicemanagement/addservice" component={AddService} />
                <Route exact path="/admin/servicemanagement/editservice/:id" component={EditService} />
                <Route exact path="/admin/notificationmanagement" component={NotificationManagement} />
                <Route exact path="/admin/tripmanagement" component={TripManagement} />
                <Route exact path="/admin/tripmanagement/addtrip" component={AddTrip} />
                <Route exact path="/admin/tripmanagement/edittrip/:id" component={EditTrip} />
            </Switch>
        </BrowserRouter>
    )
}

export default App