import mongoose from 'mongoose';

const PerformanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    },
    fields: [
        {
        name: {type: String}, 
        score: {type: Number},
        comments: {type: String}
    }
    ]
});

const Performance = mongoose.model('Performance', PerformanceSchema);

module.exports = Performance;