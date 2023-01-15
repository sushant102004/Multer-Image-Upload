const path = require('path')
const express = require('express')
const multer = require('multer')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        console.log(file)
        callback(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({ storage : storage })

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Image uploaded successfully!!'
    })
})

app.listen(3000, () => console.log(`Running server on port 3000`))