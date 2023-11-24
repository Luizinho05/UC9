import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Inicio from './Inicio'
import Dashboard from './Dashboard'
import Produtos from './Produtos'
import ListarProdutos from './Produtos/Listar'
import CadastroUsuario from './Usuarios/Cadastro'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/Dashboard' element={ <Dashboard /> } />
                <Route path='/Produtos' element={ <Produtos /> } />
                <Route path='/ListarP' element={ <ListarProdutos /> } />
                <Route path='/CadastroUsuario' element={ <CadastroUsuario /> } />
            </Routes>
        </BrowserRouter>
    )
}