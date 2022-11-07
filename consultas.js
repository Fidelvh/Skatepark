const { Pool } = require('pg');


const pool = new Pool({
    user:'postgres',
    host:'localhost',
    port:5432,
    password:'allfilo',
    database:'skatepark',
})

// consultar todos los usuarios
async function consultarUsuarios() {
    try {
        const result = await pool.query(`SELECT * FROM skaters`);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

//  ingresar un usuario
async function nuevoUsuario(email,nombre,password,anos,especialidad,foto) {
    try {
        const result = await pool.query(
            `INSERT INTO skaters 
            (email,nombre,password,anos_experiencia,especialidad,foto,estado)
            VALUES ('${email}','${nombre}','${password}','${anos}','${especialidad}','${foto}',false)
            RETURNING *`
        )
    } catch (e) {
        console.log(e);
    }
}

//  cambiar el estado de un usuario
async function setUsuarioStatus(id,estado) {
    const result =  await pool.query(
        `UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *`
    )

    const usuario = result.rows[0];
    return usuario;
}

//solicitar email y password de usuario
async function conseguirUsuario(email,password) {
    try {
        const result = await pool.query(`SELECT * FROM skaters 
                                        WHERE email = '${email}' AND
                                        password = '${password}'`);
        return result.rows;
    } catch (e) {
        console.log(e);
    }
}

// cambiar estado de la cuenta de usuario
async function setUsuarioStatus(id,estado) {
    const result =  await pool.query(
        `UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *`
    )

    const usuario = result.rows[0];
    console.log(rows);
    return usuario;
}

//  editar datos de usuario
async function setDatosUsuario(email,nombre,password,anos,especialidad) {
    const result =  await pool.query(
        `UPDATE skaters SET 
            nombre = '${nombre}',
            password = '${password}',
            anos_experiencia = ${anos},
            especialidad = '${especialidad}'
            WHERE email = '${email}' RETURNING *`
    )

    const usuario = result.rows[0];
    return usuario;
}

//eliminar cuenta
async function eliminarCuenta (email) {
    const result = await pool.query(`
        DELETE FROM skaters WHERE email = '${email}'
    `);

    return result.rowCount;
}

module.exports = { 
    consultarUsuarios,
    nuevoUsuario,
    setUsuarioStatus,
    conseguirUsuario,
    setDatosUsuario,
    eliminarCuenta };