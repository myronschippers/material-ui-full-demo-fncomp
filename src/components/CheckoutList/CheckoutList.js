import React from 'react';
import { useSelector } from 'react-redux';

function CheckoutList() {
  const checkoutReducer = useSelector((store) => store.checkoutReducer);

  return (
    <div>
      {checkoutReducer.map((item, index) => {
        return <p key={index}>{item.name}</p>;
      })}
    </div>
  );
}

export default CheckoutList;
