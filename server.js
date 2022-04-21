const express = require('express');
const path = require('path')
const fs = require(`fs`);
const database = require('./db/db.json');
let uuidv1 =require('uuidv1');

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));

// when on /note route then the response sends the a file and joins /notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//
app.get('/api/notes', (req, res) => {
    const getNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(getNotes);
    res.json(parseNotes);
});

app.post('/api/notes', (req, res) => {
    const saveNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(saveNotes);
    req.body.id = uuidv1()
    parseNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
    res.json();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



