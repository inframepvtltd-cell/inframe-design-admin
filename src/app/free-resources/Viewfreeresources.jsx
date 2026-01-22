import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FullScreenLoader from '../components/Loading'
import { Trash2, FileText } from "lucide-react"
import Swal from 'sweetalert2'

export default function Viewfreeresources() {
  const [freeResData, setFreeResData] = useState([])
  const [loading, setLoading] = useState(true)

  const apibaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const fetchAllFreeRes = async () => {
    try {
      const res = await axios.get(`${apibaseUrl}/free-resources/view`)
      setFreeResData(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllFreeRes()
  }, [])

  // ✅ Loading UI
  if (loading) {
    return <FullScreenLoader />
  }


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This resource will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    })

    if (!result.isConfirmed) return

    try {
      await axios.post(`${apibaseUrl}/free-resources/delete/${id}`)

      // remove from UI instantly
      setFreeResData((prev) => prev.filter((item) => item._id !== id))

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Resource has been deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete resource. Please try again.",
      })
    }
  }
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url + "?dl=1";       // Force download
    link.download = "resource.pdf";  // optional filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold tracking-tight">
          Free Resources
        </h2>
      </div>

      {freeResData?.length === 1 ? (
        <div className="text-center py-20 text-gray-400">
          No free resources available
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeResData?.map((item) => (
            <div
              key={item._id}
              className="group relative bg-white/70 backdrop-blur-xl border border-gray-200  shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Top Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs bg-black text-white px-3 py-1 ">
                <FileText size={12} />
                PDF
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-black leading-snug mb-3 line-clamp-2">
                  {item.resTitle}
                </h3>

                <p className="text-sm text-black leading-relaxed line-clamp-3">
                  {item.resDescription}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <a
                  target='_blank'
                  href={item.resFile}
                  className="text-sm font-medium hover:bg-black duration-300 hover:text-white border-2 border-gray-300 px-3 py-2 hover:border-transparent"
                >
                  Download PDF →
                </a>


                <button

                  className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div >
  )
}
