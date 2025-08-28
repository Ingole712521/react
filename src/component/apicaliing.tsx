import axios from "axios";
import { useEffect, useState } from "react";
import { getPost } from "../../api/api";
import Form from "./Form";

interface movie {
    userID: number;
    id: number;
    title: string;
    body: string;
}

export const ApiCalling = () => {
    const [data, setData] = useState<movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getMovieData = async () => {
        setLoading(true);

        try {
            const response = await getPost();
            setData(response.data);
            console.log(response.data);

            // console.log(data)
        } catch (error) {
            return <>{error}</>;
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getMovieData();
    }, []);

    return (
        <>
            <section className="gap-2">
                <Form data={data} setData={setData} />
            </section>
            {loading && <p className="tex-white text-9xl">loading ..</p>}

            {!loading && (
                <ul>
                    {data.map((e) => (
                        <li key={e.id} className="text-left">
                            <>{e.title}</>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
