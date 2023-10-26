const express = require('express')
const path = require('path')
const app = express()
const port = 8000
const file_path = path.join(__dirname, '../', 'public')

app.use(express.static(file_path))

app.get('/', (req,res) => {
    res.sendFile(file_path + '/index.html')
})

app.get('/cars', (req,res) => {
    res.sendFile(file_path + '/carList.html')
})

app.listen(port, () => console.info(`app listening on port ${port}`))
