import express from 'express'
import cors from 'cors'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname)
    }
})
const upload = multer({ storage: storage })
const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/file-upload', upload.single('file'), (req, res) => {
    try {
        res.status(200).json({ success: "file upload successful" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
app.listen(4000, () => console.log('RUNNING ON PORT 4000'))