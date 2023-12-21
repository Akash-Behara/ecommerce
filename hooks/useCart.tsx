import { CartProduct } from "@/components/products/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProduct[] | null;
    cartTotalAmount: number;
    handleAddProductToCart: (product: CartProduct) => void
    handleRemoveProductFromCart: (product: CartProduct) => void
    handleQtyIncrease: (product: CartProduct) => void
    handleQtyDecrease: (product: CartProduct) => void
    handleClearCart: () => void
}

interface Props {
    [propName: string]: any
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProduct[] | null = JSON.parse(cartItems)
        setCartProducts(cProducts) 
    }, [])

    useEffect(() => {
        const getTotalAmount = () => {
            if(cartProducts){
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
                    
                    acc.total += itemTotal
                    acc.qty += item.quantity
                    
                    return acc
                }, {total: 0, qty: 0})

                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        }
        getTotalAmount()
    }, [cartProducts])

    const handleAddProductToCart = useCallback((product: CartProduct) => {
        setCartProducts((prev) => {
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success("Product Added to Cart")
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            
            return updatedCart
        })
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProduct) => {
        if(cartProducts){
            const filtererdProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filtererdProducts)
            toast.success("Product Removed to Cart")
            localStorage.setItem('eShopCartItems', JSON.stringify(filtererdProducts))
        }
    }, [cartProducts])

    const handleQtyIncrease = useCallback((product: CartProduct) => {
        let updatedCart;

        if(product.quantity === 99){
            return toast.error("Maximum Quantity reached")
        }

        if(cartProducts){
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }

    }, [cartProducts])

    const handleQtyDecrease = useCallback((product: CartProduct) => {
        let updatedCart;

        if(product.quantity === 1){
            return toast.error("Minumum Quantity reached")
        }

        if(cartProducts){
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }

    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eShopCartItems', JSON.stringify(null))
    }, [cartProducts])


    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleQtyIncrease,
        handleQtyDecrease,
        handleClearCart,
        cartTotalAmount
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null){
        throw new Error("useCart must be used within cartProvider")
    }

    return context
}