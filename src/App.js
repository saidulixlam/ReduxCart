import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
let isInitial = true;
function App() {
  const showCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const cartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending..',
        message: 'Sending cart data..'
      }));
      try {
        const response = await fetch('https://api-calls-9eb55-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Success..',
          message: 'Request successful..'
        }));

        // Handle a successful response here if needed
      } catch (error) {
        // Handle the error
        console.error('Error updating cart:', error);
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Error..',
          message: 'Request failed'
        }));
      } finally {
        const timer = setTimeout(() => {
          dispatch(uiActions.clearNotification());
        }, 2000);

        return () => {
          clearTimeout(timer);
        };
      }
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    cartData();
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
