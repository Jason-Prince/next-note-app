import dbConnect from '@/utils/dbConnect';
import Note from '@/models/Note';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const note = await Note.create(body);
        res.status(201).json({ success: true, data: note })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}