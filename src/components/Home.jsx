import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get("/api/students?domain=CSE&radius=10km")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Nearby Students
        </h1>
        
        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div 
              key={student._id} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {student.name}
              </h3>
              <p className="text-gray-600 mt-2">{student.domain}</p>
              <p className="text-green-600 mt-2">
                {student.distance} away
              </p>
              <button className="mt-4 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}