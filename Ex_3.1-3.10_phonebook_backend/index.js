const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.static('build'))

app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.json())

let persons = [    
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
]

app.get('/', (request, response) => {
	response.send('<h1>This is the server of phonebook </h1>')
})

app.get('/api/persons', (request, response) => {	     
		response.json(persons)	  
})

app.get('/info', (request, response)=>{
	response.send(`Phone book has info for ${persons.length} people <br> <br> ${new Date()} `)
})

app.get('/api/persons/:id', (request, response)=>{
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if(person){
		response.json(person)
	}else{
		response.status(404).end()
	}
	
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if(!body.name){
		return response.status(400).json({error: 'name is missing'})
	}

	if(persons.map(n => n.name).includes(body.name)){
		return response.status(400).json({error: "name must be unique"})
	}
	
	const uniqueId = () => {

			const idList = persons.map(n => n.id)

			let randomId = 1;

			while(idList.includes(randomId)){
					randomId = Math.floor((Math.random()*1000) + 1);
			}
			
			return randomId

	}

	const nextId = persons.length > 0 ? uniqueId() : 1

	const person = {
			"name": body.name,
			"number": body.number,
			"id": nextId
	}

	persons = persons.concat(person)
	response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
	console.log(`Server running on port ${PORT}`)
})

