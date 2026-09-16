import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import connectToDatabase from './database/db.js'
import produtoRouter from './routes/produto.js'
connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/produtos', produtoRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});