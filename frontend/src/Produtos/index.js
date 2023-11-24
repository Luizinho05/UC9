import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'
import './Produtos.scss'

export default function Produtos() {
  const navigation = useNavigate()
  const [categorias, setCategorias] = useState([''])
  const [nome, setNome] = useState('')
  const [fabricante, setFabricante] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [preco, setPreco] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [imagem, setImagem] = useState(null)

  const iToken = localStorage.getItem('@tklogin2023')
  const token = JSON.parse(iToken)

  useEffect(() => {
    async function loadCategorias() {
      const resposta = await apiLocal.get('/ListarCategoria', {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
      setCategorias(resposta.data)
    }
    loadCategorias()
  }, [categorias])

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


  function handleImagem(e) {
    if (!e.target.files) {
      return
    }
    const image = e.target.files[0]
    if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
      setImagem(image)
    }
  }

  async function CadastrarProduto(e) {
    try {
      e.preventDefault()
      const idCategoria = categoriaId
      const data = new FormData()

      data.append('nome', nome)
      data.append('fabricante', fabricante)
      data.append('quantidade', quantidade)
      data.append('preco', preco)
      data.append('categoriaId', idCategoria)
      data.append('file', imagem)

      const resposta = await apiLocal.post('/CriarProdutos', data, {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
      toast.success(resposta.data.dados)
      navigation('/ListarP')

    } catch (err) {
      toast.error('Token Inválido!')
    }
    setNome('')
    setFabricante('')
    setQuantidade('')
    setPreco('')
    setImagem(null)
  }


  return (
    <div>
      <div className='conteinerProduto'>
        <h1>Produtos</h1>
      </div>
      <div className='formProduto'>

        <form onSubmit={CadastrarProduto}>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}>
            <option>Selecione..</option>
            {categorias.map((item) => {
              return (
                <option
                  value={item.id}
                  key={item.id}>
                  {item.nome}
                </option>
              )
            })}
          </select>
          <label>Nome:</label>
          <input
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label>Fabricante</label>
          <input
            type='text'
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)}
          />
          <label>Quantidade:</label>
          <input
            type='text'
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <label>Preço:</label>
          <input
            type='text'
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <label>Imagem:</label>
          <input
            type='file'
            accept='image/jpeg, image/png, image/jpg'
            onChange={handleImagem}
          />

          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}