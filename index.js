const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
    constructor(title = "", desc = "",authors = "",favourite = "",fileCover = "",fileName = "",id = uuid(),) {
        this.title = title
        this.desc = desc
        this.authors = authors
        this.favourite = favourite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = id
    }
}

const stor = {
    books: [
        new Book('title','desc','ok','ok','ok','ok')
    ],
};

const app = express()
app.use(express.json())

app.get('/api/lib', (req, res) => {
    const {books} = stor
    res.json(books)
})

app.get('/api/lib/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

app.post('/api/lib/', (req, res) => {
    const {books} = stor
    const {title, desc,authors,favourite,fileCover,fileName} = req.body

    const newBook = new Book(title, desc,authors,favourite,fileCover,fileName)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/lib/:id', (req, res) => {
    const {books} = stor
    const {title, desc,authors,favourite,fileCover,fileName} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title,
            desc,
            authors,
            favourite,
            fileCover,
            fileName
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.delete('/api/lib/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.post('/api/lib/login',(req,res) =>{
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT)