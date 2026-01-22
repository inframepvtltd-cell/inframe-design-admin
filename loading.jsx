import React from 'react'

export default function loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="h-14 w-14 animate-spin rounded-t-full  border-t-4 border-transparent  border-t-black rounded-full "></div>
            </div>
        </div>
    )
}
