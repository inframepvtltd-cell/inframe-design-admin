"use client";
import { useState } from "react";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import AddStudyMaterial from "./AddStudyMaterial";
import ViewStudyMaterial from "./ViewStudyMaterial";

export default function StudyMaterial() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [activeTab, setActiveTab] = useState("add-study-material");
  return (
    <div className="min-h-screen grid grid-cols-[30%_auto] ">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <section className="w-full h-screen overflow-y-scroll">
        <Header />
        <main className="p-10">
          <header className="mb-4 ">
            <h1 className="text-[40px] font-bold text-black capitalize">
              Add & view free resources
            </h1>
          </header>
          <div className="grid grid-cols-4 gap-3 my-4">
            <button
              onClick={() => setActiveTab("add-study-material")}
              className={`${
                activeTab === "add-study-material"
                  ? "bg-black text-white border-transparent"
                  : ""
              } cursor-pointer hover:bg-black capitalize hover:text-white px-3 py-2 duration-300 border-2 border-black hover:border-transparent`}
            >
              Add free resources
            </button>
            <button
              onClick={() => setActiveTab("view-study-material")}
              className={`${
                activeTab === "view-study-material"
                  ? "bg-black text-white border-transparent"
                  : ""
              } cursor-pointer hover:bg-black capitalize hover:text-white px-3 py-2 duration-300 border-2 border-black hover:border-transparent`}
            >
              View free resources
            </button>
          </div>
          {activeTab === "add-study-material" && (
            <AddStudyMaterial apiBaseUrl={apiBaseUrl} />
          )}
          {activeTab === "view-study-material" && (
            <ViewStudyMaterial
              setActiveTab={setActiveTab}
              apiBaseUrl={apiBaseUrl}
            />
          )}
        </main>
      </section>
    </div>
  );
}
