const FullScreenLoader = () => {
    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black/60">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="h-16 w-16 animate-spin rounded-t-full  border-t-10 border-transparent  border-t-white rounded-full "></div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
