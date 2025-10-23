import React, { useState, useEffect } from "react";
import "./index.css";

// --- Your local images ---
import bg1 from "./bg-image-1.jpg";
import bg2 from "./bg-image-2.jpg";
import bg3 from "./bg-image-3.jpg";
import bg4 from "./bg-image-4.jpg";
import bg5 from "./bg-image-5.jpg";
import bg6 from "./bg-image-6.jpg";
import bg7 from "./bg-image-7.jpg";
// import bg8 from "./bg-image-8.jpg";
// import bg9 from "./bg-image-9.jpg";
// import bg10 from "./bg-image-10.jpg";
// import bg11 from "./bg-image-11.jpg";
// import bg12 from "./bg-image-12.jpg";
import ganesha from "./ganesha.png";
import couple from "./bride-groom-main.jpg";

// --- Collage Images ---
const allCollageImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

// Split into left and right collage halves
const midPoint = Math.ceil(allCollageImages.length / 2);
const leftImages = allCollageImages.slice(0, midPoint);
const rightImages = allCollageImages.slice(midPoint);

export default function Home() {
  const engagementDate = "2025-11-07T00:00:00";

  // --- RESPONSIVE STATE ---
  // Check if the screen is mobile-sized (<= 992px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    // Update the isMobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- COUNTDOWN LOGIC (Unchanged) ---
  const calculateTimeLeft = () => {
    const difference = +new Date(engagementDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- DYNAMIC STYLES ---

  const pageLayout = {
    // Use 'block' for mobile (stacks elements)
    // Use 'grid' for desktop (3-column layout)
    display: isMobile ? "block" : "grid",
    gridTemplateColumns: "1fr auto 1fr", // Only applies to desktop
    alignItems: "start",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#fdfaf6",
    overflowX: "hidden",
  };

  const centerContent = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    // Use smaller padding on mobile
    padding: isMobile ? "1.5rem 0.5rem" : "3rem 1rem",
    zIndex: 10,
  };

  const collageContainer = {
    // Use 'relative' on mobile, 'sticky' on desktop
    position: isMobile ? "relative" : "sticky",
    top: 0,
    // Use 'auto' height on mobile, '100vh' on desktop
    height: isMobile ? "auto" : "100vh",
    overflowY: "auto",
    padding: "1rem",
    display: "grid",
    // Use a simple 2-column grid on mobile
    // Use the auto-fit masonry grid on desktop
    gridTemplateColumns: isMobile
      ? "repeat(2, 1fr)"
      : "repeat(auto-fit, minmax(120px, 2fr))",
    // Use shorter rows on mobile
    gridAutoRows: isMobile ? "120px" : "190px",
    gap: "10px",
    opacity: 0.65,
  };

  const collageImageBase = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const getCollageImageStyle = (index) => {
    const style = { ...collageImageBase };

    // If mobile, return the simple base style and skip masonry logic
    if (isMobile) {
      return style;
    }

    // Desktop-only masonry logic
    if (index % 5 === 1) {
      style.gridRow = "span 2";
    }
    if (index % 7 === 3) {
      style.gridColumn = "span 2";
      style.gridRow = "span 1";
    }
    if (index % 6 === 4) {
      style.gridRow = "span 2";
      style.gridColumn = "span 2";
    }
    return style;
  };

  return (
    <>
      {/* --- Global Styles --- */}
      {/* The responsive media query is no longer needed 
          as all styles are handled dynamically by the 'isMobile' state */}
      <style>
        {`
          .collage-img:hover {
            transform: scale(1.03);
            box-shadow: 0 6px 15px rgba(0,0,0,0.15);
            z-index: 5;
          }
          
          .main-card-container {
              width: 100%;
              max-width: 720px;
              min-width: 320px;
          }
        `}
      </style>

      {/* --- MAIN LAYOUT (Dynamic) --- */}
      <div style={pageLayout} className="page-layout">
        {/* --- LEFT COLLAGE --- */}
        {/* This is always visible, stacks on top on mobile */}
        <div style={collageContainer} className="collage-container">
          {leftImages.map((img, index) => (
            <img
              key={`left-${index}`}
              src={img}
              alt={`Collage left ${index}`}
              style={getCollageImageStyle(index)}
              className="collage-img"
            />
          ))}
        </div>

        {/* --- MAIN CARD CONTENT --- */}
        <div style={centerContent} className="center-content page-background">
          <div className="col-11 col-md-10 col-lg-10 col-xl-8 main-card-container">
            <div
              // Add 'font-serif' class to set the base font
              className="card shadow-lg border-0 text-center p-4 p-md-5 rounded-4 font-serif"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderColor: "rgba(0, 0, 0, 0.05)", // A softer border
              }}
            >
              <img
                src={ganesha}
                alt="Lord Ganesha"
                className="d-block mx-auto mb-2"
                style={{ width: "70px", borderRadius: "8px" }}
              />
              <p className="text-muted mb-4">श्रीगणेशाय नमः</p>

              <img
                src={couple}
                alt="Shivam & Simran"
                className="img-fluid rounded shadow-sm object-fit-cover"
                style={{
                  maxHeight: "350px",
                  width: "100%",
                  borderRadius: "12px",
                }}
              />

              {/* Use script font for invitation line */}
              <p className="fs-4 mt-4 text-secondary font-script">
                You are cordially invited to the
              </p>

              {/* Use script font and new color for main heading */}
              <h1
                className="fw-bold mt-2 font-script text-wedding-pink"
                style={{ fontSize: "3rem" }}
              >
                Ring Ceremony of <br /> Shivam & Simran
              </h1>

              {/* Countdown Timer with updated classes */}
              <div className="d-flex justify-content-center flex-wrap gap-3 my-4">
                {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
                  <div
                    key={label}
                    className="text-center mx-2"
                    style={{ minWidth: "60px" }}
                  >
                    <h3 className="mb-0 countdown-number">
                      {Object.values(timeLeft)[index]}
                    </h3>
                    <span className="text-muted small text-uppercase">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Use the new decorative HR class */}
              <hr className="decorative-hr my-4" />

              {/* Use a more readable, emphasized text color */}
              <p className="fs-6 text-dark-emphasis lh-lg mb-3">
                Mr. Ajeet Bansal & Mrs. Neha Bansal <br />
                Cordially request the honour of your presence and blessings on
                the auspicious occasion of the
              </p>

              <h2 className="h3 mt-3 text-dark-emphasis fw-bold">
                Ring Ceremony
              </h2>

              <p className="fs-6 text-dark-emphasis mt-3 mb-1">of their son</p>
              {/* Use script font and new color for names */}
              <h2
                className="h3 mb-1 text-wedding-pink font-script"
                style={{ fontSize: "2.5rem" }}
              >
                Shivam
              </h2>
              <p className="fs-6 text-dark-emphasis my-2">with</p>
              <h2
                className="h3 text-wedding-pink font-script"
                style={{ fontSize: "2.5rem" }}
              >
                Simran
              </h2>
              <p className="fs-6 text-dark-emphasis mt-2 lh-lg">
                Daughter of Mr. Mithlesh Jaiswal & Mrs. Seema Jaiswal
              </p>

              {/* Date (kept gold for accent) */}
              <h3
                className="fw-bold mt-4"
                style={{ color: "#B8860B", letterSpacing: "1px" }} // A slightly softer gold
              >
                7th November 2025
              </h3>

              {/* Venue */}
              <div className="mt-4">
                <h4 className="h5 fw-semibold text-dark-emphasis">Venue</h4>
                <p className="fs-6 text-secondary mt-2">
                  The Grand Ballroom, Celebration Palace <br />
                  123 Wedding Avenue, City, State - 123456
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Celebration+Palace,+123+Wedding+Avenue" // Use a real query
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary btn-sm mt-2 px-3" // Softer button
                >
                  Open in Google Maps
                </a>
              </div>

              {/* Use script font for the closing quote */}
              <p className="text-muted fst-italic mt-5 font-script fs-5">
                “Join us as we begin our forever surrounded by love and
                blessings.”
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLLAGE --- */}
        {/* This is now conditional: ONLY renders if NOT mobile */}
        {!isMobile && (
          <div style={collageContainer} className="collage-container">
            {rightImages.map((img, index) => (
              <img
                key={`right-${index}`}
                src={img}
                alt={`Collage right ${index}`}
                style={getCollageImageStyle(index)}
                className="collage-img"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
