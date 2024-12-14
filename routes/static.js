const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname, '..', 'public')

router.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

router.get('/menu/:code', (request, response) => {
    response.sendFile('index.html', { root })
})

router.get('/events/:code', (request, response) => {
    response.sendFile('events.html', { root })
})

router.get('/admin-menu.html', (request, response) => {
    response.sendFile('admin-menu.html', { root })
})

router.get('/admin-events.html', (request, response) => {
    response.sendFile('admin-events.html', { root })
})

module.exports = router