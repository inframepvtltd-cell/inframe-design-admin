import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ViewStudyMaterial({ setActiveTab }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [studyMaterialData, setStudyMaterialData] = useState([]);

  const fetchallStudyMaterials = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/study-materials/view-all`);
      if (res.data.status == 1) setStudyMaterialData(res.data.result);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(studyMaterialData);

  useEffect(() => {
    fetchallStudyMaterials();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl capitalize mb-3">Study materials</h1>
      <div className="grid grid-cols-3 gap-5 ">
        {studyMaterialData.map((item, index) => {
          return (
            <div className="border border-gray-300 rounded-lg">
              <img
                className="w-full h-[200px] object-cover object-center rounded-t-lg"
                src={item?.materialPreviewImage?.url}
                alt=""
              />
              <div className="p-5">
                <h2 className="text-xl font-bold capitalize">
                  {item?.materialTitle}
                </h2>
                <p className="line-clamp-3">{item?.materialDescription}</p>
                <div className="grid grid-cols-3 gap-3 py-2">
                  <button
                    onClick={() => {
                      window.location.hash = item._id;
                      setActiveTab("add-study-material");
                    }}
                    className=" py-2 rounded-full cursor-pointer bg-black text-white hover:bg-green-900 duration-300"
                  >
                    Edit
                  </button>
                  <button className=" py-2 rounded-full cursor-pointer bg-black text-white hover:bg-green-900 duration-300">
                    View
                  </button>
                  <button className=" py-2 rounded-full cursor-pointer bg-black text-white hover:bg-green-900 duration-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
