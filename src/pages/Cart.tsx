import React from "react";
import Item from "../components/cart/Item";
import { connect } from "react-redux";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Helmet } from "react-helmet-async";

/*
  ====== need to clean this file up and make code more readable ======
*/

const Wrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  border: 1px solid black;
  border-radius: 10px 10px 10px 10px;
  align-items: center;
`;

const Totals = styled.div`
  max-width: 250px;
`;

const ItemWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px 10px 10px 10px;

  .itemInnerWrapper {
    display: flex;
    width: 70%;
    flex-direction: column;
  }

  @media (max-width: 610px) {
    display: flex;
    flex-wrap: wrap;

    .itemInnerWrapper {
      width: 100%;
      order: 2;
    }
  }
`;

const NutrientsWrapper = styled.div`
  width: 30%;
  min-width: 200px;
  margin-left: 10px;

  p {
    margin: 0;
    padding: 0;
  }

  .bad {
    color: red;
  }

  @media (max-width: 610px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px sold grey;
    order: 1;
  }
`;

const Cart: React.FC<WithProps> = (props) => {
  const { cart, limits, history } = props;

  if (cart === undefined) return null;
  if (limits === undefined) return null;

  let total = 0;
  let vitaminA = 0;
  let vitaminC = 0;
  let vitaminD = 0;
  let vitaminE = 0;
  let vitaminZinc = 0;
  let vitaminAisValid = true;
  let vitaminCisValid = true;
  let vitaminDisValid = true;
  let vitaminEisValid = true;
  let vitaminZincisValid = true;

  const mappedCart = cart
    .map((item: any, index: number) => {
      // remapping the products array to include nutrient values from config
      let el = {
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      };
      let nutrients: any[] = [];
      // eslint-disable-next-line
      item.product.nutrients.map((nutrient: any) => {
        // eslint-disable-next-line
        limits.tolerableUpperLimits.some((x: any) => {
          if (x.id === nutrient.id) {
            nutrients.push({
              readableName: nutrient.id.replace("-", " "),
              id: nutrient.id,
              amount: nutrient.amount,
              max: x.amount,
              unit: x.unit,
              asGrams: nutrient.amount,
              asGramsText: `${nutrient.amount}${
                x.unit === "mcg" ? "mcg" : "mg"
              }`,
              totalMg: nutrient.amount * item.quantity,
              isValid: nutrient.amount * item.quantity < x.amount,
            });
            switch (nutrient.id) {
              case "vitamin-a":
                vitaminA += nutrient.amount * item.quantity;
                vitaminAisValid = nutrient.amount * item.quantity < x.amount;
                break;
              case "vitamin-c":
                vitaminC += nutrient.amount * item.quantity;
                vitaminCisValid = nutrient.amount * item.quantity < x.amount;
                break;
              case "vitamin-d":
                vitaminD += nutrient.amount * item.quantity;
                vitaminDisValid = nutrient.amount * item.quantity < x.amount;
                break;
              case "vitamin-e":
                vitaminE += nutrient.amount * item.quantity;
                vitaminEisValid = nutrient.amount * item.quantity < x.amount;
                break;
              case "zinc":
                vitaminZinc += nutrient.amount * item.quantity;
                vitaminZincisValid = nutrient.amount * item.quantity < x.amount;
                break;
              default:
                break;
            }
          }
        });
      });

      return (el = {
        ...el,
        // @ts-ignore
        nutrients,
      });
    })
    .sort((a: any, b: any) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  mappedCart.map((item: any) => (total += item.price * item.quantity));

  return (
    <Wrapper>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <TopBar>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => history.goBack()}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <h2>Cart</h2>
        <Totals>
          {mappedCart.length > 0 ? (
            <h4>
              Total <strong>£{total.toFixed(2)}</strong>
            </h4>
          ) : (
            <h4>
              <strong>Cart is empty</strong>
            </h4>
          )}
        </Totals>
      </TopBar>
      {mappedCart.length > 0 && (
        <ItemWrapper>
          <div className="itemInnerWrapper">
            {mappedCart.length > 0 &&
              mappedCart.map((item: any, index: number) => {
                let canIincrement = "";

                item.nutrients.map((nutrient: any) =>
                  !nutrient.isValid
                    ? (canIincrement = "max reached")
                    : (canIincrement = "")
                );

                return (
                  <Item
                    item={item}
                    quantity={item.quantity}
                    key={`${index}-${item.name}`}
                    maxreached={canIincrement}
                  />
                );
              })}
          </div>
          <NutrientsWrapper>
            <p className={vitaminAisValid ? "good" : "bad"}>
              Vitamin A: {vitaminA}
            </p>
            <p className={vitaminCisValid ? "good" : "bad"}>
              Vitamin C: {vitaminC}
            </p>
            <p className={vitaminDisValid ? "good" : "bad"}>
              Vitamin D: {vitaminD}
            </p>
            <p className={vitaminEisValid ? "good" : "bad"}>
              Vitamin E: {vitaminE}
            </p>
            <p className={vitaminZincisValid ? "good" : "bad"}>
              Vitamin Zinc: {vitaminZinc}
            </p>
          </NutrientsWrapper>
        </ItemWrapper>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart.cart,
    totalNutrients: state.cart.nutrients,
    limits: state.product.config,
  };
};

export default connect(mapStateToProps)(Cart);

interface WithProps {
  props: any;
  cart: any;
  limits: any;
  history: any;
}
