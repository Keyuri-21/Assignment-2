/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');

module.exports = {
    create: async function (req, res) {
        try {
          const uploadFile = req.file('profilePic');
          const uploadPath = path.resolve(sails.config.appPath, 'assets/images/uploads');
      
          uploadFile.upload({ dirname: uploadPath }, async (err, uploadedFiles) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
      
            const studentData = {
              email: req.body.email,
              std: req.body.std,
              school: req.body.school,
              profilePic: uploadedFiles[0] ? '/images/uploads/' + uploadedFiles[0].fd.replace(/^.*[\\\/]/, '') : ''
            };
      
            const student = await Student.create(studentData).fetch();
            return res.status(201).json(student);
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      },

      find: async function (req, res) {
        try {
          const students = await Student.find();
          return res.json(students);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      },
    
      findOne: async function (req, res) {
        try {
          const student = await Student.findOne({ id: req.params.id });
          if (!student) {
            return res.status(404).json({ error: 'Student not found' });
          }
          return res.json(student);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      },    
    
      update: async function (req, res) {
        try {
          const uploadFile = req.file('profilePic');
          const uploadPath = path.resolve(sails.config.appPath, 'assets/images/uploads');
    
          uploadFile.upload({ dirname: uploadPath }, async (err, uploadedFiles) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
    
            const updatedStudentData = {
              email: req.body.email,
              std: req.body.std,
              school: req.body.school,
              profilePic: uploadedFiles[0] ? '/images/uploads/' + uploadedFiles[0].fd.replace(/^.*[\\\/]/, '') : ''
            };
    
            // // Optional: Remove the old profile picture file if it exists
            // const oldStudent = await Student.findOne({ id: req.params.id });
            // if (oldStudent && oldStudent.profilePic) {
            //   const oldFilePath = path.resolve(sails.config.appPath, 'assets', oldStudent.profilePic.substr(1));
            //   fs.unlinkSync(oldFilePath);
            // }
    
            const updatedStudent = await Student.updateOne({ id: req.params.id }).set(updatedStudentData);
            if (!updatedStudent) {
              return res.status(404).json({ error: 'Student not found' });
            }
    
            return res.json(updatedStudent);
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      },

      delete: async function (req, res) {
        try {
          const deletedStudent = await Student.destroyOne({ id: req.params.id });
          if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
          }
    
        //   // Optional: Remove the profile picture file if it exists
        //   if (deletedStudent.profilePic) {
        //     const filePath = path.resolve(sails.config.appPath, 'assets', deletedStudent.profilePic.substr(1));
        //     fs.unlinkSync(filePath);
        //   }
    
          return res.json(deletedStudent);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      },
    
      searchByEmail: async function (req, res) {
        try {
          const email = req.params.email;
          const students = await Student.find({
            email: { $regex: new RegExp(email, 'i') }
          });
    
          if (!students || students.length === 0) {
            return res.status(404).json({ msg: "Students not found." });
          }
    
          res.status(200).json(students);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    

};

