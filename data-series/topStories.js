const rp = require('request-promise-native')

const NAME = 'New York Times\' Top Stories'
const DESCRIPTION = 'New York Times\' current top stories'

function callback(req, res, next) {
    console.log(process.env.NYT_API_KEY)
    let uri = 'https://api.nytimes.com/svc/topstories/v2/home.json'

    let qs = {
        'api-key': process.env.NYT_API_KEY
    }

    let options = {
        uri,
        qs
    }

    rp(options)
        .then(stories => {
            stories = JSON.parse(stories)
            let composedResults = stories.results.reduce((withDate, storyObject) => {
                let publishedDate = new Date(storyObject.published_date).getTime()
                return [...withDate, [publishedDate, storyObject.multimedia.length]]
            }, [])

            res.send({
                format: "date",
                initalDataSet: composedResults
            })
        })
        .catch(err => {
            if (err.response) {
                let { statusCode, body } = err.response.toJSON()
                let { message } = JSON.parse(body)
                err = { status: statusCode, message: 'NYT API Error: ' + message }
            }
            next(err)
        })
}

module.exports = {
    name: NAME,
    description: DESCRIPTION,
    callback
}