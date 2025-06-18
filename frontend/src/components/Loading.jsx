export const LoadingAnimation = ()=>{
    return <div className="inline-block w-5 h-5 animate-spin border-t-2 border-white rounded-full"></div>
}

export const LoadingScreen = ()=>{
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full w-14 h-14 border-t-4 border-red-500"></div>
    </div>
}