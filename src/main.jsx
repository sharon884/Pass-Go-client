import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { Provider } from "react-redux"
import { store } from "./app/store.js"
import { GoogleOAuthProvider } from "@react-oauth/google"
import "./App.css"
import "leaflet/dist/leaflet.css";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!clientId) {
  throw new Error("VITE_GOOGLE_CLIENT_ID is not defined. Please check your .env file.")
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
       
        <App />
    

      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
