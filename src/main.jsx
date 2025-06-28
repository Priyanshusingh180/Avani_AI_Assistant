import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext, { datacontext } from './context/usercontext.jsx'

createRoot(document.getElementById('root')).render(

    <UserContext>
      <App />
    </UserContext>
  
)