const express = require('express')
const { agregarPost, getPosts, like, eliminarPost } = require('./consultas')
const app = express()

// Like Me (Parte I). 1. Habilitar los cors en el servidor utilizando el paquete de npm
const cors = require('cors')

app.use(express.json());

app.listen(3000, console.log('Servidor encendido'))

app.use(cors())


// Like Me (Parte I). 3. Crear una ruta GET con Express para devolver los registros de una tabla alojada en PostgreSQL.

app.get("/posts", async (req,res) =>{
    try {
        const posts = await getPosts()
        res.json(posts)        
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`)
    }
})

// Like Me (Parte I). 4. Crear una ruta POST con Express para devolver los registros de una tabla alojada en PostgreSQL.

app.post("/posts", async (req, res) =>{
    try {
        const { titulo, url, descripcion } = req.body
        await agregarPost(titulo, url, descripcion)
        res.send("Post agregado con éxito")            
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`)
    }
    
})

// Like Me (Parte II). 1. Agregar una ruta PUT en una API REST y utilizarla para modificar registros en una tabla alojada en PostgreSQL

app.put("/posts/like/:id", async(req,res)=>{
    try {
        const {id} = req.params
        await like(id)
        res.send("Like agregado con éxito")
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`)
    }
})

// Like Me (Parte II). 2. Agregar una ruta DELETE en una API REST y utilizarla para modificar registros en una tabla alojada en PostgreSQL

app.delete("/posts/:id", async(req,res) =>{
    try {
        const {id} = req.params
        await eliminarPost(id)
        res.send("Post eliminado con éxito")

    } catch (error) {
        res.status(400).send(`Error: ${error.message}`)
    }
})

// Like Me (Parte II). 3. Capturar los posibles errores en una consulta SQL realizada con el paquete pg usando la sentencia try catch
// Se agrega la sentencia try/catch a todo