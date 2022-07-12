const database = require('../databases/knex');

exports.findAll = async (request, response) => {
  try {
    const sql = await database.select('*').from('authors');

    return response.status(200)
      .send({
        authors: sql
      });
  } catch (error) {
    return response.status(500)
      .send({ error: error?.message || e });
  }
}

exports.create = async (request, response) => {
  try {
    await database('authors').insert(request.body);

    return response.status(200).send({
      status: 'success'
    });
  } catch (error) {
    return response.status(500).send({ error: error?.message || e });
  }
}

exports.getById = (request, response) => {
  const params = request.params;
  console.log('Query params authors', params);
  return response
    .status(200)
    .send(`Acessando recurso /authors METHOD: GET BY ID ${params.id}`);
}

exports.deleteById = (request, response) => {
  const params = request.params;
  console.log('Query params authors', params);
  return response
    .status(200)
    .send(`Acessando recurso /authors METHOD: DELETE BY ID ${params.id}`);
}

exports.put = async (request, response) => {
  try {
    const params = request.params;

    // Busco o registro no banco de dados para validar se existe
    const [previousAuthor] = await database
      .select('*')
      .from('authors')
      .where({ id: params.id })
      .limit(1);

    // se não existir, eu preciso informa o 
    //client que não existe(não encontrado)
    if (!previousAuthor) {
      return response.status(404) // recurso não encontrado
        .send(`O registro com id: ${params.id} não foi encontrado!`);
    }

    const nextAuthor = request.body;

    await database
      .update({ name: nextAuthor.name })
      .from('authors')
      .where({ id: previousAuthor.id });

    return response
      .status(200)
      .send({ status: 'Registro atualizado com sucesso', data: nextAuthor });
  } catch (error) {// tratamento de exceção, trata os erros que ocorrem
    return response.status(500).send({ error: error?.message || e });
  }
}