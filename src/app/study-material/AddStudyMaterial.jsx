import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function AddStudyMaterial() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [categoryData, setCategoryData] = useState([])
    const [studyCategoryName, setStudyCategoryName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [previewImage, setPreviewImage] = useState("/previewimg.webp");
    const [previewImageSecond, setPreviewImageSecond] = useState("/previewimg.webp");

    const [loadingCategory, setLoadingCategory] = useState(false)

    //selectedCategory

    // all inputs states
    const [materialTitle, setmaterialTitle] = useState('')
    const [materialSlug, setmaterialSlug] = useState('')
    const [materialDescription, setmaterialDescription] = useState('')
    const [materialDetails, setmaterialDetails] = useState('')
    const [materialSummeries, setmaterialSummeries] = useState([
        '',
        ''
    ])


    const addCategory = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apiBaseUrl}/study-materials/add-category`, { studyCategoryName })
            if (response.data.status == 1) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: (response.data.msg),
                    showConfirmButton: true,
                    confirmButtonColor: 'black'
                }).then((res) => {
                    if (res.isConfirmed) {
                        window.location.reload()
                        setStudyCategoryName("");
                    }
                })

            }
            else {
                Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    text: response.data.msg
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong!"
            });
        }
    }

    const viewallCategories = async () => {
        try {
            setLoadingCategory(true)
            const response = await axios.get(`${apiBaseUrl}/study-materials/view-category`)
            if (response.data.status == 1) {
                setCategoryData(response.data.result),
                    setLoadingCategory(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addstudyMaterial = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            const response = await axios.post(`${apiBaseUrl}/study-materials/add`, { formData })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        viewallCategories();
    }, []);


    return (

        <div>
            {/* ---------- ADD CATEGORY ---------- */}
            <form onSubmit={addCategory} className="p-5 bg-white shadow-lg mb-10">
                <h2 className="text-3xl font-bold mb-6">Add Category</h2>

                <label className="block mb-1 font-semibold">Category Name</label>
                <input
                    onChange={(e) => setStudyCategoryName(e.target.value)}
                    name="studyCategoryName"
                    className="w-full border border-gray-300 px-3 py-2 mb-3"
                    required
                />

                <button className="bg-black text-white hover:bg-green-900 duration-300 px-5 mt-3 cursor-pointer py-2">
                    Add Category
                </button>
            </form>

            {/* ---------- ADD STUDY MATERIAL ---------- */}
            <form onSubmit={addstudyMaterial} className="max-w-5xl mx-auto p-6 bg-white border border-gray-100 shadow-sm my-8">
                <h2 className="text-3xl font-bold mb-6">Add Study Material</h2>



                {/* Category Selection */}
                <label className="block mb-1 font-semibold">Select Category</label>
                <select
                    name="studyCategoryName"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border mb-3 py-3 px-2 w-full border-gray-300"
                    required
                >
                    <option value="" disabled>
                        {loadingCategory ? "Loading categories..." : "Select Category"}
                    </option>

                    {!loadingCategory && categoryData?.length === 0 && (
                        <option value="" disabled>
                            No category added yet...
                        </option>
                    )}

                    {!loadingCategory &&
                        categoryData?.map((item) => (
                            <option
                                key={item._id}
                                value={item._id}
                                className="text-gray-700 cursor-pointer"
                            >
                                {item.studyCategoryName}
                            </option>
                        ))}
                </select>

                {/* Resource Title */}
                <label className="block mb-1 font-semibold">Resource Title</label>
                <input
                    value={materialTitle}
                    type="text"
                    onChange={(e) => setmaterialTitle(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 mb-3"
                    required
                />

                {/* Resource slug */}
                <label className="block mb-1 font-semibold">Resource Slug</label>
                <input
                    value={materialSlug}
                    type="text"
                    onChange={(e) => setmaterialSlug(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 mb-3"
                    required
                />

                {/* Description */}
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                    rows={3}
                    value={materialDescription}
                    onChange={(e) => setmaterialDescription(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 mb-3"
                    required
                />

                {/* Banner Image */}
                <p className='block font-semibold mt-4' >Material Banner Image</p>
                <div className="border p-5 w-full h-auto border-gray-200  shadow-xs ">
                    <img
                        loading="lazy"
                        className="object-cover mb-5  max-w-[300px] max-h-[250px]"
                        src={previewImage}
                    />

                    <input
                        name="materialBannerImage"
                        type="file"
                        accept="image/*"
                        className="bg-gray-950 duration-300 hover:bg-green-900 px-5 py-2 text-white cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const maxSize = 500 * 1024; // 100KB

                            if (file.size > maxSize) {
                                Swal.fire({
                                    title: 'Image Size Must Be Less than 500kb',
                                    icon: 'warning',
                                    color: 'black',
                                    iconColor: 'black',
                                    confirmButtonColor: 'black'
                                })
                                e.target.value = ""; // reset input
                                return;
                            }

                            setPreviewImage(URL.createObjectURL(file));
                        }}
                    />
                </div>

                <p className='block font-semibold mt-7' >Material Preview Image</p>
                <div className="border p-5 w-full h-auto border-gray-200  shadow-xs ">
                    <img
                        loading="lazy"
                        className="object-cover mb-5  max-w-[300px] max-h-[250px]"
                        src={previewImageSecond}
                    />

                    <input
                        name="materialPreviewImage"
                        type="file"
                        accept="image/*"
                        className="bg-gray-950 duration-300 hover:bg-green-900 px-5 py-2 text-white cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const maxSize = 500 * 1024; // 100KB

                            if (file.size > maxSize) {
                                Swal.fire({
                                    title: 'Image Size Must Be Less than 500kb',
                                    icon: 'warning',
                                    color: 'black',
                                    iconColor: 'black',
                                    confirmButtonColor: 'black'
                                })
                                e.target.value = ""; // reset input
                                return;
                            }

                            setPreviewImageSecond(URL.createObjectURL(file));
                        }}
                    />
                </div>





                {/* Material Details */}
                <label className="block mt-5 font-semibold">Material Details</label>
                <textarea
                    value={materialDetails}
                    rows={4}
                    onChange={(e) => setmaterialDetails(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 mb-3"
                    required
                />

                {/* Material Summaries */}
                <label className="block mb-1 font-semibold">Material Summaries</label>
                {materialSummeries?.map((item, index) => {
                    return (
                        <input
                            value={item}
                            key={index}
                            type='text'
                            rows={4}
                            onChange={(e) => {
                                const newSummaries = [...materialSummeries];
                                newSummaries[index] = e.target.value;
                                setmaterialSummeries(newSummaries);
                            }}
                            className="w-full border border-gray-300 px-3 py-2 mb-3"
                            required
                        />
                    )
                })}

                <p onClick={() => setmaterialSummeries([...materialSummeries, ''])} className='bg-black w-[250] cursor-pointer hover:bg-green-950 duration-300 text-white px-7 py-2 my-5'>+ Add Summery Point</p>



                <button className="py-3 cursor-pointer px-10 bg-black text-white hover:bg-green-900 duration-300 mt-3">
                    Add Study Material
                </button>
            </form>
        </div>


    )
}
