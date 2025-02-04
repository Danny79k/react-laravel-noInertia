import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)

  const addPage = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const subPage = () => {
    setPage((prevPage) => prevPage - 1)
  }

  console.log(page)

  useEffect(() => {
    // Función para obtener los productos desde el endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/productos?page=${page}`);
        setProducts(response.data.data); // Asumiendo que los datos están en response.data.data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]); // El array vacío como segundo argumento asegura que esto se ejecute solo una vez

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.data.name}</h2>
            <p>{product.data.description}</p>
            <img src={product.data.image} alt={product.data.slug} />
          </li>
        ))}
      </ul>
      <button onClick={subPage} disabled={page === 1}>atras</button>
      <button onClick={addPage} disabled={page === 5}>adelante</button>
    </div>

  );
};

export default ProductList;