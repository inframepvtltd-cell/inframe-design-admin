'use client';
import React, { useEffect, useState } from "react";
import SideBar from "../common/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../common/Header";
import FullScreenLoader from "../components/Loading";
import { MdDelete } from "react-icons/md";


export default function Enquiry() {
    const apibaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [activeTab, setActiveTab] = useState("enquiry-list");
    const [enquiryStates, setEnquiryStates] = useState([]);
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [tableData, setTableData] = useState([]);
    const [enquiryData, setEnquiryData] = useState([]);
    const [loading, setLoading] = useState(true); // 🔹 loading state

    return (
        <div className="grid grid-cols-[30%_auto]">
            {loading && <FullScreenLoader />}
            <SideBar />
            <div>
                <Header />
                <main className="h-[90vh] overflow-y-scroll w-full px-10 py-3">
                    <h2 className="text-[40px] font-bold mb-6 capitalize">View Enquiries</h2>

                    {/* Tabs */}
                    <div className="grid grid-cols-4 gap-3 my-6">
                        <button
                            onClick={() => setActiveTab("enquiry-list")}
                            className={`${activeTab === "enquiry-list"
                                ? "bg-gray-950 text-white border-transparent"
                                : ""
                                } cursor-pointer hover:bg-gray-950 hover:text-white px-3 py-2 duration-300 border-2 border-gray-950 hover:border-transparent`}
                        >
                            Enquiry List
                        </button>
                        <button
                            onClick={() => setActiveTab("enquiry-data")}
                            className={`${activeTab === "enquiry-data"
                                ? "bg-gray-950 text-white border-transparent"
                                : ""
                                } cursor-pointer hover:bg-gray-950 hover:text-white px-3 py-2 duration-300 border-2 border-gray-950 hover:border-transparent`}
                        >
                            Add Enquiry Data
                        </button>
                    </div>

                    {/* Conditional Tabs */}
                    {activeTab === "enquiry-list" && (
                        <EnquiryList
                            enquiryData={enquiryData}
                            setEnquiryData={setEnquiryData}
                            apibaseUrl={apibaseUrl}
                            setLoading={setLoading}
                        />
                    )}

                    {activeTab === "enquiry-data" && (
                        <AddEnquiryData
                            tableData={tableData}
                            setTableData={setTableData}
                            cityName={cityName}
                            setCityName={setCityName}
                            stateName={stateName}
                            setStateName={setStateName}
                            enquiryStates={enquiryStates}
                            setEnquiryStates={setEnquiryStates}
                            apibaseUrl={apibaseUrl}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

// ------------------- EnquiryList Component -------------------
function EnquiryList({ apibaseUrl, setEnquiryData, enquiryData, setLoading }) {
    const viewEnquiryEntries = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${apibaseUrl}/enquiry/all-entries`);
            const finalRes = res.data;
            if (finalRes.status === 1) {
                setEnquiryData(finalRes.enquiryData || []);
            } else {
                setEnquiryData([]);
            }
        } catch (err) {
            console.error(err);
            setEnquiryData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewEnquiryEntries(); // 🔹 fetch only once
    }, []);

    if (!enquiryData || enquiryData.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 font-semibold">
                No enquiries found
            </div>
        );
    }

    return (
        <div className="bg-white font-sans min-h-screen">
            <table className="min-w-full overflow-x-scroll border border-gray-300">
                <thead className="bg-gray-100">
                    <tr className="text-sm">
                        <th className="border border-gray-300 px-2 py-2 text-left">Sr. No</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Phone</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">State</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">City</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Program</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Course</th>
                        <th className="border border-gray-300 px-2 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {enquiryData.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryName}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryEmail}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryPhone}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryState}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryCity}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryProgram}</td>
                            <td className="border border-gray-300 px-2 py-2">{item.enquiryCourse}</td>
                            <td className="border border-gray-300 px-2 py-2 text-center">
                                <button className="text-black text-sm cursor-pointer">Mark</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AddEnquiryData({
    tableData,
    setTableData,
    apibaseUrl,
    cityName,
    setCityName,
    stateName,
    setStateName,
    enquiryStates,
    setEnquiryStates,
}) {
    const saveState = (e) => {
        e.preventDefault();
        axios
            .post(`${apibaseUrl}/enquiry/add-state`, { stateName })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    Swal.fire({
                        title: "State Added",
                        icon: "success",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
                else if (finalRes.status == -1) {
                    Swal.fire({
                        title: "City name is already exist !",
                        icon: "error",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    });
                }
                else {
                    Swal.fire({
                        title: "State name is already exist !",
                        icon: "warning",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    });
                }
            });
    };

    const saveCity = (e) => {
        e.preventDefault();
        axios
            .post(`${apibaseUrl}/enquiry/add-city`, { cityName, stateName })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    Swal.fire({
                        title: "City Added Successfully",
                        icon: "success",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        title: "City Name is already Exist !",
                        icon: "warning",
                        background: "white",
                        iconColor: "black",
                        confirmButtonColor: "black",
                    });
                }
            });
    };


    const viewCity = () => {
        axios
            .get(`${apibaseUrl}/enquiry/view-city`)
            .then((res) => res.data)
            .then((finalRes) => {
                setTableData(finalRes.cityRes);
            });
    };

    useEffect(() => {
        viewCity();
    }, []);

    const viewEnquiryState = () => {
        axios
            .get(`${apibaseUrl}/enquiry/view-state`)
            .then((res) => res.data)
            .then((finalRes) => {
                setEnquiryStates(finalRes.enquiryStateData);
            });
    };

    useEffect(() => {
        viewEnquiryState();
    }, []);



    const deleteCity = async (id) => {
        if (!id) {
            Swal.fire('Error!', 'City ID is required.', 'error');
            return;
        }

        // Ask for confirmation before deleting
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: 'black',
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                // Send delete request to server
                const response = await axios.post(`${apibaseUrl}/enquiry/delete-city/${id}`);
                const resData = response.data;

                // Handle different backend responses
                switch (resData.status) {
                    case 1:
                        Swal.fire('Deleted!', resData.msg || 'The city has been deleted.', 'success');
                        viewCity(); // Refresh city list
                        break;
                    case -1:
                        Swal.fire('Error!', resData.msg || 'City ID is missing.', 'error');
                        break;
                    case -2:
                        Swal.fire('Error!', resData.msg || "Can't delete city from the database.", 'error');
                        break;
                    case -5:
                        Swal.fire('Error!', resData.msg || 'Something went wrong.', 'error');
                        break;
                    default:
                        Swal.fire('Error!', 'Unexpected response from server.', 'error');
                }

            } catch (error) {
                Swal.fire(
                    'Error!',
                    error.response?.data?.msg || error.message || 'Something went wrong!',
                    'error'
                );
            }
        }
    };



    return (
        <div className="bg-white font-sans min-h-screen">
            <form onSubmit={saveState} className="mb-[30px]">
                <p className="mb-1 font-semibold text-lg">Add State</p>
                <input
                    required
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Enter state name"
                    type="text"
                    className="w-full border  border-gray-300 -[5px] px-3 focus:outline-none  py-[10px]"
                />
                <button className="py-2 bg-gray-950 text-white cursor-pointer px-10 mt-3 ">
                    Add State
                </button>
            </form>

            <form onSubmit={saveCity} className="mb-[30px]">
                <div className="mb-2">
                    <p className="mb-1 font-semibold text-lg">Select State</p>
                    <select
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full border border-gray-300 cursor-pointer -[5px] px-3 focus:outline-none  py-[10px]"
                    >
                        <option>Select State</option>

                        {enquiryStates.map((items, indexes) => {
                            return (
                                <option key={indexes} value={items._id}>
                                    {items.stateName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="">
                    <p className="mb-1 font-semibold text-lg">Add City</p>
                    <input
                        required
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="Enter city name"
                        type="text"
                        className="w-full border border-gray-300 -[5px] px-3 focus:outline-none  py-[10px]"
                    />
                </div>
                <button className="py-2 bg-gray-950 text-white cursor-pointer px-10 mt-3 ">
                    Add City
                </button>
            </form>

            <div className="bg-gray-50 text-black p-6  shadow-md mt-10">
                <h2 className="text-2xl font-bold mb-6">States and Cities (Enquiry Places)</h2>

                <table className="w-full border border-gray-300 table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 bg-white px-4 py-2 text-left">
                                Sr. No
                            </th>
                            <th className="border border-gray-300 bg-white px-4 py-2 text-left">
                                State Name
                            </th>
                            <th className="border border-gray-300 bg-white px-4 py-2 text-left">
                                City
                            </th>
                            <th className="border border-gray-300 bg-white px-4 py-2 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {enquiryStates.map((state, idx) => {
                            const citiesOfState = tableData
                                ? tableData.filter((city) => city.state._id === state._id)
                                : [];

                            return (
                                <React.Fragment key={state._id}>
                                    {citiesOfState.length === 0 ? (
                                        <tr className="bg-gray-50">
                                            <td className="border border-gray-300 bg-white px-4 py-2">
                                                {idx + 1}
                                            </td>
                                            <td className="border border-gray-300 bg-white px-4 py-2">
                                                {state.stateName}
                                            </td>
                                            <td className="border border-gray-300 bg-white px-4 py-2">
                                                No Cities Added yet
                                            </td>
                                        </tr>
                                    ) : (
                                        citiesOfState.map((city, cityIndex) => (
                                            <tr
                                                key={city._id}
                                                className={cityIndex % 2 === 0 ? "bg-gray-50" : ""}
                                            >
                                                {cityIndex === 0 && (
                                                    <>
                                                        <td
                                                            className="border border-gray-300 bg-white px-4 py-2"
                                                            rowSpan={citiesOfState.length}
                                                        >
                                                            {idx + 1}
                                                        </td>
                                                        <td
                                                            className="border border-gray-300 bg-white px-4 py-2"
                                                            rowSpan={citiesOfState.length}
                                                        >
                                                            {state.stateName}
                                                        </td>
                                                    </>
                                                )}
                                                <td className="border border-gray-300 bg-white px-4 py-2">
                                                    <div className="flex items-center justify-between">
                                                        {city.cityName}
                                                        <span onClick={() => deleteCity(city._id)} className="hover:text-red-600 cursor-pointer text-xl"><MdDelete /></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
