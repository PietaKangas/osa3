const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://pjkang:${password}@pietakangas.2rwyuta.mongodb.net/personApp?retryWrites=true&w=majority&appName=PietaKangas`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(savedPerson => {
    console.log(`Added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(people => {
    people.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  console.log('Invalid number of arguments.')
  process.exit(1)
} 