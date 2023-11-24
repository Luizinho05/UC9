import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './inicio.estilo.scss'
import apiLocal from '../API/apiLocal/api'

export default function Inicio() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useContext(AuthContext)

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
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
    }, [])

    async function handleLogin(e) {
        e.preventDefault(e)
        if (!email || !password) {
            toast.warn('um ou mais campos em branco!')
            return
        }
        try {
            let data = {
                email,
                password
            }
            const resposta = await signIn(data)
            if(!resposta) {
                toast.error('Erro de Login', {
                    toastId: 'toastId'
                })
                return
            } else if (resposta.status === 200){
                const token = resposta.data.token
                localStorage.setItem('@tklogin2023', JSON.stringify(token))
                toast.success('Login efetuado com sucesso')
                navigation('/Dashboard')
            }
        } catch (err) {
            toast.error('Email ou senha incorretos!')
            return
        }

    }


    return (
        <div>
            <div className='loginInicio'>
                <h1>Login</h1>
            </div>
            <div className='formInicio'>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
                <p>Para se cadastrar clique <Link to='/CadastroUsuario'>AQUI</Link></p>
            </div>
        </div>
    )
}