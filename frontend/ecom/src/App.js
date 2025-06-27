import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
import AdminDashboard from "./components/AdminDashboard";
import News from './components/News';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          {/* 🔒 Protected Routes */}
          <Route element={<PrivateComponent />}>
          <Route path="/news" element={<News />} />

            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
          </Route>

          {/* 🟢 Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;






