import React from 'react';
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import EditCoupon from './components/EditCoupon';
import UserDashboard from './components/UserDashboard';
import AdminSignUp from './components/AdminSignUp';
import ClaimedCoupon from './components/ClaimedCoupon';
import NotFound from './components/NotFound';
function App(){
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<UserDashboard />}/>
                    <Route exact path="/adminPanel" element={<AdminPanel />}/>
                    <Route exact path="/editCoupon" element={<EditCoupon />}/>
                    <Route exact path="/adminLogin" element={<AdminLogin />}/>
                    <Route exact path="/adminSignIn" element={<AdminSignUp />}/>
                    <Route exact path="/showClaimedCoupon" element={<ClaimedCoupon />}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </div>
        </Router>
    );
}
export default App;
