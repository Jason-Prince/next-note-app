import mongoose, { Schema, model } from 'mongoose'

interface Note {
  title: string;
  description: string
}

const MODEL_NAME = 'NoteModel';

const NoteSchema = new Schema<Note>({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trime: true,
    maxlengthe: [40, 'Title cannot be more than 40 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
})

export default mongoose.models[MODEL_NAME] || model<Note>(MODEL_NAME, NoteSchema);