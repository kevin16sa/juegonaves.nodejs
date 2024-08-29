const {Jugador} = require('../baseDatos');
const jugador = require('../modelos/jugador');

const registrarJugador = async (req, res) =>{
    try{
        const {cedula, nombre, email}=req.body;

        const jugadorExistente =await jugador.findByPk(cedula);
        
        if(jugadorExistente) {
            return res.status(409).json({message:'El jugador ya existe'});
        
        }
        const nuevoJugador  = await jugador.create({cedula,nombre,email});
        res.status(201).json({message:'jugador registrado',
            resultado: {
                cedula: nuevoJugador.cedula,
                nombre: nuevoJugador.nombre,
                email: nuevoJugador.email
            }});
        
    
    }catch (error){
    res.status(201).json({message:error.message,resultado:null});
    }
};

const obtenerJugador = async (req, res) =>{
    try {
        const jugadores = await Jugador.findAll({
          attributes: ['cedula', 'nombre', 'email']
        });
        res.status(200).json({ mensaje:"Lista jugadores", resultado:jugadores });
      } catch (error) {
        res.status(500).json({ mensaje: error.message, resultado:null });
      }
  };

module.exports = {
    registrarJugador,
    obtenerJugador
}