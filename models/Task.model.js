// Require Schema and model methods of mongoose
const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = model('Task', taskSchema);