
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HrDashboard from './pages/HrDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/hr" element={<HrDashboard />} />
                <Route path="/employee" element={<EmployeeDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;