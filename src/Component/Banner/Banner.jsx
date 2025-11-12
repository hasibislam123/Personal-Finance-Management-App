import React, { useState, useEffect } from "react";
import bannerImage from "../../assets/BannerImg.jpg";
import { HashLoader } from "react-spinners"; 

const Banner = () => {
    const [loading, setLoading] = useState(true);
    const ACCENT_HEX_COLOR = "#38b000";

    useEffect(() => {
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <section className="bg-gray-100 min-h-screen flex justify-center items-center">
                <HashLoader  size={60} />
            </section>
        );
    }

    return (
        <section
            className="bg-cover bg-center text-white py-20"
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 md:px-0">

                <div className=" md:w-1/2 lg:p-8 flex flex-col gap-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight poppins-thin">
                        Take Control of Your Finances <br /> and Save Smarter
                    </h1>
                    <p className="text-lg md:text-xl text-green-100">
                        Manage your income and expenses effortlessly, track your savings, and reach your financial goals faster with FinEase.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                            Get Started
                        </button>
                        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;