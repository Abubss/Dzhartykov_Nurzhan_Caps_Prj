import React, { useEffect, useState } from "react";

import styles from "./MainPage.module.scss";

import ShopItem from "../../components/ShopItem/ShopItem";

function MainPage() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Все");
  // const [cartItemsCount, setCartItemsCount] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [overallCartPrice, setOverallCartPrice] = useState(0);

  const getAllProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getElectronicsCategory = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const getJeweleryCategory = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/jewelery"
      );
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const getMenClothingCategory = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/men's%20clothing"
      );
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const getWomenClothingCategory = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/women's%20clothing"
      );
      const jsonData = await response.json();
      setProducts(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const addCartItem = async (title, image, price) => {
    const body = {
      title: `${title}`,
      image: `${image}`,
      price: Number(price),
    };
    try {
      const response = await fetch(`http://localhost:5000/cartItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteCartItem = async (title) => {
    const body = {
      title: `${title}`,
    };
    try {
      const response = await fetch(`http://localhost:5000/cartItems`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const onAddToCartPrice = (price, isAdded, title, image) => {
    if (isAdded) {
      setProductsCount(productsCount + 1);
      let newCartPrice = (overallCartPrice + price) * 100;
      setOverallCartPrice(Math.round(newCartPrice) / 100);
      addCartItem(title, image, price);
    } else {
      setProductsCount(productsCount - 1);
      let newCartPrice = (overallCartPrice - price) * 100;
      setOverallCartPrice(Math.round(newCartPrice) / 100);
      deleteCartItem(title);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const onClickCategoryBtn = (event) => {
    if (event.target.innerHTML === "Все") {
      getAllProducts();
      setCurrentCategory("Все");
    } else if (event.target.innerHTML === "Электроника") {
      getElectronicsCategory();
      setCurrentCategory("Электроника");
    } else if (event.target.innerHTML === "Украшения") {
      getJeweleryCategory();
      setCurrentCategory("Украшения");
    } else if (event.target.innerHTML === "Мужская одежда") {
      getMenClothingCategory();
      setCurrentCategory("Мужская одежда");
    } else if (event.target.innerHTML === "Женская одежда") {
      getWomenClothingCategory();
      setCurrentCategory("Женская одежда");
    }
  };

  return (
    <>
      <>
        <div className={styles.Header}>
          <div className={styles.main}>
            <img src="/img/shop-icon.png" alt="" />
            <div className={styles.description}>
              <h2>React Shop</h2>
              <span>Электроника, украшения, мужская и женская одежда!</span>
            </div>
          </div>
          <button className={styles.cartBtn}>
            <span>{overallCartPrice} $</span> <span>&#124;</span>
            <img src="/img/cart-icon.svg" alt="" /> {productsCount}
          </button>
        </div>
        <hr style={{ borderTop: "1px solid #F7F7F7" }} />
      </>
      <div className={styles.MainPage}>
        <div className={styles.categoryBtns}>
          <button
            className={`${styles.categoryBtn} ${styles.allProductsBtn} ${
              currentCategory === "Все" ? styles.currentCategory : null
            }`}
            onClick={onClickCategoryBtn}
          >
            Все
          </button>
          <button
            className={`${styles.categoryBtn} ${styles.electronicsBtn} ${
              currentCategory === "Электроника" ? styles.currentCategory : null
            }`}
            onClick={onClickCategoryBtn}
          >
            Электроника
          </button>
          <button
            className={`${styles.categoryBtn} ${styles.jeweleryBtn} ${
              currentCategory === "Украшения" ? styles.currentCategory : null
            }`}
            onClick={onClickCategoryBtn}
          >
            Украшения
          </button>
          <button
            className={`${styles.categoryBtn} ${styles.menClothingBtn} ${
              currentCategory === "Мужская одежда"
                ? styles.currentCategory
                : null
            }`}
            onClick={onClickCategoryBtn}
          >
            Мужская одежда
          </button>
          <button
            className={`${styles.categoryBtn} ${styles.womenClothingBtn} ${
              currentCategory === "Женская одежда"
                ? styles.currentCategory
                : null
            }`}
            onClick={onClickCategoryBtn}
          >
            Женская одежда
          </button>
        </div>
        <div className={styles.products}>
          {products.map((product) => (
            <ShopItem
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              onAddToCartPrice={onAddToCartPrice}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;
