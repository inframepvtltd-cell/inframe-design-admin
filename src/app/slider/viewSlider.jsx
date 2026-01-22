import axios from "axios";
import { useEffect, useState } from "react";
import FullScreenLoader from "../components/Loading";

export function ViewSlider({ apiBaseUrl, setActiveTab }) {
    const [sliderData, setSliderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchSliderData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${apiBaseUrl}/slider/view`);
            setSliderData(data.sliderData || []);
        } catch (err) {
            setError("Failed to load slider data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliderData();
    }, []);



    /* ❌ ERROR STATE */
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    return (

        <>
            {loading && <FullScreenLoader />}


            <div className="min-h-screen bg-white text-gray-950 py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">
                    Current slider
                </h1>

                {sliderData.length === 0 ? (
                    <p className="text-gray-600">No sliders found.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-10">
                        {sliderData.map((item) => (
                            <div
                                key={item._id}
                                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm capitalize"
                            >
                                <img
                                    loading="lazy"
                                    src={item.sliderImage}
                                    alt={item.sliderName}
                                    className="w-full h-[200px] object-cover object-top"
                                />

                                <div className="p-4">
                                    <h2 className="text-[18px] mb-2">
                                        <b>headings</b> – {item.sliderHeadlineFirst},{" "}
                                        {item.sliderHeadlineSecond}
                                    </h2>

                                    <p className="text-[18px] mb-4 capitalize">
                                        <b>description</b> – {item.sliderDescription}
                                    </p>

                                    <div className="grid grid-cols-3 gap-2 w-full">
                                        <button
                                            onClick={() => {
                                                window.location.hash = item._id;
                                                setActiveTab("add-slider");
                                            }}
                                            className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-blue-800 duration-300"
                                        >
                                            Edit
                                        </button>

                                        <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-green-800 duration-300">
                                            View
                                        </button>

                                        <button className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-red-800 duration-300">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>

    );
}
