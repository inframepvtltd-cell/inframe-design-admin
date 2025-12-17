"use client";
import { useEffect, useState } from "react";
import SideBar from "../common/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../common/Header";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ViewOnlineCourse } from "./ViewOnlineCourse";
import { OnlineCourse } from "./OnlineCourse";
import { OfflineCourse } from "./OfflineCourse";
import { ViewOfflineCourse } from "./ViewOfflineCourse";

export default function NewCourse() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const router = useRouter();

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //         // Modern browsers ignore custom messages
    //         e.preventDefault();
    //         e.returnValue = ''; // This triggers the confirmation dialog
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);



    const [activeTab, setActiveTab] = useState("online-course");

    return (
        <div className=" grid grid-cols-[30%_auto] ">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}


            <div>

                <Header />

                <main className="w-full px-10 py-3 h-[90vh] overflow-y-scroll ">

                    <header className="mb-4 ">
                        <h1 className="text-[40px] font-bold text-gray-800 capitalize">
                            Add & view course
                        </h1>

                    </header>
                    <div>
                        <p className="text-[18px] flex items-center gap-[5px]">
                            - Select field
                        </p>
                        <div className="grid grid-cols-4 gap-3 my-4">
                            <button
                                onClick={() => setActiveTab("online-course")}
                                className={`${activeTab === "online-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2  duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                Online Course
                            </button>
                            <button
                                onClick={() => setActiveTab("view-online-course")}
                                className={`${activeTab === "view-online-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2  duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                view online Course
                            </button>
                            <button
                                onClick={() => setActiveTab("offline-course")}
                                className={`${activeTab === "offline-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2  duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                Offline Course
                            </button>

                            <button
                                onClick={() => setActiveTab("view-offline-course")}
                                className={`${activeTab === "view-offline-course"
                                    ? "bg-gray-950 text-white border-transparent"
                                    : ""
                                    } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2  duration-300 border-2 border-gray-950 hover:border-transparent`}
                            >
                                view  Offline Course
                            </button>
                        </div>
                    </div>
                    {activeTab === 'online-course' &&
                        <OnlineCourse apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'offline-course' &&
                        <OfflineCourse apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'view-online-course' &&

                        <ViewOnlineCourse setActiveTab={setActiveTab} apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'view-offline-course' &&

                        <ViewOfflineCourse setActiveTab={setActiveTab} apiBaseUrl={apiBaseUrl} />
                    }
                </main>

            </div>

        </div>
    );
}















