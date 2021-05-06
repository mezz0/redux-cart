import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";

const Wrapper = styled.div`
  width: calc(100% / 2);

  p {
    margin: 0;
    padding: 0;
  }

  figure {
    display: flex;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;
    border-radius: 10px 10px 10px 10px;
    overflow: hidden;
  }

  @media (max-width: 890px) {
    width: 100%;

    img {
      height: auto;
      width: 20%;
    }
  }
  @media (max-width: 610px) {
    figure {
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;

      img {
        height: auto;
        width: 100%;
        object-fit: cover;
        max-height: 100px;
      }
    }
  }
`;

const StyledButton = styled.div`
  cursor: pointer;
`;

const Details = styled.figcaption`
  width: 100%;
`;

const Product: React.FC<WithProps> = (props) => {
  const { addToCart, removeFromCart } = props; // functions
  const { inCart, product } = props; // state

  const [prodInCart, setProdInCart] = useState(inCart);

  const addItem = (e: any) => {
    e.preventDefault();
    addToCart(product);
    setProdInCart(true);
  };
  const removeItem = (e: any) => {
    e.preventDefault();
    removeFromCart(product);
    setProdInCart(false);
  };

  return (
    <Wrapper>
      <figure>
        <img src={"https://picsum.photos/200/300"} alt={product.name} />
        <Details>
          <h4>{product.name}</h4>
          <div>
            <span>{`£${product.price.toFixed(2)}`}</span>
          </div>
          <div>
            {prodInCart ? (
              <StyledButton onClick={removeItem}>
                Remove
                <IconButton
                  color="secondary"
                  aria-label="remove from shopping cart"
                >
                  <DeleteIcon />
                </IconButton>
              </StyledButton>
            ) : (
              <StyledButton onClick={addItem}>
                Add to cart
                <IconButton color="primary" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </StyledButton>
            )}
            <br />
            <div>
              <br />
              <p>Contains:</p>
              {product.nutrients.map((nutrient: any, index: number) => {
                return (
                  <p key={`${index}-${nutrient.id}`}>{`${nutrient.id.replace(
                    "-",
                    " "
                  )}: ${nutrient.amount}`}</p>
                );
              })}
            </div>
          </div>
        </Details>
      </figure>
    </Wrapper>
  );
};

export default Product;

interface WithProps {
  addToCart: (val: any) => void;
  removeFromCart: (val: any) => void;
  inCart: any;
  product: any;
}
