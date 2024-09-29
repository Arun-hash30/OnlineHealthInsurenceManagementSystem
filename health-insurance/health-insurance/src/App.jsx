import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import ResetPassword from './components/Authentication/ResetPassword';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import HealthPolicyList from './components/Customer/HealthPolicyList';
import HealthPolicyDetails from './components/Customer/HealthPolicyDetails';
import PurchaseHealthPolicy from './components/Customer/PurchaseHealthPolicy';
import RenewHealthPolicy from './components/Customer/RenewHealthPolicy';
import FileHealthClaim from './components/Customer/FileHealthClaim';
import HealthClaimStatus from './components/Customer/HealthClaimStatus';
import AgentDashboard from './components/Agent/AgentDashboard';
import ClientList from './components/Agent/ClientList';
import ClientDetails from './components/Agent/ClientDetails';
import ProcessHealthClaim from './components/Admin/ProcessHealthClaim';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageUsers from './components/Admin/ManageUsers';
import ManageHealthPolicies from './components/Admin/ManageHealthPolicies';
import CreatePolicy from './components/Admin/CreatePolicy';
import Logout from './components/Authentication/Logout';
import image from './assets/images/image.png'; // Import the image
import UploadSupportingDocs from './components/Customer/UploadSupportingDocs';

function App() {
    return (
        <div style={{
            backgroundImage: `url(${image})`, // Set the image as background
            minHeight: '100vh',
            backgroundSize: 'cover',          // Cover the whole page
            backgroundPosition: 'center',     // Center the image
            backgroundRepeat: 'no-repeat'     // Don't repeat the image
        }}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/policies" element={<HealthPolicyList />} />
                    <Route path="/customer/policies/:id" element={<HealthPolicyDetails />} />
                    <Route path="/customer/purchase-policy" element={<PurchaseHealthPolicy />} />
                    <Route path="/customer/renew-policy" element={<RenewHealthPolicy />} />
                    <Route path="/customer/file-claim" element={<FileHealthClaim />} />
                    <Route path="/customer/claim-status" element={<HealthClaimStatus />} />
                    <Route path="/customer/uploading-suppoting-files" element={<UploadSupportingDocs />} />
                    <Route path="/agent/dashboard" element={<AgentDashboard />} />
                    <Route path="/agent/clients" element={<ClientList />} />
                    <Route path="/agent/clients/:id" element={<ClientDetails />} />
                    <Route path="/agent/claims/process" element={<ProcessHealthClaim />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/policies/create" element={<CreatePolicy />} />
                    <Route path="/admin/policies" element={<ManageHealthPolicies />} />
                    <Route path="/logout" element={<Logout />} /> {/* Add Logout route */}
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
