require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (request, response) => {
	response.send('<h1>This is the server of phonebook </h1>')
})

app.get('/api/persons', (request, response, next) => {	

	Person.find({}).then(persons => {
		response.json(persons)
	})
	.catch(error => next(error))     			  
})

app.get('/info', (request, response, next)=>{
	Person.find({}).then(persons =>{
		const number = persons.length
		const new_date = new Date()
		response.send(`Phone book has info for ${number} people <br> <br> ${new_date} `)
	})
	.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next)=>{
	Person.findById(request.params.id)
		.then(person=>{
			if(person){
				response.json(person)
			}else{
				response.status(404).end()
			}
		})
		.catch(error=>next(error))	
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if(body.name === undefined){
		return response.status(400).json({error: 'name is missing'})
	}

	Person.find({})
	.then(persons => {
		if(persons.map(n => n.name).includes(body.name)){
			return response.status(400).json({error: "name must be unique"})
		}else{
			const person = new Person ({
				"name": body.name,
				"number": body.number,
			})

			person.save()
			.then(savedPerson => response.json(savedPerson.toJSON()))
			.catch(error => next(error))
		}
	})
	.catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {

	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person,  { 
        runValidators: true, 
        new: true,
        context:'query',
        })
        .then(updatedPerson=>{
            if(updatedPerson === null) {
                return response.status(404).send({error: "item has been removed already"})
            }
            response.json(updatedPerson)})
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    
    if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
  
    next(error)
  }
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
	console.log(`Server running on port ${PORT}`)
})

