const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

let fs = require('fs');


function getData() {
    let fileName = 'data.json';
    let data = JSON.parse(fs.readFileSync(fileName).toString());
    return data
}

function saveData (data) {
  let fileName = 'data.json';
  let m = JSON.parse(fs.readFileSync(fileName).toString());
  m.posts.push(data)
  fs.writeFileSync(fileName, JSON.stringify(m));
}

function addComment (data) {
  console.log(data)
  let fileName = 'data.json';
  let m = JSON.parse(fs.readFileSync(fileName).toString());
  let index = m.posts.findIndex(obj => obj.id == data.post)
  m.posts[index].comments.push(data)
  fs.writeFileSync(fileName, JSON.stringify(m));
}

app.use(express.static(path.join(__dirname, '../client/assets')))

app.get('/getData', (req, res) => {
    res.send(getData())
  })

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))

app.get('/community', async (req, res) => res.sendFile(path.join(__dirname, '../client/community.html')))

app.post('/community', async (req, res) => {
  saveData(req.body)
})

app.post('/community/comment', async (req, res) => {
  addComment(req.body)
  // console.log(req.body)
})

app.listen(port, () => console.log(`Now running on http://localhost:${port}`))
