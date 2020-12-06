import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'
//console.log(data.length)=1390 films in data.json

//in console when starting:  run npm run dev to start server on localhost 8080 (then copy it from terminal into browser)
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
//cors allows apis where requests can come from
app.use(cors())

//This allows express to read json in posts-requests
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// create and handle endpoints for get-requests:

// a callback-function which is the second argument to the route.
// we have a function which express will pass two arguments,
// request & response
app.get('/nominations', (req, res) =>{
  res.json(data)
})

// endpoint to get all films of a certain year
app.get('/year/:year', (req, res) => {
  //get the variable out of the url: the year-placeholder (:year) becomes rec.params.year
  const year = req.params.year
  // To get only films that won. Access query string variables (things that happen after the ? in path)
  const showWon = req.query.win
  // we then use that to filter our array (+ before year to turn string into number):
  let nominationsFromYear = data.filter((item) => item.year_award === +year)

 // if http://localhost:8080/year/2010?win=true returns only films that won in 2010
  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }

  //return only the items that match that specific year:
  res.json(nominationsFromYear)
})

// Start the server on the port defined above
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
