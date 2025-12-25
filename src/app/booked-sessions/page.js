'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../common/SideBar'
import Header from '../common/Header'
import axios from 'axios'

export default function Page() {
    const [userData, setUserData] = useState([])
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const fetchallbookedSessions = () => {
        axios.get(`${apiBaseUrl}/enquiry/view-booked-session`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    setUserData(finalRes.allBookedSession)
                }
            })
    }


    useEffect(() => {
        fetchallbookedSessions()
    }, [])


    const removeFromEntries = (id) => {
        axios.post(`${apiBaseUrl}/enquiry/remove-from-booked-session/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes)
            })
    }

    return (
        <div className="grid grid-cols-[30%_auto] min-h-screen bg-white">
            <SideBar />

            <div className="">
                <Header />

                {/* Table Section */}
                <div className="m-6 bg-white border border-black overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="border-b border-black">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Exam</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {userData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-300 hover:bg-gray-100"
                                >
                                    <td className="p-4">{item.userName}</td>
                                    <td className="p-4">{item.userEmail}</td>
                                    <td className="p-4">{item.userPhone}</td>
                                    <td className="p-4">{item.examType}</td>
                                    <td className="p-4 ">
                                        <button onClick={() => removeFromEntries(item._id)} className="bg-black cursor-pointer text-white  px-3 py-[3px] rounded hover:bg-transparent border border-transparent hover:border-black duration-300 hover:text-black">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
