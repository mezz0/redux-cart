import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateCartQuantity,
  removeFromCart,
} from "../../store/actions/cartActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Wrapper = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  display: flex;
  flex-wrap: wrap;

  h4 {
    display: inline-block;
    margin: 0 0 5px 0;
  }

  .vitamin {
    text-transform: capitalize;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-left: 10px;

  .disable {
    pointer-events: none;
    opacity: 0.2;
  }
`;

const Breakdown = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ItemInfo = styled.div`
  margin-top: 20px;
  min-width: 300px;
`;

const Item: React.FC<WithProps> = (props) => {
  const { quantity, item, maxreached } = props; // state
  const { updateCartQuantity, removeFromCart } = props; // function

  let itemQty = quantity;

  const handleChange = (e: any, item: any) => {
    if (+e.target.value <= 0) {
      alert("Value must be more than 1");
      return;
    }

    if (itemQty !== +e.target.value) {
      itemQty = +e.target.value;
    }
    updateCartQuantity(item.name, itemQty);
  };

  const removeOne = () => {
    updateCartQuantity(item.name, --itemQty);
  };

  const handleRemove = (e: any) => {
    removeFromCart(item.name);
  };

  return (
    <Wrapper>
      <ItemInfo>
        <h4>
          <strong>{item.name}</strong>
        </h4>
        <Breakdown>
          Included: &nbsp;
          {item.nutrients.map((nutrient: any) => {
            return (
              <span className="vitamin" key={nutrient.readableName}>
                {nutrient.readableName} &nbsp;
              </span>
            );
          })}
        </Breakdown>
      </ItemInfo>
      <FormWrapper>
        <h6>
          <strong>
            {`${maxreached && `(${maxreached})`} £${item.price.toFixed(2)}`}{" "}
            <span className="text-muted">x</span>
          </strong>
        </h6>
        <Form>
          {!maxreached ? (
            <input
              type="number"
              className={maxreached ? "disable" : ""}
              onChange={(e: any) => handleChange(e, item)}
              value={itemQty}
            />
          ) : (
            <button onClick={() => removeOne()}>remove one</button>
          )}
          <IconButton
            color="secondary"
            aria-label="remove from shopping cart"
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCartQuantity: (productId: any, quantity: any) =>
      dispatch(updateCartQuantity(productId, quantity)),
    removeFromCart: (productId: any) => dispatch(removeFromCart(productId)),
  };
};

export default connect(null, mapDispatchToProps)(Item);

interface WithProps {
  quantity: any;
  item: any;
  updateCartQuantity: (id: string, qty: any) => void;
  removeFromCart: (id: any) => void;
  maxreached: string;
}
