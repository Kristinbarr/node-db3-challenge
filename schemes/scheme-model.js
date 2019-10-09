const db = require('../data/db-config')
module.exports = {
  find() {
    return db('schemes')
  },
  findById(id) {
    return db('schemes')
      .where({ id })
      .first()
  },
  findSteps(id) {
    return db('steps as s')
      .select('s.id', 's.instructions as Instructions','schemes.scheme_name as Scheme_Name')
      .join('schemes', 'schemes.id', 's.scheme_id')
      .where({ scheme_id: id })
  },
  add(scheme) {
    return db('schemes')
      .insert(scheme)
      .then(([id]) => {
        return db('schemes').where({ id })
      })
  },
  addStep(step) {
    return db('steps')

    .insert(step)
  },
  update() {

  },
  remove(id) {
    return db('scheme')
      .where({ scheme_id: id })
      .del()
  }
}
