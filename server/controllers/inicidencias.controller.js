var Incidencia = require("../models/incidencia");

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch(err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if(entity) {
            return entity.remove()
                    .then(function() {
                    res.status(204).end();
        });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Incidencias
module.exports.index = function (req, res) {
    return Incidencia.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Gets a single Incidencia from the DB
module.exports.show = function (req, res) {
    return Incidencia.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Creates a new Incidencia in the DB
module.exports.create = function (req, res) {
    return Incidencia.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
};

// Upserts the given Incidencia in the DB at the specified ID
module.exports.upsert = function (req, res) {
    if(req.body._id) {
        delete req.body._id;
    }
    return Incidencia.findOneAndUpdate({_id : req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Updates an existing Incidencia in the DB
module.exports.patch = function (req, res) {
    if(req.body._id) {
        delete req.body._id;
    }
    return Incidencia.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Deletes a Incidencia from the DB
module.exports.destroy = function (req, res) {
    return Incidencia.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};