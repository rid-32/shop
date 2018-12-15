export const getProducts = (req, res) => {
    const products = {
        bananas: 47,
        tomatos: 118,
    }

    res.status(200).json(products)
}
