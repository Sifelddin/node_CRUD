const express = require('express')
const Subscriber = require('../models/subscriber')
const router = express.Router()



//all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.send(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
})

//one subscriber
router.get('/:id', getsubscriber, (req, res) => {
    console.log(res.subscriber);
  res.send(res.subscriber)
})

router.post('/', async (req, res) => {
   console.log(req.body) 
    const subscriber = new Subscriber ({
        name: req.body.nom,
    
    })
    try {
        const newsubscriber = await subscriber.save()
        res.status(201).json(newsubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
        
    }
})
router.patch('/:id', getsubscriber,async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
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


