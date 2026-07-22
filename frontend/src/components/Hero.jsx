import banner1 from "../assets/banner1.jpg";

function Hero({ productsRef }) {
  const handleClick = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        marginBottom: "30px",
        cursor: "pointer",
      }}
    >
      <img
        src={banner1}
        alt="Banner"
        style={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

export default Hero;