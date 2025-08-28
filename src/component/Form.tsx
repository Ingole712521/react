import React, { useState } from 'react'
import { PostData } from '../../api/api'



interface Post {
    title: string;
    body: string
}


interface FormProps {
    data: Post[];
    setData: React.Dispatch<React.SetStateAction<Post[]>>
}

const Form: React.FC<FormProps> = ({ data, setData }) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })


    const handlerEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value


        setAddData((prev) => {
            return {
                ...prev,
                [name]: value,

            }

        })


    }


    const AddPostData = async () => {
        const response = await PostData(addData);
        console.log("AddPostData", response)
        if ((response.status === 201)) {

            setData([...data, response.data])
            setAddData({ title: "", body: "" })
            alert("Data is send ")

        }
    }


    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        AddPostData()


    }




    return (
        <>
            <form onSubmit={handleFormSubmit}>

                <div>
                    <label htmlFor="title" className='mr-2'> Form field</label>

                    <input type="text" autoComplete='off' id='title' name='title' placeholder='Add Title' value={addData.title} onChange={handlerEvent} />
                </div>

                <div>
                    <label htmlFor="description" className='mr-2'> Description</label>

                    <input type="text" autoComplete='off' id='body' name='body' placeholder='body' value={addData.body} onChange={handlerEvent} />


                </div>
                <button type='submit' disabled={loading} className={`px-4 py-2 rounded text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                    }`}
                >
                    {loading ? "Submitting" : "Submit"}

                </button>


            </form>


        </>
    )
}

export default Form