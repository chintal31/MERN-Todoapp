const mongoose = require('mongoose');


let TodoSchema = new mongoose.Schema({
    todoname: { type: String },
    todoresponsible: { type: String },
    todopriority: { type: String },
    todocompleted: { type: Boolean}
});

module.exports = mongoose.model('Todo', TodoSchema);
