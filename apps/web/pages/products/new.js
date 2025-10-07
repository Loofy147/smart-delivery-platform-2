import { useState } from 'react';
import { useRouter } from 'next/router';

const NewProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        store_id: 1, // Hardcoded for now
      }),
    });

    if (response.ok) {
      router.push('/products');
    } else {
      console.error('Failed to create product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-lg font-semibold">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg font-semibold">Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default NewProductPage;