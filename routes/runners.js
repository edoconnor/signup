const express = require('express')
const runner = require('../models/runner')
const router = express.Router()
const Runner = require('../models/runner')

router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const runners = await Runner.find(searchOptions)
      res.render('runners/index', {
        runners: runners,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })

router.get('/signup', (req, res) => {
    res.render('runners/signup', { runner: runner })
})

router.post('/', async (req, res) => {
    const runner = new Runner({
      name: req.body.name
    })
    try {
      const newRunner = await runner.save()
      res.redirect(`runners`)
    } catch {
      res.render('runners/signup', {
        runner: runner,
        errorMessage: 'Error creating Runner'
      })
    }
  })

module.exports = router