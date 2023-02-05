const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://FSO:${process.argv[2]}@cluster0.erx03lw.mongodb.net/Phone?retryWrites=true&w=majority`
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('conectado a base de datos')
    })
    .catch((e)=> {
        console.log('Database error', e)
    })

    const phoneSchema = new mongoose.Schema({
        name: String,
        phone: String,
      })
  
    const Phone = mongoose.model('Phone', phoneSchema)

    if(process.argv.length === 5){
        const nPhone = new Phone({
            name: process.argv[3],
            phone: process.argv[4]
        })
        const savedPhone = nPhone.save()
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    }

    if(process.argv.length === 3){
        Phone.find({})
        .then(phon => {
            console.log(phon.name, phon.number)
        })
        
    }

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })
