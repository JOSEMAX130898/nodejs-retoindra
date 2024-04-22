const axios = require('axios');

const URL_SWAPI = process.env.URL_SWAPI;

const Controller = {
  async vehiulosListar(req, res) {
    try {
      /**Ejmplo mapear campo 01 */
      const response = await axios.get(URL_SWAPI+'/vehicles/');
      const vehiculos = response.data.results.map(vehiculo => ({
          nombre: vehiculo.name,
          modelo: vehiculo.model,
          fabricante: vehiculo.manufacturer,
          costo_en_creditos: vehiculo.cost_in_credits,
          longitud: vehiculo.length,
          velocidad_maxima_en_atmosfera: vehiculo.max_atmosphering_speed,
          tripulacion: vehiculo.crew,
          pasajeros: vehiculo.passengers,
          capacidad_de_carga: vehiculo.cargo_capacity,
          consumibles: vehiculo.consumables,
          clase_de_vehiculo: vehiculo.vehicle_class,
          pilotos: vehiculo.pilots,
          peliculas: vehiculo.films,
          creado: vehiculo.created,
          editado: vehiculo.edited,
          url: vehiculo.url
      }));
      //return vehiculos;

      //const response = await Service.productoListar();
      return res.status(200).send({
        "bEstado": true,
        "iCodigo": 0,
        "Obj": vehiculos
      })
    } catch (err) {
      return res.status(400).send({
        "bEstado": false,
        "iCodigo": -1,
        "sRpta": "error al guardar " + err
      })
    }
  },
  async personasListar(req, res) {
    try {
      /**Ejmplo mapear campo 02 */
      const response = await axios.get(URL_SWAPI+'/people/');
      const personas = response.data.results;
      const personasMapeadas = personas.map(persona => mapearAtributos(persona));      
      return res.status(200).send({
        "bEstado": true,
        "iCodigo": 0,
        "Obj": personasMapeadas
      })
    } catch (err) {
      return res.status(400).send({
        "bEstado": false,
        "iCodigo": -1,
        "sRpta": "error al guardar " + err
      })
    }
  },
}

// Función para mapear los nombres de atributos del inglés al español
function mapearAtributos(data) {
  const mapeo = {
      "name": "nombre",
      "height": "altura",
      "mass": "masa",
      "hair_color": "color_del_cabello",
      "skin_color": "color_de_piel",
      "eye_color": "color_de_ojos",
      "birth_year": "año_de_nacimiento",
      "gender": "género",
      "homeworld": "planeta_natal",
      "films": "películas",
      "species": "especie",
      "vehicles": "vehículos",
      "starships": "naves_estelares",
      "created": "creado",
      "edited": "editado",
      "url": "url"
  };

  const resultado = {};
  for (const key in data) {
      if (mapeo.hasOwnProperty(key)) {
          resultado[mapeo[key]] = data[key];
      } else {
          resultado[key] = data[key];
      }
  }
  return resultado;
}
module.exports = Controller;