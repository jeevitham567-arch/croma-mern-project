import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">
        <h1>Electronics For Every Home</h1>

        <p>
          Shop the latest Mobiles, Laptops, TVs, Smart Watches,
          Headphones and Home Appliances at the best prices.
        </p>

        <button>Shop Now</button>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
          alt="Mobile"
        />

        <img
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
          alt="Laptop"
        />

        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
          alt="Headphone"
        />
      </div>

    </section>
  );
}

export default Hero;