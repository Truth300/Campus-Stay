
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="text-hostel-primary text-9xl font-bold mb-4">404</div>
        <h1 className="text-3xl font-bold text-hostel-dark mb-4">Page Not Found</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center btn-primary py-3 px-6"
        >
          <Home className="mr-2" size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
