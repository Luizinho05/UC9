import { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../API/apiLocal/api'

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [ user, setUser ] = useState('')

    const isAutenticado = !!user

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    async function loginToken(){
      try{
        const resposta = await api.get('/ListarUsuarioToken', {
          headers: {
            Authorization: 'Bearer ' + `${token}`
          }
        })
        setUser(resposta.data.id)

      } catch (err) {
        if(err.response.status === 401){
          setUser('')
        }
      }
    }
     
    async function signIn({ email, password }){

      try{
         const resposta = await api.post('/LoginUsuarios',{
            email,
            password
         })
         return resposta
      } catch(err) {
        return(err.data.dados)
      }

    }

    return(
      <AuthContext.Provider value={{ isAutenticado, signIn, loginToken }}>
          {children}
      </AuthContext.Provider>
    )
}