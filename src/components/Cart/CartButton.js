import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQ = useSelector((state) => state.cart.totalQuantity);

  function buttonHandler() {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={buttonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQ}</span>
    </button>
  );
};

export default CartButton;
