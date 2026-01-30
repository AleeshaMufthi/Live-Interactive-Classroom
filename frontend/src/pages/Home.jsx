import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Interactive Classroom 🎓</h1>

      <div className="flex gap-4">
        <Link to="/teacher">
          <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold">
            Teacher Panel
          </button>
        </Link>

        <Link to="/student">
          <button className="px-6 py-3 bg-black rounded-lg border">
            Student Join
          </button>
        </Link>
      </div>
    </div>
  );
}
