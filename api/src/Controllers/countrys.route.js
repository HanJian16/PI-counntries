const axios = require('axios');
const {Country} = require('../db.js')

const getApiInfo =  async() => {
  const info = await axios.get("https://restcountries.com/v3/all")
  const newData = info.data.map(country => {
    const newCountry = {
      id: country.cca3,
      nombre: country.name.common,
      imagen: country.flags[1],
      continente: country.continents[0],
      capital: country.capital != null ? country.capital[0]: 'No data',
      subregion: country.subregion,
      area: country.area,
      poblacion: country.population
    }
    return newCountry;
  });
  return newData;
}

const countriesToDb = async() => {
  try { 
    const countries = await Country.findAll();
    if(!countries.length) {
      const array = await getApiInfo();
      const dataBase = await Country.bulkCreate(array);
    }
  } catch (error){
    Error('Este es el error')
  }

}

const getCountries = async(req, res) => {
  try{
    console.log('entre')
    await countriesToDb();
    const data = await Country.findAll();
    // console.log(data)
    res.json(data);
  }catch(error){
    Error('Otro error pa')
  }
}

const getCountriesId = async(req, res) => {
  try{
    const data = await Country.findByPk(req.params.id);
    res.json(data);
  } catch(error){
    Error('pa cansate de los errores')
  }
}

module.exports = {getCountries, getCountriesId};