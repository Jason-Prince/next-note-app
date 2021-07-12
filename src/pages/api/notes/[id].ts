import dbConnect from '@/utils/dbConnect';
import Note from '@/models/Note';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: true, data: note });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case 'PUT':
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })

        if (!note) {
          return res.status(400).json({ success: false });
        }

        return res.status(200).json({ success: true, data: note });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) {
          return res.status(400).json({ success: false });
        }

        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      return res.status(400).json({ success: false });
      break;

  }

}