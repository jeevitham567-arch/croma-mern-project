import "./Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "All",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  },
  {
    name: "Mobiles",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYIBta3fXAAqk7oFb50QatH9Fe9Pp-dbNT9fVgHDvjw&s=10",
  },
  {
    name: "Laptops",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx463tL8OOlv-mfmxnSqQeuXm531pQg8pAayPwo8Ejtw&s=10",
  },
  {
    name: "Television",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL4gI6eoK9SSnTb-rkN5DqfkPY7n0-hxVLo_i2b7Adsg&s=10",
  },
  {
    name: "Headphones",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwTmu-r5cokVg9T_epYAcEpoYMA_HGTgocGbc_n5VYA&s=10",
  },
  {
    name: "Smart Watch",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmB5UQsQatbMT5fjA_WG9Y1_qiK3gile7B9wnBzvzOBg&s=10",
  },
  {
    name: "Camera",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxAV8LKsB5csXBjNpX2oIIZ9NXFAqIEfxd72aIVLIe-g&s=10",
  },
];

function Categories({ selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      navigate("/");
    } else {
      navigate(`/category/${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="categories">
      <h2>Shop By Category</h2>

      <div className="category-container">
        {categories.map((item) => (
          <div
            key={item.name}
            className="category-card"
            onClick={() => handleCategoryClick(item.name)}
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