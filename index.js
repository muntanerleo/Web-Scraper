const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

//here we call express to release all the goodness it has inside
const app = express()

//now i start using packages. number 1 is axios
//axios works by passing a URL and it gets the response from it. in this case it will be response data.
//that data will be saved 
const url = 'https://www.theguardian.com/uk'
axios(url)

//after passing the url, i will do some chaining.
  .then(response => {
    //get response data and save as html
    const html = response.data
    
    //by using cheerio package i can pick out certain elements.
    const $ = cheerio.load(html)

    //empty array for each item i create i want the title,url
    const articles = []
    
    //using a callback function.
    //for each element i am finding, i am getting a title and url
    $('.fc-item__title', html).each(function() {
      const title = $(this).text() 
      
      const url = $(this).find('a').attr('href')

      articles.push({
        title,
        url
      })

    })
    console.log(articles)

  }).catch(err => console.log(err))

//here i am using the listen method to listen to port 8000. if any changes are made to the port, i will know.
//pass a call back 
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))