import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const sendCardData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending..',
            message: 'Sending cart data..'
        })
        );
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
}



export const fetchCartData = () => {
  return async (dispatch) => {
    // Show a pending notification
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching..',
        message: 'Fetching cart data..',
      })
    );

    try {
      const response = await fetch(
        'https://api-calls-9eb55-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Show a success notification
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success..',
          message: 'Fetching data successful..',
        })
      );

      const cartData = await response.json();

      // Dispatch an action to update your cart state
      dispatch(cartActions.fetchCart(cartData));
    } catch (error) {
      console.error('Error fetching cart data:', error);

      // Show an error notification
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error..',
          message: 'Request failed',
        })
      );
    } finally {
      // Clear the notification after 2 seconds
      const timer = setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 2000);

      // Ensure the timer is cleared when the component unmounts
      return () => {
        clearTimeout(timer);
      };
    }
  };
};
