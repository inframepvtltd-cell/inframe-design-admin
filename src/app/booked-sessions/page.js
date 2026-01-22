'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../common/SideBar'
import Header from '../common/Header'
import axios from 'axios'
import Swal from 'sweetalert2'
import FullScreenLoader from '../components/Loading'

export default function Page() {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true)      // 🔹 loading state
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    const fetchallbookedSessions = async () => {
        try {
            setLoading(true)   // 🔹 start loader
            const res = await axios.get(`${apiBaseUrl}/enquiry/view-booked-session`)
            const finalRes = res.data
            if (finalRes.status == 1) {
                setUserData(finalRes.allBookedSession)
            } else {
                setUserData([])   // ❌ no data
            }
        } catch (error) {
            console.error("Error fetching sessions:", error)
            setUserData([])       // ❌ API failed → no data
        } finally {
            setLoading(false)      // 🔹 stop loader
        }
    }

    useEffect(() => {
        fetchallbookedSessions()
    }, [])  // 🔹 empty dependency → fetch only once



    const removeFromEntries = async (id) => {
        try {
            // 1️⃣ Confirmation popup
            const confirmResult = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to recover this session after deletion!",
                icon: 'warning',
                background: 'white',
                iconColor: 'black',
                showCancelButton: true,
                confirmButtonColor: 'black',
                cancelButtonColor: 'gray',
                confirmButtonText: 'Yes, remove it',
            })

            // 2️⃣ If cancelled → stop
            if (!confirmResult.isConfirmed) return

            // 3️⃣ API call
            const res = await axios.post(
                `${apiBaseUrl}/enquiry/remove-from-booked-session/${id}`
            )

            const finalRes = res.data

            // 4️⃣ Check response
            if (finalRes.status === 1) {
                await Swal.fire({
                    title: 'Session removed successfully',
                    icon: 'success',
                    iconColor: 'black',
                    color: 'black',
                    confirmButtonColor: 'black',
                })

                // 5️⃣ Reload data
                fetchallbookedSessions()
            } else {
                Swal.fire({
                    title: 'Something went wrong',
                    text: 'Try again later',
                    icon: 'error',
                    iconColor: 'black',
                    color: 'black',
                })
            }

        } catch (err) {
            console.error(err)
            Swal.fire({
                title: 'Server Error',
                text: 'Please try again later',
                icon: 'error',
                iconColor: 'black',
                color: 'black',
            })
        }
    }




    return (
        <div className="grid grid-cols-[30%_auto] min-h-screen bg-white">
            {loading && <FullScreenLoader />}  {/* 🔹 show loader */}

            <SideBar />
            <div className="">
                <Header />

                <main className="h-[90vh] p-6 overflow-y-scroll w-full px-10 py-3">

                    {/* Table Section */}
                    <h2 className="text-[40px] font-bold mb-6 capitalize">View All Booked Sessions</h2>

                    <div className="bg-white border border-gray-300 overflow-hidden">

                        <table className="w-full text-left ">
                            <thead className='border-b border-gray-300'>
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Exam</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading && userData.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 text-gray-500">
                                            No sessions found
                                        </td>
                                    </tr>
                                )}

                                {!loading && userData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-gray-300 hover:bg-gray-100"
                                    >
                                        <td className="p-4">{item.userName}</td>
                                        <td className="p-4">{item.userEmail}</td>
                                        <td className="p-4">{item.userPhone}</td>
                                        <td className="p-4">{item.examType}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => removeFromEntries(item._id)}
                                                className="bg-black cursor-pointer text-white px-3 py-[3px] rounded hover:bg-transparent border border-transparent hover:border-black duration-300 hover:text-black"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>



            </div>
        </div>
    )
}
