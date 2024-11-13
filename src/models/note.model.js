import mongoose from 'mongoose';
import { paginate, toJSON } from './plugins/index.js';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// is note exists
noteSchema.statics.isNoteExists = async function (title) {
  const note = await this.findOne({ title });
  return !!note;
};

// add plugins
noteSchema.plugin(toJSON);
noteSchema.plugin(paginate);

const Note = mongoose.model('Note', noteSchema);

export default Note;
