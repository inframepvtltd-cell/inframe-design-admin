"use client"
import { useEffect, useState } from "react";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { ViewSlider } from "./viewSlider";
import { AddSlider } from "./addSlider";

export default function Slider() {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


    const [activeTab, setActiveTab] = useState("add-slider");


    return (
        <div className="min-h-screen grid grid-cols-[30%_auto] ">
            {/* Sidebar */}
            <SideBar />
            <div>
                <Header />
                <main className="w-full px-10 py-3  h-[90vh] overflow-y-scroll scrollbar" >
                    <header className="mb-4 ">
                        <h1 className="text-[40px] font-bold text-gray-800 capitalize">
                            Add & view slider
                        </h1>
                    </header>

                    <div className="grid grid-cols-4 gap-3 my-4">
                        <button
                            onClick={() => setActiveTab("add-slider")}
                            className={`${activeTab === "add-slider"
                                ? "bg-gray-950 text-white border-transparent"
                                : ""
                                } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                        >
                            Add Slider
                        </button>
                        <button
                            onClick={() => setActiveTab("view-slider")}
                            className={`${activeTab === "view-slider"
                                ? "bg-gray-950 text-white border-transparent"
                                : ""
                                } cursor-pointer hover:bg-gray-950 capitalize hover:text-white px-3 py-2 rounded duration-300 border-2 border-gray-950 hover:border-transparent`}
                        >
                            View Slider
                        </button>
                    </div>
                    {activeTab === 'add-slider' &&
                        <AddSlider apiBaseUrl={apiBaseUrl} />
                    }
                    {activeTab === 'view-slider' &&
                        <ViewSlider setActiveTab={setActiveTab} apiBaseUrl={apiBaseUrl} />
                    }
                </main>
            </div>


        </div>
    );
}




