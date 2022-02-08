const router = require('express').Router()

const Url = require('../controller/url.controller')

router.get('/', Url.index)
router.get('/url_list/:id', Url.list_url_by_id)
router.post('/shorten', Url.shorten_url)

router.get('/:url', Url.resolve_url)

module.exports = router