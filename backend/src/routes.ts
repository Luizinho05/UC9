import { Router } from 'express'
import { isAutenticado } from './middleware/isAutenticado'
import multer from 'multer'
import uploadConfig from './config/multer'

//Criar
import { CriarusuariosController } from './Controller/Usuarios/CriarUsuariosController'
import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'
import { CriarCategoriasController } from './Controller/Categoria/CriarCategoriasController'

//Listar
import { ListarCategoriasController } from './Controller/Categoria/ListarCategoriasController'
import { ListarUsuarioTokenController } from './Controller/Usuarios/ListarUsuarioTokenController'
import { ListarProdutosController } from './Controller/Produtos/ListarProdutosController'

//Autenticação
import { LoginController } from './Controller/Login/LoginController'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))

//Rotas de Logins
router.post('/LoginUsuarios', new LoginController().handle)

//Estrutura de Usuários
router.post('/CriarUsuarios', new CriarusuariosController().handle)
router.get('/ListarUsuarioToken', isAutenticado, new ListarUsuarioTokenController().handle)

//Estrutura de Produtos
router.post('/CriarProdutos', isAutenticado, upload.single('file'), new CriarProdutosController().handle)
router.get('/ListarProdutos', isAutenticado, new ListarProdutosController().handle)
//categorias
router.post('/CriarCategoria', isAutenticado, new CriarCategoriasController().handle)
router.get('/ListarCategoria', isAutenticado, new ListarCategoriasController().handle)

export { router }