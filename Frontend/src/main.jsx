import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { persistor, store } from './redux/store.jsx'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <BrowserRouter> */}
          <App />
        {/* </BrowserRouter> */}
      </PersistGate>
    </Provider>
  </QueryClientProvider>
</StrictMode>
)
