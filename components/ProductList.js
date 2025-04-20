import { useEffect, useState } from 'react';
// Removed Supabase import and initialization

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.99, image_url: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 19.99, image_url: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 5.99, image_url: 'https://via.placeholder.com/150' },
  ]);

  // Removed useEffect and data fetching

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
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugklcxqrjgazigmmisjv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVna2xjeHFyamdhemlnbW1pc2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTQyMTQsImV4cCI6MjA2MDczMDIxNH0.ZE21OA1pg6gjb2ygOJ7zTuoMgwLPIRz7iDZQxILUw1k';

const supabase = createClient(supabaseUrl, supabaseKey);

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products') // Replace with your actual table name
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    }

    fetchProducts();
  }, []);

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
