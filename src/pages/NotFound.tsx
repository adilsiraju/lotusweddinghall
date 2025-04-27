
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-lotus-cream px-4">
      <div className="text-center max-w-lg">
        <h1 className="font-playfair text-6xl text-lotus-navy font-semibold mb-6">404</h1>
        <div className="w-24 h-1 bg-lotus-gold mx-auto mb-8"></div>
        <h2 className="font-playfair text-3xl font-medium mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button
          className="bg-lotus-navy hover:bg-lotus-navy/90 text-white px-8 py-6"
          onClick={() => navigate("/")}
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
