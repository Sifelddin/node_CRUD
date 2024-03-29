const express = require('express');
const Subscriber = require('../models/subscriber');
const router = express.Router();

//all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.render('list', { subscribers: subscribers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/new', async (req, res) => {
  try {
    res.render('new');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//one subscriber
router.get('/:id', async (req, res) => {
  try {
    const singleSub = await Subscriber.findById(req.params.id);
    res.render('details', { singleSub: singleSub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    nom: req.body.nom,
    prenom: req.body.prenom,
    dateN: req.body.dateN,
  });

  try {
    await subscriber.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  let singleSub = await Subscriber.findById(req.params.id);
  singleSub.nom = req.body.nom;
  singleSub.prenom = req.body.prenom;
  singleSub.dateN = req.body.dateN;

  try {
    singleSub.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
