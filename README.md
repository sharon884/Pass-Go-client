# Pass-Go - Digital Event Ticketing Platform (Frontend)

This is the **frontend** client application for **Pass-Go**, a digital event ticket selling platform designed to help small event organizers grow their events digitally.

Built with **React.js** as part of a full MERN stack app, Pass-Go enables users to:

- **Switch roles** easily between Host and User.  
- **Hosts** can create, manage, and verify their events with PAN card verification to prevent scams.  
- Hosts pay a **low advance payment** and enjoy **low platform commission fees** to support small organizers.  
- **Users** can browse events with **real-time ticket booking and seat selection**.  
- Seamless **payment integration** for ticket purchases.  
- Real-time **notifications** for both hosts and users regarding booking updates, cancellations, or event changes.  

## Features

- Role-based UI for Hosts and Users  
- PAN card verification for Hosts to ensure event authenticity  
- Low advance payment system for Hosts to secure event listing  
- Low platform commission fees for Hosts  
- Real-time seat selection and ticket booking updates for Users  
- Integrated payment gateway for secure transactions  
- Real-time notifications via Socket.IO  
- Responsive design for desktop and mobile devices  

## Tech Stack

- React.js  
- Redux 
- React Router  
- Socket.IO (real-time communication)  
- Tailwind CSS / CSS modules / Shadcn UI (component library)  
- Payment gateway integration (e.g. Razorpay)  
- Redis (for caching and real-time seat locking)  
- Cloudinary (for image and media management)

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)  
- npm or yarn  

### Installation

```bash
git clone <frontend-repo-url>
cd frontend
npm install
