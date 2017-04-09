const express = require('express')
const cors = require('cors')
const app = express()
const request = require('superagent')
const bodyParser = require('body-parser')
const PORT = 3002

app.use(cors())
app.use(bodyParser.json())
app.options('*', cors())

app.post('/shorten', (req, res) => {
  request
    .post('http://gymia-shorty.herokuapp.com/shorten')
    .set('Content-Type', 'application/json')
    .send({url: req.body.url})
    .end((err, response) => {
      if (err || !response.ok) {
        res.status(404).send(err)
      } else {
        res.json(response.body)
      }
    })
})

app.get('/:shortcode/stats', (req, res) => {
  request
    .get('http://gymia-shorty.herokuapp.com/' + req.params.shortcode + '/stats')
    .set('Content-Type', 'application/json')
    .send({url: req.body.url})
    .end((err, response) => {
      if (err || !response.ok) {
        res.status(404).send(err)
      } else {
        res.json(response.body)
      }
    })
})

app.listen(PORT, () => {
  console.log('Express proxy started on port ' + PORT)
})
