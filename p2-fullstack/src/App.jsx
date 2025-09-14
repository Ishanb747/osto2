
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage';
import ActiveSubscriptions from './pages/ActiveSubscriptions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/subscriptions" element={<ActiveSubscriptions />} />
    </Routes>
  );
}

export default App;
