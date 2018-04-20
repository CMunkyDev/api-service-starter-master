const express = require('express')
const app = express()

app.get('/', (req, res) => res.send(
    {
        server: {
            name: 'API Starter Server',
            apiVersion: '0.2'
        },
        availableDataSeries: {
            increasingData: {
                name: 'Increasing data values',
                description: 'Numbers 1 to 5'
            },
            flatData: {
                name: 'Flat data values',
                description: "Just the number 5"
            }
        }
    }
))


app.get('/api/increasingData', (req, res) => res.send(
    {
        format: 'date',
        initialDataSet: [
            [Date.now(), 1],
            [Date.now()+10, 2],
            [Date.now()+20, 3],
            [Date.now()+30, 4],
            [Date.now()+40, 5],
        ]
    }
))

app.get('/api/flatData', (req, res) => res.send(
    {
        format: 'date',
        initialDataSet: [
            [Date.now(), 5],
            [Date.now()+10, 5],
            [Date.now()+20, 5],
            [Date.now()+30, 5],
            [Date.now()+40, 5],
        ]
    }
))

app.listen(3050, () => console.log('Listening on port 3050!'))