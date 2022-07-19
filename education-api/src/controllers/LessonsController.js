const knex = require('../databases/knex');
const fieldValidator = require('../utils/FieldValidator');

exports.create = async (req, res) => {
  try {
    const invalidFields = fieldValidator(
      req.body, ['title', 'description', 'videoId', 'instructorId', 'courseId']
    );

    if (invalidFields.length || !Object.keys(req.body).length) {
      return res.status(400).send({
        status: 'invalid request',
        invalidFields
      });
    }

    // adiciona validação de campos obrigatórios
    const requiredFields = ['title', 'videoId', 'instructorId', 'courseId'];

    const requiredFieldsExists = [];
    requiredFields.forEach(requiredField => {
      if (!req.body[requiredField]) {
        requiredFieldsExists.push(requiredField);
      }
    });

    if (requiredFieldsExists.length) {
      return res.status(400).send({
        status: 'required fields',
        requiredFields: requiredFieldsExists
      });
    }



    return res.status(200).send('ok')
  } catch (e) {
    return rest.status(500).send({ error: e.message || e });
  }
}