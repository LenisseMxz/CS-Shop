const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');

exports.register_post = async (req, res) => {
    const {user, password, confirmPassword} = req.body;  //obtenemos los datos que ingreso el usuario

        if(!user || !password || !confirmPassword){     //validamos que el usuario haya registrado los dos campos
            return res.json({message: "llena todos los campos"}); 
        }

        if(password !== confirmPassword){   //validamos que las contraseñas coincidan
            return res.json({message: "las contraseñas no son iguales"});
        }


    const passwordHash = await bcrypt.hashSync(password, 10); //esto es para encriptar la contraseña, el 10 es el nivel de seguridad, entre mas alto, mas seguro pero tambien mas lento a lo que vi xd
    const sql = "INSERT INTO users (user, password, rol) VALUES (?, ?,'customer')"; //esto es para insertar el nuevo usuario en la base de datos, con el rol de customer por defecto, aunque tengo duda de si poner lo de customer porque la db ya lo tiene por defecto, pero bueno xd, tengo que investigarlo

    await db.query(sql, [user, passwordHash]); //esto es para insertar el nuevo usuario en la base de datos, con la contraseña encriptada
    return res.json({message: "usuario registrado"});
}

exports.login_post = async (req, res) => {
    const {useF, password} = req.body;  //obtenemos los datos que ingreso el usuario

    if(!userF || !password){     //validamos que el usuario haya registrado los dos campos
        return res.json({message: "llena todos los campos"}); 
    }

    const sql = "SELECT * FROM users WHERE user = ?"; //esto es para buscar el usuario en la base de datos
    const [rows] = await db.query(sql, [user]); //esto es para ejecutar la consulta y obtener el resultado

    if(rows.length === 0){   //si no se encuentra el usuario, se envia error
        return res.json({message: "usuario no encontrado"});
    }    

    const user = rows[0]; //esto es para obtener el primer resultado de la consulta, que es el usuario que se encontro

    const passwordCorrect = await bcrypt.compare(password, user.password); //esto es para comparar la contraseña que ingreso el usuario con la contraseña encriptada que se encuentra en la base de datos

    if(!passwordCorrect){   //si la contraseña es incorrecta, se envia error
        return res.json({message: "contraseña incorrecta"});
    }

    const secretKey = 'cs_shop_secret_key'; //esta es la clave secreta para generar el token
    const token = jwt.sign({id: user.id, rol: user.rol}, secretKey); //esto es para generar el token, con la informacion del usuario y la clave secreta, y el tiempo de expiracion del token

    return res.json({   //
        message: "Login exitoso",
        token: token,
        rol: user.rol
    
    });
};
