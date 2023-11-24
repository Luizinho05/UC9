import React, { useEffect, useState , useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import apiLocal from '../../API/apiLocal/api'
import './listarProduto.css'

export default function ListarProdutos(){
    const navigation = useNavigate()
    const [produtos, setProdutos] = useState([''])
    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect (() => {
        async function loadProdutos(){
            const response = await apiLocal.get('/ListarProdutos', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            if(response.data.dados){
                navigation('/')
                return
            }
            setProdutos(response.data)
        }
        loadProdutos()
    }, [produtos])

    const { loginToken } = useContext(AuthContext)

    useEffect(() => {
    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)
    if (!token) {
        navigation('/')
        return
    }
    loginToken()
    }, [])

    return(
        <div className='conteinerListarProduto'>
            <h1 className='h1'>Informações dos Produtos</h1>
            <div className='Dados'>
                <table className='tabela'>
                    <thead className='thread'>
                        <tr>
                            <th className='valoresDefinidos'>ID</th>
                            <th className='valoresDefinidos'>Nome</th>
                            <th className='valoresDefinidos'>Fabricante</th>
                            <th className='valoresDefinidos'>Quantidade</th>
                            <th className='valoresDefinidos'>Banner</th>
                            <th className='valoresDefinidos'>Preço</th>
                            <th className='valoresDefinidos'>Criado</th>
                            <th className='valoresDefinidos'>Alterado</th>
                            <th className='valoresDefinidos'>Categoria ID</th>
                        </tr>
                        {produtos.map((item) => {
                            return (
                                <tr key={item.id}>
                                  <td className='textoTabela'>{item.id}</td>
                                  <td className='textoTabela'>{item.nome}</td>
                                  <td className='textoTabela'>{item.fabricante}</td>
                                  <td className='textoTabela'>{item.quantidade}</td>
                                  <td className='textoTabela'><img className='image' src={`http://localhost:3333/files/${item.banner}`} alt="" /></td>
                                  <td className='textoTabela'>{item.preco}</td>
                                  <td className='textoTabela'>{item.create_at}</td>
                                  <td className='textoTabela'>{item.update_at}</td>
                                  <td className='textoTabela'>{item.categoriaId}</td>
                                </tr>
                            )
                        })}
                    </thead>
                </table>
            </div>
            <Link to='/Dashboard'>Voltar</Link>
        </div>
    )
}