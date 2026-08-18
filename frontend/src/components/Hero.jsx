import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero({ productsRef }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Big Savings on Mobiles",
      subtitle: "Discover the latest smartphones at amazing prices",
      offer: "UP TO 70% OFF",
      button: "Shop Mobiles",
      category: "Mobiles",
      icon: "📱",
    },
    {
      title: "Upgrade Your Entertainment",
      subtitle: "Smart TVs and entertainment products at great prices",
      offer: "EXCITING OFFERS",
      button: "Shop Televisions",
      category: "Television",
      icon: "📺",
    },
    {
      title: "Power Up Your Work Setup",
      subtitle: "Laptops and accessories for work and study",
      offer: "BEST DEALS",
      button: "Shop Laptops",
      category: "Laptops",
      icon: "💻",
    },
    {
      title: "Experience Better Sound",
      subtitle: "Premium headphones for music and entertainment",
      offer: "SPECIAL OFFERS",
      button: "Shop Headphones",
      category: "Headphones",
      icon: "🎧",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const handleShopNow = () => {
    navigate(
      `/category/${encodeURIComponent(
        slides[currentSlide].category
      )}`
    );
  };

  const handleBannerClick = () => {
    handleShopNow();
  };

  const slide = slides[currentSlide];

  return (
    <section
      style={{
        width: "100%",
        background: "#fff",
        paddingBottom: "25px",
      }}
    >
      <div
        onClick={handleBannerClick}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "430px",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #111 0%, #252525 55%, #00b8b8 100%)",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {/* LEFT CONTENT */}

        <div
          style={{
            width: "55%",
            padding: "50px 7%",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#00c8c8",
              color: "#111",
              padding: "8px 18px",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {slide.offer}
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 58px)",
              lineHeight: "1.05",
              margin: "0 0 18px",
              fontWeight: "800",
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#ddd",
              marginBottom: "28px",
              maxWidth: "500px",
            }}
          >
            {slide.subtitle}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShopNow();
            }}
            style={{
              padding: "14px 30px",
              border: "none",
              borderRadius: "4px",
              background: "#fff",
              color: "#111",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {slide.button} →
          </button>
        </div>

        {/* RIGHT VISUAL */}

        <div
          style={{
            position: "absolute",
            right: "7%",
            width: "38%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "150px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            {slide.icon}
          </div>
        </div>

        {/* PREVIOUS */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            previousSlide();
          }}
          aria-label="Previous banner"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "none",
            background: "#fff",
            color: "#111",
            fontSize: "28px",
            cursor: "pointer",
            zIndex: 5,
          }}
        >
          ‹
        </button>

        {/* NEXT */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next banner"
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "none",
            background: "#fff",
            color: "#111",
            fontSize: "28px",
            cursor: "pointer",
            zIndex: 5,
          }}
        >
          ›
        </button>

        {/* DOTS */}

        <div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 5,
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              aria-label={`Go to banner ${index + 1}`}
              style={{
                width:
                  currentSlide === index
                    ? "28px"
                    : "9px",
                height: "9px",
                borderRadius: "10px",
                border: "none",
                background:
                  currentSlide === index
                    ? "#00c8c8"
                    : "#fff",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* BENEFITS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          padding: "20px 5%",
          background: "#fff",
        }}
      >
        <div style={benefitStyle}>
          <span style={benefitIcon}>🚚</span>
          <div>
            <b>Free Delivery</b>
            <small>On selected products</small>
          </div>
        </div>

        <div style={benefitStyle}>
          <span style={benefitIcon}>💳</span>
          <div>
            <b>Easy Payments</b>
            <small>Secure checkout</small>
          </div>
        </div>

        <div style={benefitStyle}>
          <span style={benefitIcon}>🔄</span>
          <div>
            <b>Easy Returns</b>
            <small>Hassle-free returns</small>
          </div>
        </div>

        <div style={benefitStyle}>
          <span style={benefitIcon}>🛡️</span>
          <div>
            <b>Secure Shopping</b>
            <small>Safe & trusted</small>
          </div>
        </div>
      </div>
    </section>
  );
}

const benefitStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "15px",
  border: "1px solid #eee",
  borderRadius: "8px",
  background: "#fff",
};

const benefitIcon = {
  fontSize: "28px",
};

export default Hero;
