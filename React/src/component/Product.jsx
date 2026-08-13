import {useState, useEffect} from 'react'

function Products(){
    const [searchQuery, setSearchQuery] = useState("")
    const [productList, setProductList] =useState([])
    const [loading, setLoading] =useState(true)
    const [error, setError] = useState(false)

    const HandleSearchChange = (event) =>{
        setSearchQuery(event.target.value)
    }

    useEffect(() =>{
        {/*fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())            
            .then(data=>setList(data), setLoading(true))*/}
        const fetchData = async () => {
            try{
                const response = await fetch('https://fakestoreapi.com/products')
                if(!response.ok){
                    throw new Error('Failed to fetch product data')
                }
                const data = await response.json()
                setProductList(data)
                setLoading(false)
            }
            catch(error){
              console.log(error)
              setError(true)
              setLoading(false)
            }
        }
        fetchData()
    },[])

    const filteredProducts = productList.filter(product =>(
         product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ))

    const DisplayProducts = () =>{
        if(loading){
            return <p>Loading....</p>
        }

        if(error){
            return <p>Something went wrong, failed to fetch product data</p>
        }

        if(filteredProducts.length > 0){
            return(
                <div className ='products'> 
                    {filteredProducts.map(product =>(
                        <div className='product-card' key={product.id}>
                            <img src={product.image}></img>
                            <h4>{product.title}</h4>
                            <p>R{product.price}</p>
                        </div>

                    ))}
                </div>
            )
        }
        else{
            return <p>No product found</p>
        }
    }

    return(
        <>
        <h1>Product Catalog</h1>
        <input type='text' placeholder='Search products...' 
        value={searchQuery} onChange={HandleSearchChange}/>

        <DisplayProducts/>
        </>
    )
}

export default Products