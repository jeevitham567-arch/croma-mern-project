import { useState, useEffect } from "react";
import "./LocationPopup.css";

const LocationPopup = ({ onClose }) => {
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    const savedPincode = localStorage.getItem("userPincode");

    if (savedLocation) {
      setLocation(savedLocation);
    }

    if (savedPincode) {
      setPincode(savedPincode);
    }
  }, []);

  const detectLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to get address");
          }

          const data = await response.json();

          const address = data.display_name
            ? data.display_name
            : `${latitude}, ${longitude}`;

          const detectedPincode =
            data.address?.postcode || "";

          setLocation(address);
          setPincode(detectedPincode);
        } catch (error) {
          console.error("Location error:", error);

          setLocation(`${latitude}, ${longitude}`);
        }

        setLoading(false);
      },

      (error) => {
        console.error("Geolocation error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location permission denied. Please allow location access in your browser."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert("Unable to detect your location.");
        } else if (error.code === error.TIMEOUT) {
          alert("Location request timed out. Please try again.");
        } else {
          alert("Unable to get your location.");
        }

        setLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;

    // Only numbers and maximum 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
    }
  };

  const handleContinue = () => {
    const trimmedLocation = location.trim();
    const trimmedPincode = pincode.trim();

    if (!trimmedLocation) {
      alert("Please enter your location.");
      return;
    }

    if (!trimmedPincode) {
      alert("Please enter your pincode.");
      return;
    }

    if (trimmedPincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    localStorage.setItem("userLocation", trimmedLocation);
    localStorage.setItem("userPincode", trimmedPincode);

    onClose();
  };

  return (
    <div className="location-overlay">
      <div className="location-popup">

        {/* Close */}
        <button
          className="location-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* Location Icon */}
        <div className="location-icon">
          
        </div>

        {/* Heading */}
        <h2>Select your location</h2>

        <p className="location-subtitle">
          Enter your location to check product availability
          and delivery options.
        </p>

        {/* Current Location */}
        <button
          className="detect-location-btn"
          onClick={detectLocation}
          disabled={loading}
        >
           {" "}
          {loading
            ? "Detecting your location..."
            : "Use my current location"}
        </button>

        {/* Divider */}
        <div className="location-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        {/* Location Input */}
        <div className="location-input-wrapper">
          <span className="input-location-icon">
          
          </span>

          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Pincode */}
        <div className="location-input-wrapper pincode-wrapper">
          <span className="input-location-icon">
            
          </span>

          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={handlePincodeChange}
          />
        </div>

        {/* Selected Location */}
        {location.trim() && (
          <div className="selected-location">
            <span></span>

            <div>
              <small>Selected location</small>
              <p>{location}</p>

              {pincode && (
                <p className="selected-pincode">
                  Pincode: {pincode}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Continue */}
        <button
          type="button"
          className="continue-location-btn"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>
    </div>
  );
};

export default LocationPopup;