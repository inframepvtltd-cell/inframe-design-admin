"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export function ViewOnlineCourse({ apiBaseUrl, setActiveTab }) {
    const [onlineCourseData, setOnlineCourseData] = useState([])
    const [staticPath, setStaticPath] = useState('')


    const [editId, setEditId] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const idFromHash = window.location.hash.replace('#', '');
            setEditId(idFromHash);
        }
    }, []);


    const fetchOnlineCourseData = () => {
        axios.get(`${apiBaseUrl}/course/view-online`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    setOnlineCourseData(finalRes.onlineCourseData)
                    setStaticPath(finalRes.staticPath)

                }
            })
    }

    useEffect(() => {
        fetchOnlineCourseData()
    }, [])

    return (
        <>
            <div className="min-h-screen bg-white text-gray-950 py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">Available online Courses</h1>

                <div className="grid grid-cols-2 gap-10">
                    {onlineCourseData.map(course => (

                        <div key={course._id} className="border border-gray-300 -lg overflow-hidden shadow-sm capitalize">
                            <img src={course.courseImage} alt={course.courseName} className="w-full h-[400px] object-cover object-top" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                                <p className="text-sm text-gray-700 mb-4">{course.cousreHeadline}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">{course.coursePrice}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 w-full ">
                                    <button onClick={() => {
                                        window.location.hash = course._id;
                                        setActiveTab('online-course');
                                    }}
                                        className="bg-gray-950 cursor-pointer text-white px-4 py-2  hover:bg-blue-800 duration-300">Edit</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2  hover:bg-green-800 duration-300">View</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2  hover:bg-red-800 duration-300">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}