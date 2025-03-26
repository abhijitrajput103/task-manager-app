import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen">
    
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About</h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    This is a simple task management app built using the MERN stack. It allows users to create, update, delete, and manage tasks efficiently.
                </p>
                <p className="text-center">
                    <Link
                        to="/"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 inline-block"
                    >
                        Go Back
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default About;