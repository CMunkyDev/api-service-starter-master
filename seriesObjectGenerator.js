const path = require('path')
const fs = require('fs')

let dataNames = fs.readdirSync(`${__dirname}${path.sep}data-series`)
let availableDataSeries = {}
let seriesCallbacks = {}

dataNames.forEach(seriesFileName => {
    let seriesName = seriesFileName.slice(0, -3)
    let series = require(`.${path.sep}data-series${path.sep}${seriesFileName}`)
    let { name, description, callback } = series

    availableDataSeries[seriesName] = {
        name,
        description
    }

    seriesCallbacks[seriesName] = callback
})

module.exports = {
    availableDataSeries,
    seriesCallbacks
}