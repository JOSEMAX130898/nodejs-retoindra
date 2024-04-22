const Model = require('./model');

const Service = {
  async productoListar() {
    return await Model.productoListar();
  },
  async productoCrud(datos) {
    return await Model.productoCrud(datos);
  },
};

module.exports = Service;