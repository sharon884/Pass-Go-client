import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import { Provider } from "react-redux";
import { store } from './app/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <GoogleOAuthProvider clientId="http://76463556898-qpr1jihtq7em5g2lvdg3467otdtqj2h1.apps.googleusercontent.com">
    <Provider store={store}>
    <App />
    </Provider>
    </GoogleOAuthProvider>
    </BrowserRouter>
)
