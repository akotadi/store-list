import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

export const useStore = () => {
  const [products, setProducts] = useState([])
  const [newProduct, handleNewProduct] = useState()
  const [productListener, setProductListener] = useState(null)

  useEffect(() => {
    fetchList()
      .then((response) => {
        setProducts(response)
      })
      .catch(console.error)
  })

  useEffect(() => {
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
  }, [newProduct])

  useEffect(() => {
    if (!productListener) {
      setProductListener(
        supabase
          .from(`products`)
          .on('INSERT', (payload) => handleNewProduct(payload.new))
          .on('UPDATE', (payload) => handleNewProduct(payload.new))
          .subscribe()
      )
    }
  }, [productListener])

  return { products, setProducts }
}

export const addProduct = async (name, description, price) => {
  try {
    let { body } = await supabase.from('products').insert([{ name, description, price }])
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const updateProduct = async (product_id, name, description, price) => {
  try {
    let { body } = await supabase.from('products').eq('id', product_id).update(name, description, price)
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const deleteProduct = async (product_id, values) => {
  try {
    let { body } = await supabase.from('products').eq('id', product_id).delete()
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchList = async () => {
  try {
    let { body } = await supabase
      .from('products')
      .select(`*`)
    return body
  } catch (error) {
    console.log('error', error)
  }
}