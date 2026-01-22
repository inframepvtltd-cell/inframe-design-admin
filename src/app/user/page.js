'use client'
import { useEffect, useState } from "react";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import axios from "axios";
import FullScreenLoader from "../components/Loading";

export default function User() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);


    const fetchAllUsers = async () => {
        axios.get(`${apiBaseUrl}/web-user`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    setUsers(finalRes.data)
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])


    return (
        <div className="grid grid-cols-[30%_auto] ">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}

            <div>
                <Header />

                <main className="flex-1 px-10 py-3 h-[90vh] overflow-y-scroll ">
                    {/* Header */}
                    <header className="mb-8 ">
                        <h1 className="text-[40px] font-bold text-gray-800">View User</h1>
                    </header>

                    {/* User Table */}
                    <div className="bg-white shadow overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-black">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                                    >
                                        Sr. No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                                    >
                                        Username
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                                    >
                                        User Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                                    >
                                        Phone number
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* 🔄 Loading */}
                                {loading && (
                                    <>

                                        <FullScreenLoader />
                                    </>
                                )}

                                {/* ❌ No Users Found */}
                                {!loading && users.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-red-500">
                                            User not found
                                        </td>
                                    </tr>
                                )}

                                {/* ✅ Users Data */}
                                {!loading &&
                                    users.length > 0 &&
                                    users.map((user, index) => (
                                        <tr
                                            key={index}
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                                                {user.userName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                                {user.userphone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                                {user.userEmail}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

        </div>
    );
}
