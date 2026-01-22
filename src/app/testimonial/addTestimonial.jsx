'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export function Addtestimonial({ apiBaseUrl }) {

    const [editId, setEditId] = useState('')
    const [previewVideo, setPreviewVideo] = useState('/previewvideo.mp4')

    const [studentName, setStudentName] = useState('')
    const [studentDescription, setStudentDescription] = useState('')
    const [videoLiveLink, setVideoLiveLink] = useState('')

    const [localVideoLink, setLocalVideoLink] = useState('')


    const addtestimonial = (event) => {
        event.preventDefault()
        const allData = new FormData(event.target)

        const apiUrl = editId
            ? `${apiBaseUrl}/testimonial/update-testimonial/${editId}`
            : `${apiBaseUrl}/testimonial/add`

        axios.post(apiUrl, allData)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status === 1) {
                    Swal.fire({
                        title: editId
                            ? 'Testimonial Updated Successfully!'
                            : 'Testimonial Added Successfully!',
                        icon: 'success',
                        iconColor: 'black',
                        color: 'black',
                        confirmButtonColor: 'black'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            // remove hash from URL
                            window.history.replaceState(
                                null,
                                '',
                                window.location.pathname
                            )

                            // optional: reset editId so form switches to "Add" mode
                            setEditId('')
                            setStudentName('')
                            setStudentDescription('')
                            setVideoLiveLink('')
                            setLocalVideoLink('')
                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Something went wrong!',
                        icon: 'error',
                        iconColor: 'black',
                        color: 'black',
                        confirmButtonColor: 'black'
                    })
                }
            })
    }

    useEffect(() => {
        if (editId) {
            axios.get(`${apiBaseUrl}/testimonial/edit-testimonial/${editId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status === 1) {
                        const t = finalRes.findtestimonialById
                        setStudentName(t.studentName || '')
                        setStudentDescription(t.studentDescription || '')
                        setLocalVideoLink(t.localVideoLink)
                        setVideoLiveLink(t.videoLiveLink)
                    }
                })
        }
    }, [editId])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const idFromHash = window.location.hash.replace('#', '')
            setEditId(idFromHash)
        }
    }, [])

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-4xl font-bold mb-6 capitalize">
                {editId ? "update testimonial" : "Add testimonial"}
            </h2>

            <form onSubmit={addtestimonial} className="space-y-6">

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Link Of the video
                    </label>
                    <input
                        placeholder="http://inframedesigninstitutetestimonial.mp4"
                        value={videoLiveLink}
                        onChange={(e) => setVideoLiveLink(e.target.value)}
                        name="videoLiveLink"
                        type="text"
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <label className="block mb-2 font-semibold text-gray-700">
                    Add testimonial Video
                </label>

                <div className="border p-5 w-full h-auto border-gray-200 rounded shadow-xs">

                    <video
                        className="h-[400px] w-fit mb-5 rounded"
                        src={editId ? localVideoLink : previewVideo}
                        controls
                        muted
                    />

                    <input
                        name="localVideoLink"
                        type="file"
                        value={''}
                        accept="video/*"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (!file) return

                            const maxSize = 1 * 1024 * 1024 // 100MB

                            if (file.size > maxSize) {
                                Swal.fire({
                                    title: `Video size must be less than ${maxSize}`,
                                    icon: 'warning',
                                    iconColor: 'black',
                                    confirmButtonColor: 'black'
                                })
                                e.target.value = ''
                                return
                            }

                            setPreviewVideo(URL.createObjectURL(file))
                        }}
                        className="bg-gray-950 duration-300 hover:bg-green-900 px-5 py-2 text-white rounded cursor-pointer"
                    />
                </div>



                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        Name of Student
                    </label>
                    <input
                        placeholder="Student Name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        name="studentName"
                        type="text"
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                        About the Institute
                    </label>
                    <textarea
                        placeholder="Inframe Design Institute is 100% trustable platform where student not only learn new things they are really grow as they perform"
                        required
                        value={studentDescription}
                        onChange={(e) => setStudentDescription(e.target.value)}
                        name="studentDescription"
                        rows="4"
                        className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded hover:bg-green-900 duration-300 text-lg capitalize"
                >
                    {editId ? "update testimonial" : "Add testimonial"}
                </button>

            </form>
        </div>
    )
}
