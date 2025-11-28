export const doctorsData = [
  { id: 1, name: "Fahd Al-Harbi", specialty: "Cardiologist", experience: 8, rating: 4 },
  { id: 2, name: "Mazen Saeed", specialty: "Orthopedist", experience: 5, rating: 4 },
  { id: 3, name: "Hind Al-Ketbi", specialty: "Psychologist", experience: 6, rating: 5 },
  { id: 4, name: "Naglaa Sharaf", specialty: "Pediatrician", experience: 10, rating: 5 },
  { id: 5, name: "Ali Tawfik", specialty: "Neurologist", experience: 9, rating: 5 },
  { id: 6, name: "Reem Abdullah", specialty: "Pediatrician", experience: 4, rating: 4 },
  { id: 7, name: "Sara Al-Mutairi", specialty: "Dermatologist", experience: 3, rating: 4 },
  { id: 8, name: "Omar Khaled", specialty: "Cardiologist", experience: 6, rating: 5 },
  { id: 9, name: "Laila Hassan", specialty: "Gynecologist", experience: 10, rating: 5 },
  { id: 10, name: "Khalid Mansour", specialty: "Orthopedist", experience: 5, rating: 4 },
  { id: 11, name: "Mona Farouk", specialty: "Psychologist", experience: 6, rating: 5 },
  { id: 12, name: "Youssef Adel", specialty: "Neurologist", experience: 7, rating: 4 },
  { id: 13, name: "Abeer Nabil", specialty: "Pediatrician", experience: 4, rating: 4 },
  { id: 14, name: "Tamer Fathy", specialty: "Internist", experience: 3, rating: 3 },
  { id: 15, name: "Nada Samir", specialty: "Ophthalmologist", experience: 5, rating: 4 },
  { id: 16, name: "Mahmoud Hany", specialty: "Urologist", experience: 6, rating: 5 },
  { id: 17, name: "Hala Sobhy", specialty: "Dermatologist", experience: 4, rating: 4 },
  { id: 18, name: "Adel Rashid", specialty: "Cardiologist", experience: 7, rating: 4 },
  { id: 19, name: "Dina Kamal", specialty: "Gynecologist", experience: 8, rating: 5 },
  { id: 20, name: "Samiha Youssef", specialty: "Pediatrician", experience: 5, rating: 4 },
  { id: 21, name: "Faris Saleh", specialty: "Orthopedist", experience: 6, rating: 5 },
  { id: 22, name: "Rania Saad", specialty: "Psychologist", experience: 4, rating: 4 },
  { id: 23, name: "Othman Zaki", specialty: "Neurologist", experience: 7, rating: 5 },
  { id: 24, name: "Huda Al-Hassan", specialty: "Ophthalmologist", experience: 5, rating: 4 },
  { id: 25, name: "Mohamed Samir", specialty: "Internist", experience: 3, rating: 3 },
  { id: 26, name: "Salma Fathi", specialty: "Dermatologist", experience: 4, rating: 4 },
  { id: 27, name: "Khaled Nasser", specialty: "Urologist", experience: 6, rating: 5 },
  { id: 28, name: "Ramy Hossam", specialty: "Cardiologist", experience: 8, rating: 4 },
  { id: 29, name: "Amira Adel", specialty: "Gynecologist", experience: 7, rating: 5 },
  { id: 30, name: "Wael Fouad", specialty: "Orthopedist", experience: 5, rating: 4 },
  { id: 31, name: "Hanan Kamal", specialty: "Psychologist", experience: 6, rating: 5 },
  { id: 32, name: "Ibrahim Maher", specialty: "Neurologist", experience: 7, rating: 4 },
  { id: 33, name: "Lamiaa Saeed", specialty: "Pediatrician", experience: 4, rating: 4 },
];

export const getSpecialties = () => {
  return ["All", ...new Set(doctorsData.map(doc => doc.specialty))];
};

export const filterDoctors = (doctors, searchName = "", specialty = "All") => {
  return doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (specialty === "All" || doc.specialty === specialty)
  );
};

export const getRatingStars = (rating) => {
  const fullStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return fullStars + emptyStars;
};
