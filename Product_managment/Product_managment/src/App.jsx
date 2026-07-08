import './assets/Navbar.css'
import './assets/Dashboard.css'
import './assets/ProductCard.css'
import './assets/ViewProduct.css'
import './assets/Cart.css'
import './assets/Checkout.css'
import './assets/Orders.css'
import './assets/Auth.css'
import './assets/Responsive.css'
import './assets/Footer.css'

import Navbar from './Components/Navbar';
import DisplayAllProducts from './Components/DisplayAllProducts';
import UpdateProduct from './Components/UpdateProduct';
import AddProduct from './Components/AddProduct';
import ViewProduct from './Components/ViewProduct';
import Footer from './Components/Footer';
import Register from './Components/Register';
import Login from './Components/Login';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Orders from './Components/Orders';
import AdminOrders from './Components/AdminOrders';
import API_BASE from './config/api';

import {
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';

import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const filterProducts = (list, query) => {
    if (!query) return list;
    const lower = query.toLowerCase();
    return list.filter((item) =>
      item.pname?.toLowerCase().includes(lower) ||
      item.prooductBrand?.toLowerCase().includes(lower) ||
      item.brand?.toLowerCase().includes(lower) ||
      item.productDiscription?.toLowerCase().includes(lower)
    );
  };

  const fetchProducts = async (query = "", signal) => {
    const sessionJson = sessionStorage.getItem("products");
    const savedProducts = sessionJson ? JSON.parse(sessionJson) : null;

    if (savedProducts) {
      setRawProducts(savedProducts);
      setProducts(filterProducts(savedProducts, query));
      console.log('session products count', savedProducts.length);
    }

    const endpoint = query
      ? `${API_BASE}/Product?search=${encodeURIComponent(query)}`
      : `${API_BASE}/Product`;
    setIsLoading(true);
    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('API response length', data.length);

      const merged = data.map((product) => {
        const saved = savedProducts?.find((p) => p.pid === product.pid);
        return saved ? { ...product, stock: Math.max(0, Number(saved.stock ?? product.stock)) } : product;
      });

      if (!query) {
        sessionStorage.setItem("products", JSON.stringify(merged));
      }

      setRawProducts(merged);
      const filtered = filterProducts(merged, query);
      console.log('products state length', filtered.length);
      setProducts(filtered);
    }
    catch (error) {
      console.error('Product fetch error:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      fetchProducts(search.trim());
    }
  }, [location.pathname]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchProducts(search.trim(), controller.signal);
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const refreshProducts = () => {
    fetchProducts(search.trim());
  };

  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <div className='dashboard-page'>
              <div className='dashboard-header'>
                <div className='search-panel'>
                  <span className='search-icon'>🔍</span>
                  <input
                    type='search'
                    className='search-box'
                    placeholder='Search products, brands or categories'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      className='clear-search-btn'
                      onClick={() => setSearch("")}
                      type='button'
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className='search-summary'>
                  {isLoading
                    ? 'Searching products...'
                    : `${products.length} product${products.length === 1 ? '' : 's'} available`}
                </div>
              </div>
              <div className='product-container'>
                {console.log('rendered products count', products.length)}
                {products.map((item) => (
                  <DisplayAllProducts
                    key={item.pid}
                    ProductDetails={item}
                  />
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/update"
          element={<UpdateProduct />}
        />

        <Route
          path="/checkout"
          element={<Checkout onOrderPlaced={refreshProducts} />}
        />

        <Route
          path="/add"
          element={<AddProduct />}
        />

        <Route
          path="/about"
          element={<Navigate replace to="/" />}
        />

        <Route
          path="/product/:id"
          element={<ViewProduct Products={products} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/orders"
          element={<Orders />}
        />


        <Route
          path="/admin-orders"
          element={<AdminOrders />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;