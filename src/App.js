
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HrDashboard from './pages/HrDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManageEmployees from './components/ManageEmployees';
import ViewFeedback from './components/ViewFeedback';
import ApproveLeaves from './components/ApproveLeaves';
import GeneratePayslip from './components/GeneratePayslip';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Feedback from './pages/Feedback';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/hr-dashboard" element={<HrDashboard />} />
                <Route path="/manage-employees" element={<ManageEmployees />} />
                <Route path="/approve-leaves" element={<ApproveLeaves/>} />
                <Route path="/generate-payslip" element={<GeneratePayslip />} />
                <Route path="/view-feedback" element={<ViewFeedback />} />
                <Route path="/feedback" element={<Feedback />} />

                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leave" element={<Leave/>} />
            </Routes>
        </Router>
    );
}

export default App;