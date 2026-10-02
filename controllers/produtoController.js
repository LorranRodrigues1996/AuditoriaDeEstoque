import Produto from "../models/Produto.js"
/**
 * Adicionando um usuário ao banco de dados   
 */
const addProduto = async (req, res) => {
  console.log("Entrou na função addProduto()", req.body);
    const {
      nome,
      marca,
      preco,
      estoque,
      categoria,
      ativo,
    } = req.body;
  try {
    // 1. Criar o produto
    const novoProduto = new Produto({
      nome,
      marca,
      preco,
      estoque,
      categoria,
      ativo,
    });
    
    await novoProduto.save();

    res.json({ success: true, produto: novoProduto });
    console.log("Produto salvo com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao salvar produto' });
  }
};

const listProdutos = async (req, res) => {
    try {
    const produto = await Produto.find()
    res.status(200).json({ success: true, produto });
    console.log(produto)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}
const auditoria = async (req, res) => {
    try {
    const produtos = await Produto.find()
    let contaEstoqueBaixo = 0
    let totalProdutosAtivos = 0
    let produtosSemEstoque = 0
    let estoqueNormal = 0
    let reposicao = 0
    let ativos = 0
    let desativados = 0
    var arr = []
    for (let produto of produtos) {
      totalProdutosAtivos += 1
      if(produto.estoqueAtual >= produto.estoqueMinimo){
        estoqueNormal+=1
      }
      if(produto.estoqueAtual < produto.estoqueMinimo){
        contaEstoqueBaixo+=1
      }
      if(produto.estoqueAtual === 0){
        produtosSemEstoque+=1
      }
      if(produto.estoqueAtual >= 2 && produto.estoqueAtual <= 5){
        reposicao+=1
        arr.push(produto)
      }
      if(produto.ativo === true){
        ativos+=1
      }
      if(produto.ativo === false){
        desativados+=1
      }
      console.log("For Of",arr)
      
      // res.status(200).json({ success: true, arr });
    }
    // console.log("Produtos com estoque baixo", contaEstoqueBaixo)
    // console.log("Total de produtos", totalProdutosAtivos)
    // console.log("Produtos sem estoque", produtosSemEstoque)
    // console.log("Produtos com estoque normal", estoqueNormal)
    // console.log("Produtos para reposição ", arr)
    // console.log("Produtos em ativos ", ativos)
    // console.log("Produtos desativados ", desativados)
    // console.log(produto)
    res.json({ 
        sucesso: true,
        estoqueNormal,
        contaEstoqueBaixo,
        produtosSemEstoque,
        reposicao,
        arr,
        ativos,
        desativados
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}
const verificaPosicao = async (req, res) => {
  console.log("Entrou na função verificaPosicao()")
  const posicao = parseInt(req.params.posicao, 10)
  let produtoEncontrado = null
    try {
    const produtos = await Produto.find()
    for (let [index, produto] of produtos.entries()) {
      if(index === posicao){
        produtoEncontrado = produto
        break;
      }
    }
    if (produtoEncontrado) {
        res.json({ 
            sucesso: true, 
            posicao: posicao, 
            produto: produtoEncontrado 
        });
    } else {
        res.status(404).json({ 
            sucesso: false, 
            mensagem: 'Produto não encontrado nesta posição.' 
        });
    }
    // console.log(produto)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}

const listProdutosDetalhado = async (req, res) => {
    try {
    const produto = await Produto.find()
    const resumo = produto.map((e) => Array.of("Resumo: " + e.nome + " - " + e.precoVenda + " - " + e.estoqueAtual))
    console.log(resumo)
    res.status(200).json({ success: true, resumo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar produto', error: err });
    console.log(err)
  }
}
const listProdutosPorCategoria = async (req, res) => {
  console.log("Acessou a função listProdutosPorCategoria()")
  const recebeCategoria = req.params.categoria;
    try {
    const categoria = await Produto.find({categoria: recebeCategoria}).select('categoria')
    res.status(200).json({ success: true, categoria })
    console.log(categoria)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar categoria', error: err });
    console.log(err)
  }
}

const getCodigoProduto = async (req, res) => {
  console.log("Acessou a função getCodigoProduto()")
  try {
    const produto = await Produto.findById(req.params.id)
    if (!produto) {
      return res.status(404).json({ success: false, message: 'produto não encontrado' });
    }
    console.log(produto)
    res.json({ success: true, produto });
  } catch (error) {
    console.log("Erro ao recuperar dados do produto -------------------> getProduto()",error)
    res.status(500).json({ success: false, error: 'Erro ao buscar produto', detalhes: error.message });
  }
};
export { addProduto, listProdutos, getCodigoProduto, listProdutosPorCategoria, listProdutosDetalhado, verificaPosicao, auditoria }