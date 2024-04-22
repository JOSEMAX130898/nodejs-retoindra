const { connect } = require('../../db');

const Model = {
  async productoListar() {
    const connection = await connect();
    try {
      const [rows] = await connection.execute('CALL fnProductoListar()');
      return rows;
    } finally {
      connection.end();
    }
  },
  async productoCrud(datos) {
    const connection = await connect();
    const {id, nombre, descripcion, precio, stock, accion}= datos;
    try {
      const [rows] = await connection.execute('CALL fnProductoCrud(?, ?, ?, ?, ?, ?)', [id, nombre, descripcion, precio, stock, accion]);
      return rows[0];
    } finally {
      connection.end();
    }
  }
};

module.exports = Model;