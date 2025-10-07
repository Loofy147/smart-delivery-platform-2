import { useEffect, useState } from 'react';

const StoreSelector = ({ onSelectStore }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      const response = await fetch('/api/stores');
      if (response.ok) {
        const data = await response.json();
        setStores(data);
      } else {
        console.error('Failed to fetch stores');
      }
    }
    fetchStores();
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor="store" className="block text-lg font-semibold">Select a Store</label>
      <select
        id="store"
        onChange={(e) => onSelectStore(e.target.value)}
        className="w-full border rounded-lg p-2"
      >
        <option value="">All Stores</option>
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreSelector;