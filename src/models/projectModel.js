var mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    gitDirectory: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Users', ProjectSchema)