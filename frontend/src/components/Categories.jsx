import "./Categories.css";

const categories = [
  {
    name: "All",
    image: "https://cdn-icons-png.flaticon.com/512/833/833314.png",
  },
  {
    name: "Mobiles",
    image: "https://cdn-icons-png.flaticon.com/512/545/545245.png",
  },
  {
    name: "Laptops",
    image: "https://cdn-icons-png.flaticon.com/512/179/179386.png",
  },
  {
    name: "Television",
    image: "https://cdn-icons-png.flaticon.com/512/1048/1048941.png",
  },
  {
    name: "Headphones",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  },
  {
    name: "Smart Watch",
    image: "https://cdn-icons-png.flaticon.com/512/3079/3079165.png",
  },
  {
    name: "Camera",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
  },
];

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="categories">
      <h2>Shop By Category</h2>

      <div className="category-container">
        {categories.map((item, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => setSelectedCategory(item.name)}
            style={{
              cursor: "pointer",
              border:
                selectedCategory === item.name
                  ? "2px solid #00bcd4"
                  : "1px solid #ddd",
            }}
          >
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;