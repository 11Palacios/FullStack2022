import axios from 'axios'
const baseUrl = 'https://phonebook-jfs0.onrender.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const erase = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (newPerson) => {
    const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
    return request.then(response => response.data)
}

const personService = { getAll, create, erase, update }

export default personService;