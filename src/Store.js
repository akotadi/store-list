import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

export const useStore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleProductInserted = (payload) => {
    setLoading(true);
    setProducts((prev) => [...prev, payload.new]);
    setLoading(false);
  };

  const handleProductUpdated = (payload) => {
    setLoading(true);
    setProducts((prev) => prev.map(product => product.id === payload.old.id ? payload.new : product));
    setLoading(false);
  };

  const handleProductDeleted = (payload) => {
    setLoading(true);
    setProducts((prev) => prev.filter(product => product.id !== payload.old.id));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchList()
      .then((response) => {
        setProducts(response ?? []);
      })
      .catch(console.error)
      .finally(setLoading(false));
    
    const productsListener = supabase
      .from(`products`)
      .on('INSERT', handleProductInserted)
      .on('UPDATE', handleProductUpdated)
      .on('DELETE', handleProductDeleted)
      .subscribe();

    setLoading(false);

    return () => {
      productsListener.unsubscribe();
    };
  }, []);

  return { products, setProducts, loading, setLoading }
}

export const addProduct = async (name, description, price) => {
  const { data: product, error } = await supabase
    .from('products')
    .upsert([
      { name, description, price },
    ]).single();

  if(error)
    console.error(error);
  else
    return product;
}

export const updateProduct = async (product_id, name, description, price) => {
  const { data: product, error } = await supabase
    .from('products')
    .update({ name, description, price })
    .eq('id', product_id).single();

  if(error)
    console.error(error);
  else
    return product;
}

export const deleteProduct = async (product_id) => {
  const { data: product, error } = await supabase
    .from('products')
    .delete()
    .eq('id', product_id).single();

  if(error)
    console.error(error);
  else
    return product;
}

export const fetchList = async () => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');
  
  if(error)
    console.error(error);
  else
    return products;
}
