import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DeletePost } from '../../api/api';
import { useLoaderData } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

const Practice = () => {
    const [data, setData] = useState<Product[]>([]);
    const [formData, setFormData] = useState<Partial<Product>>({
        title: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<Product | null>(null);


    // const {productData} = useLoaderData();
    // console.log(produ)

    // Fetching data
    const getData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setData(response.data);
            console.log("Product data", response.data);
        } catch (error) {
            setError("Failed to fetch products");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError("Title and description are required");
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const productToCreate = {
                ...formData,
                price: formData.price || 0,
                category: formData.category || 'default',
                rating: formData.rating || { rate: 0, count: 0 }
            } as Product;

            const response = await createPost(productToCreate);
            console.log(response)
            setResponse(response);
            // getData(); 
            setFormData({
                title: '',
                description: '',
            });
        } catch (error) {
            setError("Failed to create product");
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    };

    const createPost = async (product: Product): Promise<Product> => {
        const response = await fetch(`https://fakestoreapi.com/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Failed to create a product");
        }

        return response.json();
    };


    const DeletePost = async (id: number): Promise<void> => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE",

        });

        if (!response.ok) {
            throw new Error("failed to delete this Product")

        }
        return

    }


    const handleDelete = async (id: number) => {
        setIsLoading(true);
        setError(null);

        try {
            await DeletePost(id);
            console.log(id);
            setResponse(null);
        } catch (error: any) {
            console.log(error)

            setError(error.message || "Failed to Delete te post")

        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div className="p-6 justify-content-center">
            <h1 className="text-2xl font-bold mb-6">Products Practice</h1>

            {isLoading && <p className="text-lg">Loading products...</p>}

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {data.map((product) => (
                    <Card key={product.id} className="shadow-md">
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        <p className="text-sm mt-2">{product.description.substring(0, 100)}...</p>
                        <div className="mt-2">
                            <span className="text-yellow-500">Rating: {product.rating.rate}</span>
                            <span className="ml-2 text-gray-500">({product.rating.count} reviews)</span>
                        </div>

                        <button disabled={isLoading}
                            className='text-white bg-red-500 border-2 rounded'
                            onClick={() => { handleDelete(product.id!) }}
                        >
                            delete
                        </button>
                    </Card>
                ))}
            </div>

            <div className="mt-8 p-6 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block mb-1">Title</label>
                        <input
                            type="text"
                            name="title" 
                            placeholder="Product title"
                            value={formData.title || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            placeholder="Product description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Product price"
                            value={formData.price || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isCreating}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {isCreating ? "Creating..." : "Create Product"}
                    </button>


                    <button disabled={isLoading}
                        className='text-white bg-red-500 border-2 rounded'
                        onClick={() => { handleDelete(response?.id!) }}
                    >
                        delete
                    </button>
                </form>

                {response && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
                        <h3 className="font-semibold text-green-800">Product Created Successfully!</h3>
                        <p className="mt-2">
                            <span className="font-medium">Title:</span> {response.title}
                        </p>
                        <p>
                            <span className="font-medium">Description:</span> {response.description}
                        </p>


                    </div>
                )}




            </div>
        </div>
    );
};

export default Practice;