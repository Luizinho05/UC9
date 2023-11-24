import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import apiLocal from '../API/apiLocal/api'

export default function Dashboard() {
    const navigation = useNavigate()
    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)
    
    useEffect (() => {
        if(!token){
        navigation('/')
        return
        } else if(token){
            async function verificaToken(){
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                if(resposta.data.dados){
                    navigation('/')
                    return
                } else if (resposta.data.id){
                    navigation('/Dashboard')
                }
            }
            verificaToken()
        }
    }, [token])

    function handleSair(){
        localStorage.removeItem("@tklogin2023")
        navigation('/')
    }
    return (
        <div>
            <h1>Dashboard</h1>

            <Link to='/Produtos'>Cadastrar Produtos</Link><br/>
            <Link to='/ListarP'>Listar Produtos</Link><br/>
            <button onClick={handleSair}>sair</button>
        </div>
    )


}