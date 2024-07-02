import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="bg-gray-800">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="text-white text-2xl font-bold">
            <Link to="/">My App</Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Movies
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
