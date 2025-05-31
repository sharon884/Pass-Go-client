import React from "react";
import Navbar from "../../components/generalComponents/Navbar";
import Footer from "../../components/generalComponents/Footer";
import SideBar from "../../components/generalComponents/SideBar";
import BookingsComponent from "../../components/UserComponents/Bookings/BookingsComponent";

const UserBookingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white px-4 py-2">
        <Navbar />
      </header>
      <main className="flex flex-1 bg-white">
        <aside>
          <SideBar />
        </aside>
        <div className="flex-1 p-4">
          <BookingsComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserBookingsPage;
