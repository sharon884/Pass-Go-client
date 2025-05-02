import { CalendarDays, Code, Car, Music, Trophy } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600">PASSGO</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              Events
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              Categories
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              How It Works
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md">
              Sign In
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                  Welcome to PASSGO – your ultimate ticket booking platform
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Discover and book tickets for the most exciting events happening around you.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md">
                    Explore Events
                  </button>
                  <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md">
                    Learn More
                  </button>
                </div>
              </div>
              {/* Right Image */}
              <div className="flex items-center justify-center">
                <img 
                  src="/images/hero-illustration.svg" 
                  alt="Hero Illustration" 
                  className="rounded-lg w-[350px] h-[350px] object-cover" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted by Brands */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xl font-medium text-gray-500 mb-8">
              Trusted by the world's leading brands
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
              {["Amazon", "Spotify", "Cisco", "Dropbox", "Microsoft"].map((brand, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="h-12 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 font-semibold">
                    {brand}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Categories */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Explore Top Categories
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto md:text-xl">
                Find the perfect event that matches your interests
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <CategoryCard icon={<Music className="h-8 w-8 text-indigo-600" />} title="Concerts & Musical Shows" />
              <CategoryCard icon={<Code className="h-8 w-8 text-indigo-600" />} title="Tech & Coding Events" />
              <CategoryCard icon={<Car className="h-8 w-8 text-indigo-600" />} title="Auto & Bike Shows" />
              <CategoryCard icon={<CalendarDays className="h-8 w-8 text-indigo-600" />} title="Cultural Events" />
              <CategoryCard icon={<Trophy className="h-8 w-8 text-indigo-600" />} title="Sports Events" />
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Events
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto md:text-xl">
                Don't miss out on these popular events
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <EventCard 
                title="Rock Jam Meetup"
                date="June 15, 2023"
                location="Central Park, New York"
                image="/images/rock-event.jpg"
              />
              <EventCard 
                title="Override PY Community Meetup"
                date="July 5, 2023"
                location="Tech Hub, San Francisco"
                image="/images/coding-event.jpg"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
// Components for Category and Event Cards
function CategoryCard({ icon, title }) {
  return (
    <div className="rounded-lg border bg-white p-6 flex flex-col items-center space-y-4 shadow-sm hover:shadow-md transition">
      {icon}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  );
}

function EventCard({ title, date, location, image }) {
  return (
    <div className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition">
      <img src={image} alt={title} className="w-full h-60 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
}
