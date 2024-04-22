const Service = require('./service');

const Controller = {
  async productoListar(req, res) {
    try {
      const response = await Service.productoListar();
      return res.status(200).send({
        "bEstado": true,
        "iCodigo": 0,
        "Obj": response
      })
    } catch (err) {
      return res.status(400).send({
        "bEstado": false,
        "iCodigo": -1,
        "sRpta": "error al guardar " + err
      })
    }
  },
  async productoCrud(req, res) {
    try {
      //req.body.accion==I (INSERT)
      //req.body.accion==U (UPDATE)
      //req.body.accion==D (DELETE)

      const body = req.body;
      const response = await Service.productoCrud(body);
      return res.status(200).send({
        "bEstado": true,
        "iCodigo": 0,
        "Obj": response
      })
    } catch (err) {
      return res.status(400).send({
        "bEstado": false,
        "iCodigo": -1,
        "sRpta": "error al guardar " + err
      })
    }
  }
}

module.exports = Controller;