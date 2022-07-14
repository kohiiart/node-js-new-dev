const database = require('../databases/knex');
const logger = require('../utils/logger');

exports.findAll = async (request, response) => {
  try {
    const sql = await database
      .select(
        ['books.id', 'books.title', 'authors.name as author Name']
      )
      .from('books')
      .innerJoin('authors', 'authors.id', 'books.authorId');
    
    return response.status(200)
      .send({
        books: sql
      });
  } catch (error) {
    logger(error.message);
    return response.status(500)
      .send({ error: error?.message || e });
  }
}

exports.create = async (request, response) => {
  try {
    await database('books').insert(request.body);

    return response.status(200).send({
      status: 'success'
    });
  } catch (error) {
    return response.status(500).send({ error: error?.message || e });
  }
}

exports.getById = async (request, response) => {
  try {
    const params = request.params;

    const [book] = await database
      .select('*')
      .from('books')
      .where({ id: params.id })
      .limit(1);

    if (!book) {
      return response.status(404) // recurso não encontrado
        .send(`O registro com id: ${params.id} não foi encontrado!`);
    }
    return response
      .status(200)
      .send({ data: book });
  } catch (error) {// tratamento de exceção, trata os erros que ocorrem
    return response.status(500).send({ error: error?.message || e });
  }
}

exports.deleteById = async (request, response) => {
  try {
    const params = request.params;

    const [book] = await database
      .select('*')
      .from('books')
      .where({ id: params.id })
      .limit(1);

    if (!book) {
      return response.status(404) // recurso não encontrado
        .send(`O registro com id: ${params.id} não foi encontrado!`);
    }

    await database
      .delete()
      .from('books')
      .where({ id: book.id });

    return response
      .status(200)
      .send({ status: 'Registro removido com sucesso' });
  } catch (error) {// tratamento de exceção, trata os erros que ocorrem
    return response.status(500).send({ error: error?.message || e });
  }
}

exports.put = async (request, response) => {
  try {
    const params = request.params;

    // Busco o registro no banco de dados para validar se existe
    const [previousBook] = await database
      .select('*')
      .from('books')
      .where({ id: params.id })
      .limit(1);

    // se não existir, eu preciso informa o 
    //client que não existe(não encontrado)
    if (!previousBook) {
      return response.status(404) // recurso não encontrado
        .send(`O registro com id: ${params.id} não foi encontrado!`);
    }

    const nextBook = request.body;

    await database
      .update({ name: nextBook.name })
      .from('authors')
      .where({ id: previousBook.id });

    return response
      .status(200)
      .send({ status: 'Registro atualizado com sucesso', data: nextAuthor });
  } catch (error) {// tratamento de exceção, trata os erros que ocorrem
    return response.status(500).send({ error: error?.message || e });
  }
}
