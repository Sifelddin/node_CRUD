const express = require('express')
const Subscriber = require('../models/subscriber')
const router = express.Router()
const path = require('path');


//all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find() 
    
       res.render('Tableau', {subscribers : subscribers})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
})
router.get('/new', async (req, res) => {
    try {
        const subscribers = await Subscriber.find() 
       res.render('Contact')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
})

//one subscriber
router.get('/:id', getsubscriber, (req, res) => {
  res.send(res.subscriber)
})

router.post('/', async (req, res) => {
   console.log(req.body) 
   
    const subscriber = new Subscriber ({
        nom: req.body.nom,  
        prenom: req.body.prenom,  
        dateN: req.body.dateN,  
    })
    
    try {
        const newsubscriber = await subscriber.save()
        res.status(201).json(newsubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
        
    }
})
router.patch('/:id', getsubscriber,async (req, res) => {
    if (req.body.nom != null) {
        res.subscriber.nom = req.body.nom
    }
    if (req.body.prenom != null) {
        res.subscriber.prenom = req.body.prenom
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
   } catch (err) {
           res.status(400).json({message: err.message  })
       }
})
router.delete('/:id',getsubscriber,async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'deleted subscriber  '})
    } catch (err) {
        res.status(500).json({message: err.message})
   }
})





async function getsubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({
                message: 'cannot find subscriber'
            })
        }
    } catch (err) {
        return res.status(500).json({message:err.message})
    }
    res.subscriber = subscriber
    
    next()
}

module.exports = router


