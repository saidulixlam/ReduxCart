import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
// import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCardData } from './store/cart-actions';
let isInitial = true;
function App() {
  const showCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    
    if(cart.changed){
      dispatch(sendCardData(cart))
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        message={notification.message}
        title={notification.title}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
