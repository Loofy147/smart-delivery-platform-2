import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description } = req.body;

    const { data, error }_ = await supabase
      .from('stores')
      .insert([{ name, description }]);

    if (error) {
      return res.status(500).json({ error: 'Failed to create store' });
    }

    return res.status(201).json(data);
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('stores').select('*');

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch stores' });
    }

    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}