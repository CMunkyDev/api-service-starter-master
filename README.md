# Node.js Challenge: Microservice Starter

## Goal
To test your ability to be self sufficient, work with 3rd party data, and write code. You have about 4 hours to complete the challenge and at the end you’ll present your work.

## Challenge
Write a Node.js server that pulls data from an external data source and returns it in the [Common Microservice API](#common-microservice-api) format. This is a trivialized version of an API that is used on a Collinear Group project. The goal of the API is give a common API when working with many disparate data sources.

The external data source that you will use can be any kind of public data: a downloaded CSV, data you manually scrapped from a website, or a public API. It is up to you to choose the source.

## Evaluation
At the end of the alotted time you will join up with the Collinear Team and walk us through your approach. Be prepared for questions.

## Getting Started

You can refer to the existing `index.js` as an example of a service that implements the [Common Microservice API](#common-microservice-api).

Put your code in a file called `app.js` and update the `package.json` to run your service and not the example one.

Ready? Go!

## Common Microservice API

### Get server info (`/`)
Returns:
* server: Object
    * name: string
    * apiVersion: string
* availableDataSeries: Object
    * \<seriesName>: Object
        * name
        * description


### Get data (`/api/:seriesName`)
Returns:
* format: "date"
* initialDataSet: Array
    * Array
        * \<UNIX timestamp>: number
        * \<dataValue>: number
