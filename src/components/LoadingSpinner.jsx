export default function LoadingSpinner({ fullPage = false }) {
    return (
      <div className={`flex justify-center items-center ${fullPage ? 'min-h-screen' : 'py-20'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }