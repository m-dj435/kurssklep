import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem {
  readonly id: number;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly totalAmount: number;
  // tu dajemy metody np dodaj do koszyka
  readonly addItemToCart: (item: CartItem) => void;
  //wyczysc koszyk
  readonly removeItemToCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("ZAISTE_SHOPIPI");
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};
const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("ZAISTE_SHOPIPI", JSON.stringify(cartItems));
};

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []); //TYLKO RAZ NA POCZATKU MA SIE WYKONAC

  useEffect(() => {
    setCartItemsInStorage(cartItems);
  }, [cartItems]); //gdy zmienii sie cartItems

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        totalAmount: cartItems.reduce((prev, current) => {
          return prev + current.count;
        }, 0),

        addItemToCart: (item) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }
            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemToCart: (id) => {
          setCartItems((prevState) => {
            const eItem = prevState.find((eItem) => eItem.id === id);
            if (eItem && eItem.count <= 1) {
              return prevState.filter((eItem) => eItem.id !== id);
            }
            return prevState.map((eItem) => {
              if (eItem.id === id) {
                return {
                  ...eItem,
                  count: eItem.count - 1,
                };
              }
              return eItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error(`You forgot CartStateContextProvider!`);
  }
  return cartState;
};
