"use client"
import { useEffect, useState } from "react";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import Addfreeresources from "./Addfreeresources";
import Viewfreeresources from "./Viewfreeresources";

export default function freeresources() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


    const [activeTab, setActiveTab] = useState("add-free-resources");


    return (
        <div className="min-h-screen grid grid-cols-[30%_auto] ">
            {/* Sidebar */}
            <SideBar />
            <div>
                <Header />
                <main className="w-full px-10 py-3  h-[90vh] overflow-y-scroll scrollbar" >
                    <header className="mb-4 ">
                        <h1 className="text-[40px] font-bold text-black capitalize">
                            Add & view free resources
                        </h1>
                    </header>

                    <div className="grid grid-cols-4 gap-3 my-4">
                        <button
                            onClick={() => setActiveTab("add-free-resources")}
                            className={`${activeTab === "add-free-resources"
                                ? "bg-black text-white border-transparent"
                                : ""
                                } cursor-pointer hover:bg-black capitalize hover:text-white px-3 py-2 duration-300 border-2 border-black hover:border-transparent`}
                        >
                            Add free resources
                        </button>
                        <button
                            onClick={() => setActiveTab("view-free-resources")}
                            className={`${activeTab === "view-free-resources"
                                ? "bg-black text-white border-transparent"
                                : ""
                                } cursor-pointer hover:bg-black capitalize hover:text-white px-3 py-2 duration-300 border-2 border-black hover:border-transparent`}
                        >
                            View free resources
                        </button>
                    </div>
                    {activeTab === 'add-free-resources' &&
                        <Addfreeresources apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'view-free-resources' &&
                        <Viewfreeresources setActiveTab={setActiveTab} apiBaseUrl={apiBaseUrl} />
                    }
                </main>
            </div>


        </div>
    );
}




