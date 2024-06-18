'use client'

const Loading = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2B2D42]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-500"></div>
    </div>
  );
};

export default Loading;
