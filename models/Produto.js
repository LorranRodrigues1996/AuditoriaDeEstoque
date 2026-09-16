import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
nome: {type: String},
sku: {type: String},
precoCusto: {type: Number},
precoVenda: {type: Number},
estoqueMinimo: {type: Number},
estoqueAtual: {type: Number},
codigoBarras: {type: String},
categoria: {type: String},
});

const Produto = mongoose.model("Produto", produtoSchema)
export default Produto