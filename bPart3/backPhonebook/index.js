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
    const person = Phone.filter(person => person.id === id)
    if(person){
        res.json(person) 
    }else{
        res.status(404).end()
    }
})

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
    let exist
    app.get('/api/persons', (request, response) => {
      Phone.find({}).then(p => {
        const all = response.json(p)
        exist = all.filter(p => p.name === body.name)
      })
    })
    if (exist) {
      app.put(`/api/persons/:${exist.id}`, (request, response, next) => {
      
        const person = {
          name: body.name,
          number: body.number,
        }
      
        Phone.findByIdAndUpdate(exist.id, person, { new: true })
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => next(error))
      })
      } 

    const person = {
      name: body.name,
      number: body.number,
    }
  
    Phone.save(person).then(person => {
      response.json(person)
    })
  })
//

app.delete('api/persons/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})