const express = require('express');
var bodyParser = require('body-parser');

const router = express.Router()

const Project = require('../models/projectModel')

//gets all projects
router.get('/', async function (req, res) {
  try {
    const projects = await Project.find();
      res.render('projects', {projects})
  } catch (err) {
      res.json({message: err});
  }
    
});

//get project by id
router.get('/:id', async function (req, res) {
  try {
    const project = await Project.findById(req.params.id);
      res.send(project)
  } catch (err) {
      res.json({message: err});
  }
    
});

//submits a project
router.post('/', async function (req, res) {
  const project = new Project({
    projectName: req.body.projectName,
    description: req.body.description,
    image: req.body.image,
    gitDirectory: req.body.gitDirectory
  });

  try {
      const savedPost = await Project.save()
      res.json(savedPost);
  } catch (err) {
    res.json({message: err});
  }
});

//update a project
router.put('/:id', async function (req, res) {
  try {
      const project = await Project.updateOne({_id: req.params.id}, 
        {
          $set: { 
          projectName: req.body.projectName,
          description: req.body.description,
          image: req.body.image,
          gitDirectory: req.body.gitDirectory
          }
        });

      res.send(project)
  } catch (err) {
      res.json({message: err});
  }
});

//delete a project
router.delete('/:id', async function (req, res) {
  try {
      const project = await Project.remove({_id: req.params.id});
      res.send(project)
  } catch (err) {
      res.json({message: err});
  }
});

module.exports = router;