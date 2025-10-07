import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const ProductList = ({ storeId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from('products').select('*');

      if (storeId) {
        query = query.eq('store_id', storeId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, [storeId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-700 mt-1">{product.description}</p>
          <p className="text-blue-500 mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;