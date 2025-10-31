// import { useState, useEffect } from 'react'
import './App.css'
// import Alluser from './Alluser'
// import { Helmet } from "react-helmet";
// import AddNewUser from './AddNewUser';
import MainRoutes from './routes';
// import { toast, ToastContainer } from "react-toastify";
// import MainRoutes from './routes/RootRoutes';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state/store";
// import ThemeOptionProvider from "./helper/ThemeOptionsContext/ThemeOptionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();
function App() {
 

  return (
    <>
     <QueryClientProvider client={queryClient}>
     <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       {/* <ThemeOptionProvider> */}
 <MainRoutes />
         <ToastContainer />
         {/* </ThemeOptionProvider>  */}
      {/* </ImagesProvider> */}
    </PersistGate>
  </Provider>
      {/* <Helmet>
 
      </Helmet> */}
      
      {/* <MainRoute /> */}
      </QueryClientProvider>
    </>
    
  )
}

export default App