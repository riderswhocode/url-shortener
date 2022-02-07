const URLModel = require('../models/url.model')

exports.shorten_url = async (req, res, next) => {

    const url = await URLModel.create({
        fullUrl: req.body.fullUrl,
        user_id: req.body.user_id
    })
    res.status(200).send({
        'status': 200,
        'payload': url
    })
}

exports.list_url_by_id = async (req, res, next) => {
    URLModel.find({ user_id: req.params.id })
    .then(urls => {
        if (!urls) {
            res.status(404).send({
                'status': 404,
                'message': 'No URL found'
            })
        }
    })

}

exports.resolve_url = async (req, res, next) => {
    const url = await URLModel.findOne({ shortUrl: req.params.url})
    if (!url) {
        res.status(404).send({
            "status": 404,
            "message": "Cannot resolve URL"
        })
    }

    url.clicks++
    url.save()

    res.redirect(url.fullUrl)

}