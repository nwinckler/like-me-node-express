// Like Me (Parte I). 2. Usar el paquete pg para conectarse e interactuar con la base de datos.

const {Pool} = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle:true,
})

const agregarPost = async(titulo, url, descripcion) =>{
    try {
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)"
        const values = [titulo, url, descripcion]
        const result = await pool.query(consulta, values)
        console.log("Post agregado")  
    } catch (error) {
        throw new Error("Problemas al agregar un nuevo post")
    }
}

const getPosts = async() =>{
    try {
        const {rows} = await pool.query("SELECT * FROM posts")
        console.log(rows)
        return rows   
    } catch (error) {
        throw new Error("Problemas al obtener los posts")
    }
}

const like = async(id) =>{
    try {
        const consulta = 
        `UPDATE posts 
        SET likes = 
            CASE
            WHEN likes is null THEN 1 ELSE likes + 1 END
        WHERE id = $1`
        const values = [id]
        const result = await pool.query(consulta, values)
    } catch (error) {
        throw new Error("Problemas al agregar un like")
    }
}

const eliminarPost = async(id) =>{
    try {
        const consulta = "DELETE FROM posts WHERE id = $1"
        const values = [id]
        const result = await pool.query(consulta, values)
    } catch (error) {
        throw new Error("Problemas al eliminar un post")
    }
}

module.exports = {agregarPost, getPosts, like, eliminarPost}