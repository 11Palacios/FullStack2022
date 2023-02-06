const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const Phone = require('./models/phone')

app.use(express.json())
app.use(morgan(':method :url :status :res[content] - :response-time ms :date[web]'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Phonebook Backend</h1>')
})

app.get('/info', (req, res) => {
    const len = persons.length
    const d = new Date()
    res.send(`<p>Phonebook has info for ${len} people</p><br/><p>${d}</p>`)
})


app.get('/api/persons', (request, response) => {
  Phone.find({}).then(p => {
    response.json(p)
  })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.filter(person => person.id === id)
    if(person){
        res.json(person) 
    }else{
        res.status(404).end()
    }
})

//

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      }
    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }
    const exist = persons.filter(p => p.name === body.name)
    if (exist) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      } 

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    res.json(person)
  })
//

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})