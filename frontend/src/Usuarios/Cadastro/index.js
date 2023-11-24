import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiLocal from '../../API/apiLocal/api'
import './cadastro.scss'

export default function CadastroUsuario() {
    const navigation = useNavigate()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleCadastrar(e) {
        e.preventDefault()
        try {
            if (!nome || !email || !password) {
                toast.warn('Campos em branco não são permitidos!')
                return
            }
            await apiLocal.post('/CriarUsuarios', {
                nome,
                email,
                password
            })
            toast.success('Usuário cadastrado com sucesso!')
            navigation('/')
        } catch (err) {
            toast.error(err.response.data.error)
        }

    }

    return (
        <div>
            <div className='conteinerCadastro'>
                <h1>Cadastro Usuário</h1>
            </div>
            <div className='formCadastro'>
                <form onSubmit={handleCadastrar}>
                    <label>Nome:</label>
                    <input
                        type='text'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Senha:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Cadastrar</button>
                </form>
                <p>Já está cadastrado? clique <Link to='/'>AQUI</Link></p>
            </div>
        </div>
    )
}