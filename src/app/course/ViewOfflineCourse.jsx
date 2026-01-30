"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import FullScreenLoader from "../components/Loading"; // your existing loader

export function ViewOfflineCourse({ apiBaseUrl, setActiveTab }) {

    const [editId, setEditId] = useState('');
    const [offlineCourseData, setOfflineCourseData] = useState([]);
    const [loadingCourse, setLoadingCourse] = useState(false); // ✅ loader state

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const idFromHash = window.location.hash.replace('#', '');
            setEditId(idFromHash);
        }
    }, []);

    const fetchOfflineCourseData = async () => {
        try {
            setLoadingCourse(true); // ✅ start loader

            const res = await axios.get(`${apiBaseUrl}/course/view-offline`);
            const finalRes = res.data;

            if (finalRes.status === 1) {
                setOfflineCourseData(finalRes.offlineCourseData);
            }
        } catch (err) {
            console.error("Error fetching offline courses:", err);
        } finally {
            setLoadingCourse(false); // ✅ stop loader
        }
    }

    useEffect(() => {
        fetchOfflineCourseData();
    }, [])

    return (
        <>
            {/* ✅ Fullscreen loader */}
            {loadingCourse && <FullScreenLoader />}

            <div className="min-h-screen bg-white text-black py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">Available Offline Courses</h1>

                <div className="grid grid-cols-3 gap-10">
                    {offlineCourseData.map(course => (
                        <div key={course._id} className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm capitalize">
                            <img 
                                loading="lazy" 
                                src={course.courseImage} 
                                alt={course.courseName} 
                                className="w-full h-[300px] object-cover object-top" 
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                                <p className="text-sm text-gray-700 mb-4">{course.cousreHeadline}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">{course.coursePrice}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    <button 
                                        onClick={() => {
                                            window.location.hash = course._id;
                                            setActiveTab('offline-course');
                                        }}
                                        className="bg-black cursor-pointer rounded-full  text-white px-4 py-2 hover:bg-blue-800 duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button className="bg-black cursor-pointer rounded-full  text-white px-4 py-2 hover:bg-green-800 duration-300">View</button>
                                    <button className="bg-black cursor-pointer rounded-full  text-white px-4 py-2 hover:bg-red-800 duration-300">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
