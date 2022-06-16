import express from "express";
import cors from 'cors';
import { routes } from "./routes";

const app = express();

//  GET, POST, PUT, PATCH, DELETE

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação de uma entidade
// DELETE = Deletar uma informação

// linha para configurar o express para utilização de formato json

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("HTTP server running!");
});
