const { mongoose } = require("../db/conection");
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  usuario: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
  estatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("usuario", usuarioSchema);
