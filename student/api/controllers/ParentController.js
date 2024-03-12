/**
 * ParentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/ParentController.js

module.exports = {
    create: async function (req, res) {
      try {
        const parent = await Parent.create(req.body).fetch();
        return res.status(201).json(parent);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
  
    find: async function (req, res) {
      try {
        const parents = await Parent.find();
        return res.json(parents);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
  
    findOne: async function (req, res) {
      try {
        const parent = await Parent.findOne({ id: req.params.id });
        if (!parent) {
          return res.status(404).json({ error: 'Parent not found' });
        }
        return res.json(parent);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
  
    update: async function (req, res) {
      try {
        const updatedParent = await Parent.updateOne({ id: req.params.id }).set(req.body);
        if (!updatedParent) {
          return res.status(404).json({ error: 'Parent not found' });
        }
        return res.json(updatedParent);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
  
    delete: async function (req, res) {
      try {
        const deletedParent = await Parent.destroyOne({ id: req.params.id });
        if (!deletedParent) {
          return res.status(404).json({ error: 'Parent not found' });
        }
        return res.json(deletedParent);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    },
    search: async function (req, res) {
        try {
          const firstName = req.params.firstName;
          const parents = await Parent.find({
            firstName: { $regex: new RegExp(firstName, 'i') }
          });
          
          if (!parents || parents.length === 0) {
            return res.status(404).json({ msg: "Parents not found." });
          }
    
          res.status(200).json(parents);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

  };
  

