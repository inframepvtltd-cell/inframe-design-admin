import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"



export function AddSlider({ apiBaseUrl }) {

    const [editId, setEditId] = useState('')

    //previewimg.webp

    const [previewImage, setPreviewImage] = useState('/previewimg.webp')


    const [sliderHeadlineFirst, setSliderHeadlineFirst] = useState('')
    const [sliderHeadlineSecond, setSliderHeadlineSecond] = useState('')
    const [sliderDescription, setSliderDescription] = useState('')





    const addSlider = (event) => {
        event.preventDefault()
        const allData = new FormData(event.target)
        if (editId) {
            //update slider
            axios.post(`${apiBaseUrl}/slider/update-slider/${editId}`, allData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Slider Updated Successfully !',
                            icon: 'success',
                            iconColor: 'black',
                            color: 'black',
                            confirmButtonColor: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Something went wrong !',
                            icon: 'error',
                            iconColor: 'black',
                            color: 'black',
                            confirmButtonColor: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                })
        }

        else {
            axios.post(`${apiBaseUrl}/slider/add`, allData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        Swal.fire({
                            title: 'Slider Added Successfully !',
                            icon: 'success',
                            iconColor: 'black',
                            color: 'black',
                            confirmButtonColor: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Something went wrong !',
                            icon: 'error',
                            iconColor: 'black',
                            color: 'black',
                            confirmButtonColor: 'black'
                        }).then((res) => {
                            window.location.reload()
                        })
                    }
                })
        }
    }

    useEffect(() => {
        if (editId) {
            axios.get(`${apiBaseUrl}/slider/edit-slider/${editId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        const slider = finalRes.findSliderById

                        setSliderHeadlineFirst(slider.sliderHeadlineFirst || '')
                        setSliderHeadlineSecond(slider.sliderHeadlineSecond || '')
                        setSliderDescription(slider.sliderDescription || '')
                        setPreviewImage(slider.sliderImage)

                    }
                })
        }
    }, [editId])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const idFromHash = window.location.hash.replace('#', '');
            setEditId(idFromHash);
        }
    }, []);


    console.log(editId)

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-4xl font-bold mb-6 capitalize">{editId ? "update slider" : "Add Slider"}</h2>

            <form onSubmit={addSlider} class="space-y-6">


                <label className="block mb-2 font-semibold text-gray-700">Add Slider Image</label>
                <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs ">

                    <img
loading="lazy"
                        className="object-cover h-[400px] object-center mb-5 w-fit  "
                        src={previewImage}
                    />

                    <input
                        name="sliderImage"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const maxSize = 500 * 1024; // 500KB

                            if (file.size > maxSize) {
                                Swal.fire({
                                    title: "Image Size Must Be Less than 500kb",
                                    icon: "warning",
                                    color: "black",
                                    iconColor: "black",
                                    confirmButtonColor: "black",
                                });
                                e.target.value = "";
                                return;
                            }

                            setPreviewImage(URL.createObjectURL(file));
                        }}
                        type="file"
                        className="bg-gray-950 duration-300 hover:bg-green-900 px-5  py-2 text-white rounded cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Heading 1</label>
                    <input

                        value={sliderHeadlineFirst}
                        onChange={(e) => setSliderHeadlineFirst(e.target.value)}
                        name="sliderHeadlineFirst"
                        type="text"
                        placeholder="Enter heading 1"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Heading 2</label>
                    <input
                        value={sliderHeadlineSecond}
                        onChange={(e) => setSliderHeadlineSecond(e.target.value)}
                        name="sliderHeadlineSecond"
                        type="text"
                        placeholder="Enter heading 2"
                        class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Paragraph</label>
                    <textarea
                        required
                        value={sliderDescription}
                        onChange={(e) => setSliderDescription(e.target.value)}
                        name="sliderDescription"
                        rows="4"
                        placeholder="Enter description or paragraph..."
                        className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-black"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded hover:bg-green-900 duration-300 cursor-pointer text-lg transition capitalize"
                    >
                        {editId ? "update slider" : "Add Slider"}
                    </button>
                </div>

            </form>
        </div>
    )
}