import React, { useState } from "react";

import styles from "./ShopItem.module.scss";

function ShopItem({ image, title, price, onAddToCartPrice }) {
  const [isAdded, setIsAdded] = useState(false);
  const onToggleAdd = () => {
    setIsAdded(!isAdded);
    onAddToCartPrice(price, !isAdded, title, image);
  };

  return (
    <div className={styles.ShopItem}>
      <img className={styles.itemImg} src={image} alt="Bag" />
      <span className={styles.itemTitle}>{title}</span>
      <div className={styles.price}>
        <span>{price} $</span>
        <button
          style={
            isAdded
              ? { color: "#fff", background: "#eb5a1e" }
              : { color: "#eb5a1e", background: "#fff" }
          }
          onClick={onToggleAdd}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default ShopItem;
