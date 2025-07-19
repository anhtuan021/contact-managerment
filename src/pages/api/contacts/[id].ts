import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Contact from '../../../models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const contact = await Contact.findById(id);
      if (!contact) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(contact);

    case 'PUT':
      try {
        const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updated);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }

    case 'DELETE':
      await Contact.findByIdAndDelete(id);
      return res.status(204).end();

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
