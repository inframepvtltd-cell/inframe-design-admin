import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import FullScreenLoader from "../components/Loading";

export function Viewtestimonial({ apiBaseUrl, setActiveTab }) {
    const [testimonialData, setTestimonialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTestimonialData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${apiBaseUrl}/testimonial/view`);
            setTestimonialData(data.data || []);
        } catch (err) {
            setError("Failed to load testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonialData();
    }, []);

    /* 🔄 LOADING */
    if (loading) {
        return <FullScreenLoader />;
    }

    /* ❌ ERROR */
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-950 py-5">
            <h1 className="text-3xl font-bold mb-8 capitalize">
                Current testimonial
            </h1>

            {/* 📭 NO DATA */}
            {testimonialData.length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-gray-500 text-lg">
                    No testimonials found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonialData.map((item) => (
                        <div
                            key={item._id}
                            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm capitalize"
                        >
                            <div className="p-4">
                                <iframe
                                    className="w-full min-h-[300px] rounded"
                                    src={item.localVideoLink || item.videoLiveLink}
                                />

                                <h2 className="text-[18px] mt-3">
                                    <b>Visit</b>
                                </h2>

                                <Link
                                    target="_blank"
                                    href={item.localVideoLink || item.videoLiveLink}
                                >
                                    <p className="text-gray-400 mb-2 line-clamp-1 hover:text-blue-600 duration-100">
                                        {item.localVideoLink || item.videoLiveLink}
                                    </p>
                                </Link>

                                <h2 className="text-[18px] mb-2">
                                    <b>Student Name</b> – {item.studentName}
                                </h2>

                                <p className="text-[18px] mb-4 capitalize">
                                    <b>Description</b> – {item.studentDescription}
                                </p>

                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <button
                                        onClick={() => {
                                            window.location.hash = item._id;
                                            setActiveTab("add-testimonial");
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
    );
}
