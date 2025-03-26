import React, { useState, useEffect } from "react";
import AffiliatedLogo from "../component/AffiliatedLogo";
import { useAuth } from "../context/AppContext";
import AboutUs from "../assets/about_us1.jpg";
const About = () => {
  const { url, branches } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Team Members
  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/api/v1/get-team-member`, {
        credentials: "include", // If using cookies for authentication
      });
      const result = await response.json();

      if (response.ok) {
        setData(result.data || []); // Ensure setting only team member data
      } else {
        setError(result.message || "Failed to fetch team members");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-10">
        <div>
          <h2 className="text-3xl md:text-4xl text-center font-extrabold m-5 border-b-1">What we are</h2>
          <p className="mt-2 text-gray-600 ">
            Rastriya Youth Institute of Technology (RYIT) is an ISO-certified
            premier computer education center with esteemed academic
            collaborations, including The Neotia University, Admas University,
            JIS Group, Techno India University, Calcutta University of
            Technology, Seacom, OmDayal Group, and more.
            <br /><br /> We offer industry-relevant courses like CCA, DCA, ADOM, CDTP,
            DDTP, CFA, DIA, and many others.
            <br /><br /> Our students benefit from free communication language
            classes, fire typing training, lifetime support with a practice
            card, and expert educational guidance to excel in their careers.
            <br /><br /> With a strong focus on quality learning and professional
            growth, RYIT empowers students with the skills needed for a
            successful future in technology. 🚀
          </p>
        </div>
        <img
          className="rounded-xl shadow-md"
          src={AboutUs}
          alt="Our mission"
        />
      </section>
      <div className="p-6 md:p-12 bg-gray-100">
        <h3 className="text-3xl md:text-4xl text-center font-extrabold mb-26 md:mb-30">
          Our Team
        </h3>

        {/* Handle Loading & Error States */}
        {loading ? (
          <p className="text-center text-gray-500">Loading team members...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-6 gap-y-24 px-4 sm:px-6">
            {data.map((member) => (
              <div
                key={member._id}
                className="relative bg-white p-6 md:p-8 rounded-4xl shadow-lg flex flex-col items-center transition duration-300 cursor-pointer hover:shadow-2xl w-full sm:w-72 mx-auto min-h-[300px]"
              >
                {/* Profile Image - Positioned Half Outside the Card */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-38 h-38 rounded-full border-4 border-white shadow-lg"
                  />
                </div>

                {/* Content Section */}
                <div className="mt-14 text-center">
                  <h4 className="text-2xl md:text-[22px] font-bold">
                    {member.name}
                  </h4>
                  <p className="text-sm md:text-[16px] text-green-400 font-medium">
                    {member.designation}
                  </p>
                  <p className="text-justify text-[14px] md:text-[15px] m-2 leading-snug">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Our Institution */}
      <div className="p-6 md:p-12">
        <h3 className="text-center text-4xl font-extrabold text-gray-800 mb-10 leading-tight">
          Our Institution
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-24 px-4 sm:px-6 text-center">
          {branches.map((branch, index) => (
            <div
              className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden"
              key={index}
            >
              <img
                src={branch.image || "https://via.placeholder.com/300"}
                alt={branch.branch_name}
                className="w-full h-88 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-2xl text-gray-800 mb-2">
                  {branch.branch_name}
                </h3>
                <p className="text-gray-600">📍 {branch.branch_address}</p>
                <p className="text-gray-600">📞 {branch.mobile}</p>
                <p className="text-gray-600">✉️ {branch.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic and Industry Collaboration Section */}
      <div className="grid">
        <h3 className="grid text-4xl text-center font-extrabold text-gray-800 mb-10 leading-tight">
          Academic and Industry Collaboration
        </h3>
      </div>
      <div className="my-10">
        <AffiliatedLogo />
      </div>
    </>
  );
};

export default About;
