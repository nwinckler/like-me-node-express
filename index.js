const express = require('express')
const { agregarPost, getPosts } = require('./consultas')
const app = express()

// 1. Habilitar los cors en el servidor utilizando el paquete de npm
const cors = require('cors')

app.use(express.json());

app.listen(3000, console.log('Servidor encendido'))

app.use(cors())


// 3. Crear una ruta GET con Express para devolver los registros de una tabla alojada en PostgreSQL.

app.get("/posts", async (req,res) =>{
    const posts = await getPosts()
    res.json(posts)
})

// 4. Crear una ruta POST con Express para devolver los registros de una tabla alojada en PostgreSQL.

app.post("/posts", async (req, res) =>{
    const { titulo, url, descripcion } = req.body
    await agregarPost(titulo, url, descripcion)
    res.send("Post agregado con éxito")
})