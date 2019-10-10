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
    return db('steps')
      .select('steps.id', 'steps.instructions','schemes.scheme_name', 'steps.step_number')
      .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
      .where({ scheme_id: id })
      .orderBy('step_number')
  },
  add(scheme) {
    return db('schemes')
      .insert(scheme)
      .then(([id]) => {
        return db('schemes').where({ id }).first()
      })
  },
  addStep(step, id) { // req.body, req.params.id
    step.scheme_id = id // add scheme_id, set it as the arg id
    // need to find the largest step_number and increment
    return db('steps')
      .increment('step_number', 1) // not incrementing w/o existing step_number
      .insert([step]) // '*' returns all columns from inserted?
      .then((id) => {
        return db('steps').where({ id }).first()
      })
  },
  update(changes, id) {
    return db('schemes')
      .where({ id }) // id:id is redundant and column is called id
      .update(changes)
      .then((id) => {
        return db('schemes').where({ id }).first()
      })
  },
  remove(id) {
    return db('schemes')
      .where({ id })
      .del()
  }
}
