import { useState } from 'react';
import ProductList from '../components/ProductList';
import StoreSelector from '../components/StoreSelector';

const ProductsPage = () => {
  const [selectedStoreId, setSelectedStoreId] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>
      <StoreSelector onSelectStore={setSelectedStoreId} />
      <ProductList storeId={selectedStoreId} />
    </div>
  );
};

export default ProductsPage;
