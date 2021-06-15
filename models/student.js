const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  classes: {
      type: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
      ],
    default: []
    },
    assignments: {
        type: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Assignment'
          }
        ],
      default: []
      }

}, {
  timestamps: true,
  
});


module.exports = mongoose.model('Student', studentSchema);