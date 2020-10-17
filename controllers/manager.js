const express = require('express');
const Position = require('../models/position');
const enums = require('../utils/enums');
const NotificationService = require('../services/notification.service');

function toResult(position) {
  return {
    id: position.id,
    name: position.name,
    role: position.role,
    technologies: position.technologies,
    status: position.status
  };
}

async function getAllPosition(req, res, next) {
  try {
    var query = { 'createdBy': req.user.id };
    const positions = await Position.find(query);
    var data = positions.map(position => toResult(position));
    res.render('../views/manager/position-list', {
      data: data
    });
  } catch (err) {
    res.render('../views/manager/position-list', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
}

async function savePosition(req, res, next) {
  try {
    const position = new Position({
      ...req.body,
      createdBy: req.user.id,
      lastUpdatedOn: new Date()
    });

    const result = await position.save();

    NotificationService.subscribeToJobByManager(result.id);
    res.render('../views/manager/position-add', {
      message: 'Position added successfully.',
      type: 'success'
    });
  } catch (err) {
    res.render('../views/manager/position-add', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
}

async function getPositionById(req, res, next) {
  try {
    var query = { '_id': req.params.id, 'createdBy': req.user.id };
    const position = await Position.findOne(query);
    if (position) {
      var data = {
        id: position.id,
        name: position.name,
        clientName: position.clientName,
        technologies: position.technologies,
        role: position.role,
        description: position.description,
        status: position.status
      };

      res.render('../views/manager/position-edit', { data: data });
    } else {
      res.render('../views/manager/position-edit', {
        message: 'Position not found.',
        type: 'danger'
      });
    }

  } catch (err) {
    res.render('../views/manager/position-edit', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
}

async function updatePosition(req, res, next) {
  try {
    var query = { '_id': req.params.id, 'createdBy': req.user.id };

    var newValues = {
      $set: {
        name: req.body.name,
        clientName: req.body.clientName,
        technologies: req.body.technologies,
        role: req.body.role,
        description: req.body.description,
        status: req.body.status,
        lastUpdatedOn: new Date()
      }
    };

    var result = await Position.updateOne(query, newValues);

    if (req.body.status == enums.jobStatus.Closed) {
      NotificationService.sendNotificationToEmployee(req.params.id);
    }

    res.render('../views/manager/position-edit', {
      message: 'Position updated successfully.',
      type: 'success',
      data: req.body,
    });

  } catch (err) {
    res.render('../views/manager/position-edit', {
      message: 'Some error occured.',
      type: 'danger',
      data: req.body
    });
  }
}

module.exports = {
  getAllPosition,
  savePosition,
  getPositionById,
  updatePosition
};