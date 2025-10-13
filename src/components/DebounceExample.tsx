import axios from "axios";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

const DebounceExample: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [debouncedVal, setDebouncedVal] = useState<string>("");
  const [products, setProducts] = useState<any>([]);
  const [filteredProduct, setFilteredProduct] = useState<any>([]);

  const getDummyProduct = async (query: string | number) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      setProducts(data?.products);
    } catch {}
  };

  const filteredProducts = useMemo(() => {
    if (!products || !debouncedVal) return [];

    const term = debouncedVal?.toLowerCase() || "";
    return products.filter((product: { description: string }) =>
      product.description.toLowerCase().includes(term)
    );
  }, [products, debouncedVal]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedVal(inputVal);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [inputVal]);

  useEffect(() => {
    if (debouncedVal) {
      getDummyProduct(debouncedVal);
    }
  }, [debouncedVal]);

  const styles = {
    autoInput: {
      minWidth: "400px",
    },
    searchItems: {
      display: "relative",
      top: "10px",
      left: "15px",
      background: "#F2F0EF",
      padding: "10px 10px",
      border: "1px solid black",
      borderRadius: "5px",
    },
    items: {
      animation: "popIn 0.5s ease forwards",
    },
  };
  return (
    <div className="container d-flex justify-content-center">
      <div className="d-block">
        <input
          type="text"
          placeholder="Search your products..."
          className="p-2 mb-3 rounded border"
          style={styles.autoInput}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        ></input>
        {filteredProducts.length > 0 && (
          <div style={styles.searchItems}>
            {filteredProducts?.map((product: any, index: number) => (
              <ul className="px-0 mx-0" key={product.id} style={styles.items}>
                {product.title}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebounceExample;
