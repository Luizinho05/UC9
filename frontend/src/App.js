import Rotas from './routes'
import './App.scss'
import  AuthProvider  from './Contexts/AuthContext'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <AuthProvider>
    <div className='container-fluid'>
      <Rotas />
      <ToastContainer
      position="top-center"
      autoClose={1700}
      theme="colored"
      />
    </div>
    </AuthProvider>
    
  );
}

export default App;
