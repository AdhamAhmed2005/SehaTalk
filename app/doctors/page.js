'use client';
import React, { useState } from "react";

export default function Doctors(){
 const doctors = [
    { name: "Fahd Al-Harbi", specialty: "Cardiologist", Experience: "8 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Mazen Saeed", specialty: "Orthopedist", Experience: "5 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Hind Al-Ketbi", specialty: "Psychologist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Naglaa Sharaf", specialty: "Pediatrician", Experience: "10 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Ali Tawfik", specialty: "Neurologist", Experience: "9 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Reem Abdullah", specialty: "Pediatrician", Experience: "4 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Sara Al-Mutairi", specialty: "Dermatologist", Experience: "3 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Omar Khaled", specialty: "Cardiologist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Laila Hassan", specialty: "Gynecologist", Experience: "10 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Khalid Mansour", specialty: "Orthopedist", Experience: "5 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Mona Farouk", specialty: "Psychologist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Youssef Adel", specialty: "Neurologist", Experience: "7 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Abeer Nabil", specialty: "Pediatrician", Experience: "4 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Tamer Fathy", specialty: "Internist", Experience: "3 years", Rating: "★ ★ ★ ☆ ☆" },
    { name: "Nada Samir", specialty: "Ophthalmologist", Experience: "5 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Mahmoud Hany", specialty: "Urologist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Hala Sobhy", specialty: "Dermatologist", Experience: "4 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Adel Rashid", specialty: "Cardiologist", Experience: "7 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Dina Kamal", specialty: "Gynecologist", Experience: "8 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Samiha Youssef", specialty: "Pediatrician", Experience: "5 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Faris Saleh", specialty: "Orthopedist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Rania Saad", specialty: "Psychologist", Experience: "4 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Othman Zaki", specialty: "Neurologist", Experience: "7 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Huda Al-Hassan", specialty: "Ophthalmologist", Experience: "5 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Mohamed Samir", specialty: "Internist", Experience: "3 years", Rating: "★ ★ ★ ☆ ☆" },
    { name: "Salma Fathi", specialty: "Dermatologist", Experience: "4 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Khaled Nasser", specialty: "Urologist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Ramy Hossam", specialty: "Cardiologist", Experience: "8 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Amira Adel", specialty: "Gynecologist", Experience: "7 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Wael Fouad", specialty: "Orthopedist", Experience: "5 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Hanan Kamal", specialty: "Psychologist", Experience: "6 years", Rating: "★ ★ ★ ★ ★" },
    { name: "Ibrahim Maher", specialty: "Neurologist", Experience: "7 years", Rating: "★ ★ ★ ★ ☆" },
    { name: "Lamiaa Saeed", specialty: "Pediatrician", Experience: "4 years", Rating: "★ ★ ★ ★ ☆" },
  
  ];

  const [searchName, setSearchName] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = ["All", ...new Set(doctors.map(doc => doc.specialty))];

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (selectedSpecialty === "All" || doc.specialty === selectedSpecialty)
  );

  return(
    <>
    
    <div className="w-full min-h-screen bg-gray-50 p-6">

      {/* Search */}
      <input
        type="text"
        placeholder="Search doctor by name"
        className="w-full p-4 rounded-2xl shadow bg-white outline-none mb-4 mt-18"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      

      {/* Specialty Filters */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {specialties.map((spec, index) => (
          <button
            key={index}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition
              ${selectedSpecialty === spec ? "bg-blue-600 text-white" : "bg-white shadow text-gray-600"}`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
        {filteredDoctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue">
                DR
              </div>

              <div>
                <h2 className="text-xl font-semibold">{doc.name}</h2>
                <p className="text-blue-600 font-medium">{doc.specialty}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-yellow-500 text-lg">{doc.Rating}</p>
              <p className="text-gray-500 ">{doc.Experience}</p>
            </div>

            <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        ))}

        {filteredDoctors.length == 0 && (
          <p className="text-center text-gray-500 col-span-full">No doctors found</p>
        )}
      </div>
    </div>
    
    </>
  )
}