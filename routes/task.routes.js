const router = require("express").Router();

const mongoose = require("mongoose");
 
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

router.post("/tasks", async (req, res) => {
    const { title, description, projectId } = req.body;
    
    try{
        let newTask = await Task.create({ title, description, project: projectId });
        let response = await Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } } );
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});
 
module.exports = router;