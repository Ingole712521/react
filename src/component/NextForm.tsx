import React, { useEffect, useState } from 'react'
import { createPost, DeletePost, type Post } from '../../api/api';

const NextForm = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<Post | null>(null)
    const [formData, setFormData] = useState<Post>({ userId: 1, title: "", body: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.body) {
            setError("Title and body are required");
            return;
        }
        setError(null);
        setLoading(true)

        try {
            const response = await createPost(formData);
            setResponse(response);
            console.log(response)
            setFormData({
                userId: 1,
                title: "",
                body: "",
            });

        } catch (error: any) {
            setError(error.message || "Something went wrong please try again")

        } finally {
            setLoading(false)
        }
    }




    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await DeletePost(id);
            console.log(id)
            setResponse(null);
            alert(`Post delete succesfully ${id}`)

        } catch (error: any) {
            setError(error.message || "Post tp delete post");

        } finally {
            setLoading(false)
        }
    }


    return (
        <div>

            <h2>
                Created a POST
            </h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor=""> Title</label>
                <input type="text" name='title' className='text-orange-300' value={formData.title} onChange={handleChange} />
                <textarea name="body" placeholder='Enter body' value={formData.body} onChange={handleChange}></textarea>
                <button type='submit' disabled={loading}>

                    {loading ? "Submitting " : "Submit"}
                </button>


                {
                    response && (
                        <div >
                            <h3> POst Created succesfully</h3>
                        </div>
                    )
                }

                {
                    response && (
                        <div >
                            <h3></h3>
                            {/* <prev>{JSON.stringify(response, null, 2)}</prev> */}
                            <button disabled={loading} onClick={() => handleDelete(response.id!)}>
                                {loading ? "Deleting..." : "Delete Post"}

                            </button>
                            <h3> Delete suncessfully Created succesfully</h3>
                        </div>
                    )
                }


            </form>
        </div>
    )

}

export default NextForm