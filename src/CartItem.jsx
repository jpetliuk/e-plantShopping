import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
   const cart = useSelector((state) => state.cart.items);
   const dispatch = useDispatch();

   // Calculate total amount for all products in the cart
   const calculateTotalAmount = () => {
      return cart
         .reduce((total, item) => {
            // Convert cost string to number and multiply by quantity
            const itemPrice = parseFloat(item.cost.substring(1));
            return total + itemPrice * item.quantity;
         }, 0)
         .toFixed(2);
   };

   // Handle continue shopping
   const handleContinueShopping = (e) => {
      onContinueShopping(e);
   };

   // Handle checkout (placeholder for future implementation)
   const handleCheckoutShopping = (e) => {
      alert("Functionality to be added for future reference");
   };

   const handleIncrement = (item) => {
      dispatch(
         updateQuantity({
            name: item.name,
            quantity: item.quantity + 1,
         })
      );
   };

   const handleDecrement = (item) => {
      if (item.quantity > 1) {
         dispatch(
            updateQuantity({
               name: item.name,
               quantity: item.quantity - 1,
            })
         );
      } else {
         dispatch(removeItem(item.name));
      }
   };

   const handleRemove = (item) => {
      dispatch(removeItem(item.name));
   };

   // Calculate total cost for a specific item
   const calculateTotalCost = (item) => {
      // Convert cost string to number and multiply by quantity
      const itemPrice = parseFloat(item.cost.substring(1));
      return (itemPrice * item.quantity).toFixed(2);
   };

   return (
      <div className="cart-container">
         <h2 style={{ color: "black" }}>
            Total Cart Amount: ${calculateTotalAmount()}
         </h2>

         {cart.length === 0 ? (
            <div className="empty-cart">
               <p>Your cart is empty</p>
            </div>
         ) : (
            <div>
               {cart.map((item) => (
                  <div className="cart-item" key={item.name}>
                     <img
                        className="cart-item-image"
                        src={item.image}
                        alt={item.name}
                     />
                     <div className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-cost">{item.cost}</div>

                        <div className="cart-item-quantity">
                           <button
                              className="cart-item-button cart-item-button-dec"
                              onClick={() => handleDecrement(item)}
                           >
                              -
                           </button>
                           <span className="cart-item-quantity-value">
                              {item.quantity}
                           </span>
                           <button
                              className="cart-item-button cart-item-button-inc"
                              onClick={() => handleIncrement(item)}
                           >
                              +
                           </button>
                        </div>

                        <div className="cart-item-total">
                           Total: ${calculateTotalCost(item)}
                        </div>

                        <button
                           className="cart-item-delete"
                           onClick={() => handleRemove(item)}
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}

         <div
            style={{ marginTop: "20px", color: "black" }}
            className="total_cart_amount"
         >
            {cart.length > 0 &&
               `Total Items: ${cart.reduce(
                  (total, item) => total + item.quantity,
                  0
               )}`}
         </div>

         <div className="continue_shopping_btn">
            <button
               className="get-started-button"
               onClick={(e) => handleContinueShopping(e)}
            >
               Continue Shopping
            </button>
            <br />
            <button
               className="get-started-button1"
               onClick={handleCheckoutShopping}
            >
               Checkout
            </button>
         </div>
      </div>
   );
};

export default CartItem;
