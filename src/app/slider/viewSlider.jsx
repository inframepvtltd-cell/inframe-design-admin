import axios from "axios"
import { useEffect, useState } from "react"

export function ViewSlider({ apiBaseUrl, setActiveTab }) {


    const [sliderData, setSliderData] = useState([])

    const fetchSliderData = () => {

        axios.get(`${apiBaseUrl}/slider/view`)
            .then((res) => res.data)
            .then((finalRes) => {
                setSliderData(finalRes.sliderData)
            })
    }

    useEffect(() => {
        fetchSliderData()
    }, [])


    return (
        <>
            <div className="min-h-screen bg-white text-gray-950 py-5">
                <h1 className="text-3xl font-bold mb-8 capitalize">Current slider</h1>

                <div className="grid grid-cols-2 gap-10">
                    {sliderData.map(item => (

                        <div key={item._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-sm capitalize">
                            <img loading="lazy" src={item.sliderImage} alt={item.sliderName} className="w-full h-[200px] object-cover object-top" />
                            <div className="p-4">
                                <h2 className="text-[18px] mb-2"> <b>headings</b> - {item.sliderHeadlineFirst} , {item.sliderHeadlineSecond}</h2>
                                <p className="text-[18px] mb-4 capitalize"><b>description</b> - {item.sliderDescription}</p>
                                <div className="grid grid-cols-3 gap-2 w-full ">
                                    <button onClick={() => {
                                        window.location.hash = item._id;
                                        setActiveTab('add-slider');
                                    }}
                                        className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-800 duration-300">Edit</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-800 duration-300">View</button>
                                    <button className="bg-gray-950 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-800 duration-300">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
} 