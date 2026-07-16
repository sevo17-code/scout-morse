import { Routes, Route } from 'react-router-dom'; // شيلنا BrowserRouter من هنا
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// صفحات الموقع
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Exercises from './pages/Exercises';
import Exam from './pages/Exam';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider> {/* AuthProvider بقى جوه الـ Router مش بره */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
            <Route path="/exam/:id" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;