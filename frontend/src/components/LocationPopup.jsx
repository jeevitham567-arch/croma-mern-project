import { useState } from "react";
import "./LocationPopup.css";

const LocationPopup = ({ onClose }) => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  const detectLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const detectedPincode = data.address?.postcode || "";

          if (detectedPincode) {
            setPincode(detectedPincode);
          } else {
            alert("Pincode could not be detected.");
          }
        } catch (error) {
          console.error(error);
          alert("Unable to detect location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Please allow location access.");
        setLoading(false);
      }
    );
  };

  const handleContinue = () => {
    if (!pincode) {
      alert("Please enter or detect your pincode.");
      return;
    }

    localStorage.setItem("userPincode", pincode);
    onClose();
  };

  return (
    <div className="location-overlay">
      <div className="location-popup">

        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* Heading */}
        <h2>Select your Location</h2>

        <p className="location-subtitle">
          To Check Products & Delivery Options available at your location
        </p>

        {/* Current Location */}
        <button
          className="detect-btn"
          onClick={detectLocation}
          disabled={loading}
        >
          {loading
            ? "Detecting..."
            : "📍 Use my current location"}
        </button>

        {/* OR */}
        <div className="or-section">
          <span></span>
          <b>OR</b>
          <span></span>
        </div>

        {/* Sign In */}
        <button className="signin-address">
          Sign in to select address
        </button>

        {/* Pincode */}
        <div className="pincode-section">
          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            maxLength="6"
            onChange={(e) =>
              setPincode(e.target.value.replace(/\D/g, ""))
            }
          />
        </div>

        {/* Continue */}
        <button
          className="continue-btn"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>
    </div>
  );
};

export default LocationPopup;