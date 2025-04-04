import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './Pages/Login' 
import './App.css';
import Signup from "./Pages/Signup";
import Home from "./Pages/Home"
import Logo from './Components/Logo';
// import ConstellationCanvas from '../Component/ConstellationCanvas';
import Dashboards from './Pages/Dashboards';
import { AuthProvider } from "../context/AuthContext";
import MyCollection from './Components/MyCollection';
import SaveConstellation from './Components/SaveConstellation';
// import Counter from './Components/Counter';
// import { conterContext } from './Components/counterContext';

function App() {

  
  const [count, setCount] = useState(0);
  

  return (
    
    <AuthProvider>
      
    <Router> 
      <Routes> 

        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/constellation" element={<ConstellationCanvas />}/> */}
        <Route path="/dashboard" element={<Dashboards />} />             
        <Route path='/mycollection' element={<MyCollection/>}/>
        <Route path='/save' element={<SaveConstellation/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
