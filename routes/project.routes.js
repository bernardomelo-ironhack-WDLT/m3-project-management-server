const router = require("express").Router();

const mongoose = require("mongoose");
 
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
 
//  POST /api/projects  -  Creates a new project
router.post("/projects", async (req, res) => {
  const { title, description } = req.body;
    try{
        let response = await Project.create({ title, description, tasks: [] })
        res.json(response);
    } catch (error) {
        res.json(error);
    };
});

router.get('/projects', async (req, res) => {
    try{
    let allProjects = await Project.find().populate('tasks');
    res.json(allProjects);
    }
    catch(error){
        res.json(error);
    }
});


router.get('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Project document has a `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    try{
        let foundProject = await Project.findById(projectId).populate('tasks');
        res.status(200).json(foundProject);
    }
    catch(error){
        res.json(error);
    }
  });


router.put('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    try{
      let updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
      res.json(updatedProject);
    }
    catch (error) {
      res.json(error)
    }
});

router.delete('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    try{
      await Project.findByIdAndRemove(projectId);
      res.json({ message: `Project with ${projectId} is removed successfully.` })
    }
    catch (error) {
      res.json(error)
    }
});
   

module.exports = router;
