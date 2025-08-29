import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

//  api : "'https://fakestoreapi.com/products'"

interface Products {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;

    }

}


const Pratice = () => {
    const [data, setData] = useState<Products[]>([])
    const [formData, setformData] = useState<Partial<Products>>({
        title: "",
        description: ""
    })
    const [creating, setCreating] = useState<boolean>(false)
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [response, setResponse] = useState<Products | null>(null)


    // fetching data 
    const getData = async () => {
        setisLoading(true);
        setError(null);
        try {
            const response = await axios.get("https://fakestoreapi.com/products")
            setData(response.data);
            console.log("Product data", response.data)

        } catch (error) {
            return { error }

        } finally {
            setisLoading(false)
        }

    }

    useEffect(() => {
        getData();
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setformData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))

    }


    const createPost = async (products: Products): Promise<Products> => {
        const response = await fetch(`https://fakestoreapi.com/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(products),
        })

        if (!response.ok) {
            throw new Error("Failed to Create a product");


        }

        return response.json();

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError("Title and description are required");
            return;
        }
        setCreating(true);
        setError(null);



        try {
            const productToCreate = {
                ...formData,
                price: formData.price || 0,
                description: formData.description,
                category: formData.category,
                rating: formData.rating || { rate: 0, count: 0 }

            } as Products

            const response = await createPost(productToCreate);
            console.log(response)
            setResponse(response);
            setisLoading(true)
            setformData({
                title: "",
                description: ""
            })

        } catch (error) {
            return <>{error}</>

        } finally {
            setisLoading(false);
            setCreating(false)
        }

    }

    const DeletePost = async (id: number): Promise<void> => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DElETE",

        });
        if (!res.ok) {
            throw new Error("Failed to Delete the product");

        }
        return

    }

    const handleDelete = async (id: number) => {
        setisLoading(true);
        try {
            await DeletePost(id);
            console.log(id);
            setResponse(null);
            alert(`This ${id} is deleted succesfully `)

        } catch (error: any) {
            setError(error.message || "Failed to delete")

        } finally {
            setisLoading(false)
        }
    }



    return (
        <div>

            {isLoading && <p className='text-9xl '>Loading.........</p>}
            {
                data.map((product) => (
                    <Card className='text-left bg-black' key={product.id}>
                        <h1 className='text-black' >{product.id}</h1>
                        <h2>{product.title}</h2>
                        <h2>{product.price}</h2>
                        <h2>{product.description}</h2>


                    </Card>
                ))

            }


            <div className='mt-7'>



                <div>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="title"> Movie Input box </label>
                        <input type="text" name='title' placeholder='text Movie input' value={formData.title || ""} onChange={handleChange} />


                        <label htmlFor="title"> Movie Input box </label>
                        <input type="text" name='description' placeholder='text descrption input' value={formData.description
                            || ""} onChange={handleChange} />

                        <button type='submit'>
                            {isLoading ? "Submitting" : "Submit"}

                        </button>

                        <button onClick={() => { handleDelete(response.id!) }}>
                            {
                                isLoading ? "Deleting.." : "Delete"
                            }

                        </button>
                        {
                            response && (
                                <div>
                                    <h3>
                                        MOVIE CREATED
                                    </h3>
                                    <p>{response.title}</p>
                                    <p>{response.description}</p>

                                </div>
                            )
                        }

                    </form>
                </div>


            </div>


        </div>
    )
}


export default Pratice




