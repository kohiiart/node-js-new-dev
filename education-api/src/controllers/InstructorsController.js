const knex = require('../databases/knex');
const fieldValidator = require('../utils/FieldValidator');

exports.create = async (req, res) => {
  try {
    const invalidFields = fieldValidator(req.body, ['fullName', 'avatarUrl']);

    if (invalidFields.length) {
      return res.status(400).send({
        status: 'invalid request',
        invalidFields
      });
    }

    const [instructorId] = await knex.insert(req.body).into('instructors');
    
    const [instructorCreated] = await knex.select('*')
      .from('instructors').where({ id: instructorId });
      
    return res.status(200).send({
      status: 'success',
      data: instructorCreated
    })
  } catch (e) {
    return res.status(500).send({ error: e.message || e });
  }
}

exports.update = async (req, res) =>{
  try {
    const {id} = req.params;
    const newInstructor = req.body

    const instructor = await knex.select('*').from('instructors').where({ id }).first();

    if(!instructor){
      return res.status(404).send({ status: `Nenhum instrutor com o ID: ${ id } foi encontrado!`})
    };

    await knex.update(newInstructor).from('instructors').where({ id })

    const instructorUpdated = await knex.select('*').from('instructors').where({ id }).first();

    return res.status(200).send(instructorUpdated)

  } catch (e) {
    return res.status(500).send({error: e.message || e})
  }
}

exports.delete = async (req, res) =>{
  try {
    const { id } = req.params;

    const instructor = await knex.select(['id']).where({ id }).first().from('instructors');

    if(!instructor){
      return res.status(404).send({status: `Professor de ID ${ id } não encontrado`})
    }

    await knex.delete().from('instructors').where({ id : instructor.id })
    return res.status(204).send({status: 'Registro removido com sucesso!'})
  } catch (e) {
    return res.status(500).send({error: e.message || e})
  }
}

exports.find = async (req,res) =>{
  try {
    const instructors = await knex.select('*').from('instructors')

    return res.status(200).send({instructors})
  } catch (e) {
    return res.status(500).send({error: e.message || e})
  }
}

exports.findById = async (req, res) =>{
  try {
    const id = req.params.id;
  
    const instructor = await knex.select('*').from('instructors').where({id}).first();
  
    if(!instructor){
      return res.status(404).send({status :`Professor de ID: ${id} não foi encontrado!`})
    }
  
    return res.status(200).send({
      ...instructor
    })
  } catch (e) {
    return res.status(500).send({error: e.message || e})
  }
  }