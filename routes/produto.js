import express from 'express'
import { addProduto, listProdutos, getCodigoProduto, listProdutosPorCategoria, listProdutosDetalhado, verificaPosicao, auditoria } from '../controllers/produtoController.js'

const router = express.Router()

router.post('/add', addProduto)
router.get('/', listProdutos)
router.get('/ordenados', verificaPosicao)
router.get('/auditoria', auditoria)
router.get('/posicao/:posicao', verificaPosicao)
router.get('/resumo', listProdutosDetalhado)
router.get('/:id/aulas', getCodigoProduto)
router.get('/:categoria', listProdutosPorCategoria)


export default router