import { useState } from "react";

function SearchBar({ products, setFilteredProducts }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <input
        type="text"
        placeholder="Search for Products..."
        value={search}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "14px 20px",
          borderRadius: "30px",
          border: "1px solid #ddd",
          outline: "none",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default SearchBar;