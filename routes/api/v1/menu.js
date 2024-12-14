const router = require('express').Router()
const { getCollection, ObjectId } = require('../../../dbconnect')

let collection = null
const getMenu = async () => {
    if (!collection) collection = await getCollection('FoodTruckAPI', 'FoodTruck')
    return collection
}

router.post('/add', async (request, response) => {
    const { name, type, description, src, price, code } = request.body
    const collection = await getMenu()
    const { acknowledged, insertedId } = await collection.insertOne({ name, type, description, src, price, code })
    response.send({ acknowledged, insertedId })
})

router.get('/:code', async (request, response) => {
    const { code } = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ "code": code })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item: ${code}` }})
})

router.get('/', async (request, response) => {
    const { type } = request.params
    const collection = await getMenu()

    const found = await collection.find({ type: 'menu'}).toArray();

    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu!` }})
})

module.exports = router