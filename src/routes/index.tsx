// MainRoute.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import routes from './routes';
import FallbackPage from '../Components/FallBackpage';
// import { BASE_PATH } from '../services/axiosInstance';
import Layout from '../Components/Layout';
import GuestRoute from "../routes/GuestRoute";
import Login from '../Pages/Login';
const baseName = import.meta.env.VITE_BASENAME
const MainRoute: React.FC = () => {
  console.log(baseName)
  return (
    <Router basename={baseName}>
      <Suspense fallback={<FallbackPage message="LOADING..." />}>
        <Routes>
          {/* Root path shows login */}
          <Route 
            path="/" 
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } 
          />
          
          {/* Login route also available for direct access */}
          {/* <Route 
            path='/login' 
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          /> */}
          
          {/* Protected routes with Layout - using a different base path */}
          <Route path="/*" element={<Layout />}>
            {routes.map((route, index) => (
              <Route 
                key={index} 
                path={route.path} 
                element={route.element}
              />
            ))}
          </Route>
          
          {/* 404 route for unmatched paths */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default MainRoute;