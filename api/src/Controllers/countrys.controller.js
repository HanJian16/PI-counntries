const axios = require('axios');
const {Country, Activity} = require('../db.js');

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
    console.log(error)
  }

}

const getCountries = async(req, res) => {
  try{
    await countriesToDb();
    const {name} = req.query;
    if(name){
      const data = await Country.findOne({
        where: {name}
      });
      if(data) {
        res.json(data)
      } else {
        res.status(401).json({message: 'Esa ciudad no existe'})
      }
    } else {
      const data = await Country.findAll({
      include: [{
        model: Activity
      }]
    });
    res.json(data);
    }
    
  }catch(error){
    console.log(error)
  }
}

const getCountriesId = async(req, res) => {
  try{
    const data = await Country.findByPk(req.params.id);
    res.json(data);
  } catch(error){
    console.log(error)
  }
}

module.exports = {getCountries, getCountriesId};