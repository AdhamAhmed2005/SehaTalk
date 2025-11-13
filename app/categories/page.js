import { Card, CardContent } from "../../components/ui/card.jsx";

export const metadata = {
  title: "Categories – SehaTalk",
  description: "Browse health questions by medical specialty and category on SehaTalk.",
};

const categories = [
  {
    name: "General Health",
    description: "Common health questions, wellness advice, and preventive care guidance",
    icon: "🏥",
    count: 1250,
    trending: true,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Cardiology",
    description: "Heart health, cardiovascular conditions, and blood pressure management",
    icon: "❤️",
    count: 420,
    trending: false,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Dermatology",
    description: "Skin conditions, hair problems, nail health, and cosmetic concerns",
    icon: "🧴",
    count: 380,
    trending: true,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    name: "Pediatrics",
    description: "Children's health, growth development, and parenting health concerns",
    icon: "👶",
    count: 560,
    trending: false,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Psychology",
    description: "Mental health support, anxiety management, and emotional wellness",
    icon: "🧠",
    count: 340,
    trending: true,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Nutrition",
    description: "Dietary advice, meal planning, weight management, and healthy eating",
    icon: "🥗",
    count: 290,
    trending: false,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Orthopedics",
    description: "Bone health, joint pain, muscle injuries, and mobility concerns",
    icon: "🦴",
    count: 310,
    trending: false,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    name: "Women's Health",
    description: "Female reproductive health, pregnancy, and women's wellness",
    icon: "👩‍⚕️",
    count: 270,
    trending: true,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
  },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-bg pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Medical Specialties</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-blue-900">
            Health <span className="section-header">Categories</span>
          </h1>
          <p className="text-xl text-blue-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Explore health questions organized by medical specialties. 
            Find expert answers from verified Egyptian doctors in your area of interest.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-blue-600">Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3,820</div>
              <div className="text-sm text-blue-600">Total Questions</div>
            </div>
            <div className="text-center md:col-span-1 col-span-2">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-blue-600">Expert Doctors</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 pb-12 relative z-10">
        {/* Featured Categories */}
        <div className="mb-12">
          <div className="medical-card border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-linear-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-primary/10">
              <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Trending Categories
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.filter(cat => cat.trending).map((category) => (
                  <div key={category.name} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium text-blue-900">{category.name}</div>
                    <div className="text-xs text-blue-600">{category.count} questions</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Categories Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">All Medical Specialties</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="medical-card hover:shadow-xl transition-all duration-300 border-0 cursor-pointer group hover:scale-105 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className={`${category.bgColor} p-6 text-center relative overflow-hidden`}>
                  {category.trending && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                      Trending
                    </div>
                  )}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-blue-700 mb-4 leading-relaxed text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-blue-600 font-medium">
                      {category.count.toLocaleString()} questions
                    </div>
                    <div className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Explore →
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="medical-card border-0 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Can't Find Your Category?</h3>
            <p className="text-blue-600 mb-6 max-w-2xl mx-auto">
              Our medical experts cover a wide range of specialties. Ask your question and get connected with the right doctor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
                Ask a Question
              </button>
              <button className="btn-secondary px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105">
                Browse All Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}