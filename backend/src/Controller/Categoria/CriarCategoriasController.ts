import { Request, Response } from "express";
import { CriarCategoriasServices } from "../../Services/Categoria/CriarCategoriasServices";

class CriarCategoriasController {
    async handle(req: Request, res: Response){
    const { nome } = req.body
    const criarCategoriasServices = new CriarCategoriasServices()
    const categoria = await criarCategoriasServices.execute({
        nome
    })
    return res.json(categoria)
    }

}

export { CriarCategoriasController }