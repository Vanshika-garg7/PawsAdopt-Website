const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/pawsadoptDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

router.use(bodyParser.json());

router.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });

  newContact.save()
      .then(() => res.json({ message: 'Contact saved!' }))
      .catch(err => {
          console.error('Error saving contact:', err.message); // Log the error message
          res.status(400).json({ message: 'Error saving contact'});
      });
});

module.exports = router;

