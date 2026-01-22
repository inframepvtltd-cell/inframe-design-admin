"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addfreeresources({ apiBaseUrl }) {

    /* ---------- resource ---------- */
    const [resource, setResource] = useState({
        title: "",
        description: "",
    });
    const [categoryData, setCategoryData] = useState([])

    const [resCategory, setResCategory] = useState('')
    const [resFile, setResfile] = useState(null)

    /* ---------- page meta ---------- */
    const [resMetaTitle, setResMetaTitle] = useState("");
    const [resMetaDescription, setResMetaDescription] = useState("");

    /* ---------- faqs ---------- */
    const [resFaqsQuestions, setResFaqQuestions] = useState([]);
    const [resFaqsAnswer, setResFaqsAnswer] = useState([]);

    /* ---------- handlers ---------- */

    const handleResourceChange = (field, value) => {
        setResource({ ...resource, [field]: value });
    };

    const addFaq = () => {
        setResFaqQuestions([...resFaqsQuestions, ""]);
        setResFaqsAnswer([...resFaqsAnswer, ""]);
    };

    const handleFaqQuestionChange = (index, value) => {
        const updated = [...resFaqsQuestions];
        updated[index] = value;
        setResFaqQuestions(updated);
    };

    const handleFaqAnswerChange = (index, value) => {
        const updated = [...resFaqsAnswer];
        updated[index] = value;
        setResFaqsAnswer(updated);
    };

    /* ---------- submit ---------- */

    const addFreeResources = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", resource.title);
        formData.append("description", resource.description);
        formData.append("file", resFile);
        formData.append("categoryId", resCategory); // <-- add this

        axios.post(`${apiBaseUrl}/free-resources/add`, formData)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status === 1) {
                    Swal.fire({
                        title: "Resource Added Successfully!",
                        icon: "success",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    });
                    setResource({ title: "", description: "" });
                    setResfile(null);
                } else {
                    Swal.fire({
                        title: "Something went wrong!",
                        icon: "error",
                        background: "white",
                        iconColor: "black",
                    });
                }
            })
            .catch((err) => console.error(err));
    };


    const pageContentUpdate = (e) => {
        e.preventDefault();
        // API call later
    };

    const addCategory = async (e, id) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apiBaseUrl}/free-resources/add-category`, { resCategory })
            if (response.data.status == 1) {
                Swal.fire({
                    icon: "success",
                    iconColor: 'black',
                    color: 'black',
                    title: "Category Added Successfully",
                    text: `The category "${resCategory}" has been added.`,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: 'black',
                    timer: 2000, // optional, auto-close after 2s
                }).then((res) => {
                    if (res.isConfirmed) {
                        window.location.reload()
                        setResCategory('')
                        setResMetaTitle('')

                    }
                })
            }

            else if (response.data.status == -2) {
                Swal.fire({
                    iconColor: 'black',
                    color: 'black',
                    icon: "warning",
                    title: "Category Already Exists",
                    text: `The category "${resCategory}" is already exists.`,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    confirmButtonColor: 'black',
                    timer: 2000, // optional, auto-close after 2s
                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    color: 'black',
                    iconColor: 'black',
                    title: "Something went wrong !",
                    text: 'Try again later',
                });

            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/free-resources/view-category`);
            if (response.data.status === 1) {
                setCategoryData(response.data.data);
            } else {
                console.warn("API returned status:", response.data.status);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }


    useEffect(() => {
        fetchAllCategories()
    }, [])


    return (
        <>

            <form onSubmit={addCategory} className="p-5 bg-white shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Add Category</h2>
                <label className="block mb-1 font-semibold">Category Name</label>
                <input
                    name="resCategory"
                    value={resCategory}
                    onChange={(e) =>
                        setResCategory(e.target.value)
                    }
                    className="w-full border border-gray-300 px-3 py-2 mb-3"
                    required
                />
                <button className="bg-black text-white hover:bg-green-900 duration-300 px-5 mt-3 cursor-pointer py-2">Add Category</button>
            </form>


            {/* ---------- ADD RESOURCE ---------- */}
            <form onSubmit={addFreeResources}>
                <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-100 shadow-sm my-8">
                    <h2 className="text-3xl font-bold mb-6">Add Free Resource</h2>

                    <label className="block mb-1 font-semibold">Select Category</label>
                    <select
                        name="resCategory"
                        value={resCategory} // bind selected value
                        onChange={(e) => setResCategory(e.target.value)} // update state on selection
                        className="border mb-3 py-3 px-2 w-full border-gray-300"
                        required
                    >
                        <option value="">Select Category</option>

                        {categoryData.length === 0 ? (
                            <option className="text-gray-500" value="">no category added yet...</option>
                        ) : (
                            categoryData.map((item) => (
                                <option className="text-gray-500" key={item._id} value={item._id}>
                                    {item.resCategoryName}
                                </option>
                            ))
                        )}
                    </select>

                    <label className="block mb-1 font-semibold">Resource Title</label>
                    <input
                        value={resource.title}
                        onChange={(e) =>
                            handleResourceChange("title", e.target.value)
                        }
                        className="w-full border border-gray-300 px-3 py-2 mb-3"
                        required
                    />

                    <label className="block mb-1 font-semibold">Description</label>
                    <textarea
                        value={resource.description}
                        onChange={(e) =>
                            handleResourceChange("description", e.target.value)
                        }
                        rows={3}
                        className="w-full border border-gray-300 px-3 py-2 mb-3"
                        required
                    />

                    <label className="block mb-1 font-semibold">Upload PDF</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) =>
                            setResfile(e.target.files[0])
                        }
                        className="bg-black hover:bg-green-900 text-white px-4 py-2 cursor-pointer"
                        required
                    />
                </div>

                <button className="py-2 px-7 bg-black text-white hover:bg-green-900 duration-300">
                    Add Free Resource
                </button>
            </form>

            {/* ---------- PAGE CONTENT ---------- */}
            <form onSubmit={pageContentUpdate}>


                <h3 className="text-2xl font-semibold mt-7 mb-3">FAQs</h3>

                {resFaqsQuestions.map((_, index) => (
                    <div key={index} className="mb-4">
                        <input
                            placeholder="Question"
                            value={resFaqsQuestions[index]}
                            onChange={(e) =>
                                handleFaqQuestionChange(index, e.target.value)
                            }
                            className="w-full border-gray-300 border px-3 py-2 mb-2"
                        />

                        <textarea
                            placeholder="Answer"
                            value={resFaqsAnswer[index]}
                            onChange={(e) =>
                                handleFaqAnswerChange(index, e.target.value)
                            }
                            className="w-full border-gray-300 border px-3 py-2"
                        />
                    </div>
                ))}

                <span
                    onClick={addFaq}
                    className="bg-black text-white px-4 py-2 cursor-pointer hover:bg-green-900"
                >
                    + Add FAQ
                </span>

                <button className="block mt-6 py-2 px-7 bg-black text-white hover:bg-green-900">
                    Update Changes
                </button>

            </form >
        </>
    );
}
