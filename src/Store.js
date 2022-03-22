import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

export const useStore = () => {
  const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [newProduct, handleNewProduct] = useState()

  useEffect(() => {
    if(!navigator.onLine){
      setProducts(localStorage.getItem('Products'));
    }else{
      fetchList()
        .then((response) => {
          setProducts(response)
        })
        .catch(console.error);
    }

    // TODO: Fix this shit
    const subscription = supabase
      .from('products')
      .on('*', payload => {console.log('aaa1'); console.log(payload);})
      .subscribe();

    return () => {
      subscription.unsubscribe();
    }
  }, [])

  useEffect(() => {
    console.log('new product');
    const handleAsync = async () => {
      if (newProduct) {
        // could be an update
        let update = products.find((product, i) => {
          if (product.id === newProduct.id) {
            products[i] = newProduct
            return true
          } else {
            return false
          }
        })
        if (update) {
          setProducts(t => [...products]) // update
        } else {
          products.unshift(newProduct)
          setProducts(t => [...products]) // new
        }
      }
    }
    handleAsync()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProduct])

  return { products, setProducts }
}

export const addProduct = async (name, description, price) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .upsert([
        { name, description, price },
      ]);
    
    if(error) {
      console.error(error);
      return;
    }
    
    return data;
  } catch (error) {
    console.log('error', error)
  }
}

export const updateProduct = async (product_id, name, description, price) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ name, description, price })
      .eq('id', product_id);
    
    if(error) {
      console.error(error);
      return;
    }
    
    return data;
  } catch (error) {
    console.log('error', error)
  }
}

export const deleteProduct = async (product_id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', product_id);
    
    if(error) {
      console.error(error);
      return;
    }
    
    return data;
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchList = async () => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');
    
    if(error) {
      console.error(error);
      return;
    }
    
    return products;
  } catch (error) {
    console.error('error', error)
  }
}