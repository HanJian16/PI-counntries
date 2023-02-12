const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    nombre: {
      type: DataTypes.STRING,
    },
    dificultad: {
        type: DataTypes.INTEGER,
        validate: {
            isEven(value){
                if(value < 1 && value > 5) {
                    throw new Error('La dificultad debe ser entre 1 y 5');
                }
            }
        }
    },
    duracion: {
        type: DataTypes.INTEGER,
        validate: {
            isEven(value) {
                if(value < 1 && value > 24) {
                    throw new Error('La duracion debe ser entre 1 y 24');
                }
            }
        }
    },
    temporada: {
        type: DataTypes.STRING
    }
  });
};
