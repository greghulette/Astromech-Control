
const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member=> member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

//create members
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  res.json(members);

});


router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: ' Member was updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});


router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({ msg: "Member Deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});




module.exports = router;
