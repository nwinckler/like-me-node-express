// 2. Usar el paquete pg para conectarse e interactuar con la base de datos.

const {Pool} = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle:true,
})

const agregarPost = async(titulo, url, descripcion) =>{
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}

const getPosts = async() =>{
    const {rows} = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

module.exports = {agregarPost, getPosts}