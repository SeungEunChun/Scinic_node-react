const express = require("express");
const app = express();
const port = 8001;
const path = require("path");
const store = require('./api/store')

app.use(express.static(path.join(__dirname, './project/build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./project/build/index.html"))
})

app.use('/store', store)

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "publish/nopage.html"))
})

app.listen(port, () => {
    console.log(`localhost ${port} onload`)
})