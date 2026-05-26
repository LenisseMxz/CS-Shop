const jwt = require('jsonwebtoken');
const db = require('../lib/db');
const secretKey = 'cs_shop_secret_key'; //esta es la clave secreta para verificar el token

exports.verifyToken = async (req, res, next) => {   //verificar que el token exista tanto en admin y user

    const auth = req.headers['authorization']; //uso req.headers ya que lee la etiqueta authorization que se envia desde el cliente
    const token = auth.split(' '); //esto para extrar solamente el token

    if (!token[1]) {    //si no hay token, se envia error y token[1] es solo el token sin la palabra Bearer
        return res.json({ message: 'token no proporcionado' });
    }

    const decoded = jwt.verify(token[1], secretKey); //esto es para verificar el token, si el token es valido, se decodifica y se obtiene la informacion del usuario

    req.user = decoded; //esto es para guardar la informacion del usuario en el req.user, para que se pueda usar en las rutas protegidas

    next();  //esto da siguiente para ir a los controllers, si el token es valido
};