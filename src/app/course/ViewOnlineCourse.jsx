"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import FullScreenLoader from "../components/Loading";

export function ViewOnlineCourse({ apiBaseUrl, setActiveTab }) {
    const [onlineCourseData, setOnlineCourseData] = useState([]);
    const [loadingCourse, setLoadingCourse] = useState(false);

    const [editId, setEditId] = useState('');

    // Get id from URL hash
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const idFromHash = window.location.hash.replace('#', '');
            setEditId(idFromHash);
        }
    }, []);

    const fetchOnlineCourseData = async () => {
        try {
            setLoadingCourse(true); // ✅ start loading

            const res = await axios.get(`${apiBaseUrl}/course/view-online`);
            const finalRes = res.data;

            if (finalRes.status === 1) {
                setOnlineCourseData(finalRes.onlineCourseData);
            }

        } catch (err) {
            console.error("Error fetching online courses:", err);
        } finally {
            setLoadingCourse(false); // ✅ stop loading
        }
    }

    // Fetch data on mount
    useEffect(() => {
        fetchOnlineCourseData();
    }, []);

    // ✅ Render
    return (
        <>
            {loadingCourse && <FullScreenLoader />} {/* ← Loader inside JSX */}

            <div className="min-h-screen bg-white text-gray-950 py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">Available Online Courses</h1>

                <div className="grid grid-cols-3 gap-10">
                    {onlineCourseData.map(course => (
                        <div key={course._id} className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm capitalize">
                            <img
                                loading="lazy"
                                src={course.courseImage}
                                alt={course.courseName}
                                className="w-full h-[220px] object-cover object-top"
                            />
                            <div className="p-5">
                                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                                <p className="text-sm text-gray-700 mb-4">{course.cousreHeadline}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">Rs. {course.coursePrice}/-</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <button
                                        onClick={() => {
                                            window.location.hash = course._id;
                                            setActiveTab('online-course');
                                        }}
                                        className="bg-black rounded-full cursor-pointer text-white px-4 py-2 hover:bg-blue-800 duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button className="bg-black rounded-full cursor-pointer text-white px-4 py-2 hover:bg-green-800 duration-300">View</button>
                                    <button className="bg-black rounded-full cursor-pointer text-white px-4 py-2 hover:bg-red-800 duration-300">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
