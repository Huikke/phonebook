import { useEffect, useState } from 'react'
import Filter from './tools/Filter'
import serverCommunication from './tools/serverCommunication'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    serverCommunication.getAll().then(initialData => setPersons(initialData))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }
      serverCommunication.create(person).then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      serverCommunication.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  // For Filtering
  const [filterValue, setFilterValue] = useState('')
  
  const handleFilterChange = (event) => {
      setFilterValue(event.target.value)
  } //

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterValue={filterValue} handleChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} removePerson={removePerson} />
    </div>
  )
}

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ persons, filterValue, removePerson }) => {
  // Includes filtering
  return (
    <div>
      {persons.filter(person =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      ).map(person =>
        <Person key={person.id} person={person} removePerson={removePerson} />)
      }
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
  <div>
    {person.name} {person.number} 
    <button onClick={() => removePerson(person)}>delete</button>
  </div>
  )
}


export default App