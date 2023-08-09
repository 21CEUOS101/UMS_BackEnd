const mongoose = require('mongoose');

const TimeTableBlockSchema = mongoose.Schema({
    time_table_block_id: {
        type: String,
        required: true,
    },
    time_table_id: {
        type: String,
        required: true,
    },
    time_table_block_day: {
        type: String,
        required: true,
    },
    time_table_block_time: {
        type: String,
        required: true,
    },
    time_table_block_subject: {
        type: String,
        required: true,
    },
    time_table_block_faculty: {
        type: String,
        required: true,
    },
    time_table_block_room_no: {
        type: String,
        required: true,
    },
    time_table_block_department: {
        type: String,
        required: true,
    },
    time_table_block_semester: {
        type: String,
        required: true,
    },
    time_table_block_section: {
        type: String,
        required: true,
    },
    time_table_block_section_no: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('TimeTableBlock', TimeTableBlockSchema);