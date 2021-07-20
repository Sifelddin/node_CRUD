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
        
       res.render('Contact')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
})

//one subscriber
router.get('/:id',async (req, res) => {
try {
    const singleSub = await Subscriber.findById(req.params.id)
    res.render('index', {singleSub : singleSub})
} catch (err) {
    res.status(500).json({ message: err.message })
 }   
})

router.post('/', async (req, res) => {
   
   
    const subscriber = new Subscriber ({
        nom: req.body.nom,  
        prenom: req.body.prenom,  
        dateN: req.body.dateN,  
    })
    
    try {
        const newsubscriber = await subscriber.save()
        res.redirect('/subscribers')
    } catch (err) {
        res.status(400).json({message: err.message})
        
    }
})
router.put('/:id',async (req, res) => {
    if (req.body.nom != null) {
        res.singleSub.nom = req.body.nom
    }
    if (req.body.prenom != null) {
        res.singleSub.prenom = req.body.prenom
    }
    if (req.body.dateN != null) {
        res.singleSub.dateN = req.body.dateN
    }
    try {
        await Subscriber.findByIdAndUpdate(req.params.id)
        res.redirect('/subscribers')
   } catch (err) {
           res.status(400).json({message: err.message  })
       }
})
router.delete('/:id',async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id)
        ;
        res.redirect('/subscribers')
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


