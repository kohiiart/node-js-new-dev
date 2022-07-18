const knex = require('../databases/knex');

exports.create = async (req, res) => {
  const fieldsRequired = ['title', 'description'];
  try {
    const course = req.body;

    const attrs = Object.keys(course);

    const invalidFields = [];
    attrs.forEach(attr => {
      console.log('percorrendo attrs', attr);
      if (!fieldsRequired.includes(attr)) {
        invalidFields.push(attr)
      }
    });

    if (invalidFields.length) {
      return res.status(400).send({ 
        status: 'invalid request',
        invalidFields
      });
    }

    const [courseCreatedId] = await knex.insert(course).into('courses');
    
    const [courseCreated] = await knex.select('*').from('courses').where({ id: courseCreatedId });

    return res.status(200).send({
      status: 'success',
      data: courseCreated
    })
  } catch (e) {
    return res.status(500).send({ error: e.message || e });
  }
}