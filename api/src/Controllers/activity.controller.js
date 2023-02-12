const {Activity, Country} = require('../db.js')

const getActivity = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        if (activities.length) {
            return res.status(200).json(activities);
        } else {
            return res.status(404).json('No se encontraron actividades')
        }
    } catch (error) {
        console.log(error);
    }
};

const createActivity = async (req, res) => {
    try{
        const { nombre, dificultad, duracion, temporada, countries } = req.body;
        if(!nombre && !dificultad && !duracion && !temporada) {
            return res.send('Debes llenar todos los datos');
        };
        let createActivity = await Activity.create({
            nombre,
            dificultad,
            duracion,
            temporada
        });
        countries.forEach(async (name) => {
            const countrie = await Country.findOne({
                where: {name}
            });
            await countrie?.addActivity(createActivity);
        })
        res.json(createActivity)
    } catch(error) {
        console.log(error);
    }
}