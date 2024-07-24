const transectionModel = require('../models/transectionModel');
const moment = require('moment');

const getAllTransections = async (req, res) => {
       try {
              const { fequency, selectedDate, type } = req.body;
              const transection = await transectionModel.find({
                     ...(fequency !== 'custom' ? {
                            date: {
                                   $gt: moment().subtract(Number(fequency), "d").toDate(),
                            },
                     } : {
                            date: {
                                   $gte: selectedDate[0],
                                   $lte: selectedDate[1]
                            },
                     }),
                     userid: req.body.userid,
                     ...(type !== 'all' && { type }), // Ensure correct type handling
              });
              res.status(200).json(transection);
       } catch (error) {
              console.log(error);
              res.status(500).json(error);
       }
};

const editTransection = async (req, res) => {
       try {
              await transectionModel.findOneAndUpdate({ _id: req.body.transectionId }, req.body.payload);
              res.status(200).send("Transection updated successfully");
       } catch (error) {
              console.log(error);
              res.status(500).json(error);
       }
};

const deleteTransection = async (req, res) => {
       try {
              await transectionModel.findOneAndDelete({ _id: req.body.transectionId })
              res.status(200).send("Transection Delete successfully");
       } catch (error) {
              console.log(error);
              res.status(500).json(error);
       }
};

const addTransection = async (req, res) => {
       try {
              const newTransection = new transectionModel(req.body);
              await newTransection.save();
              res.status(201).send("Transection saved successfully");
       } catch (error) {
              console.log(error);
              res.status(500).json(error);
       }

};

module.exports = { getAllTransections, addTransection, editTransection, deleteTransection };
