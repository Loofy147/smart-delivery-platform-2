import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, price, image_url, store_id } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, description, price, image_url, store_id }]);

    if (error) {
      return res.status(500).json({ error: 'Failed to create product' });
    }

    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}