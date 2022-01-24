const notFound = (req, res) => {
    res.send(`Cannot GET route ${req.url}`)
}

module.exports = notFound