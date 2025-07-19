import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Contact from '../../../models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const contacts = await Contact.find({});
      return res.status(200).json(contacts);

    case 'POST':
      try {
        const contact = await Contact.create(req.body);
        return res.status(201).json(contact);
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
