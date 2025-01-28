import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food App</h1>
        <div className="input-wrapper">
          <input
            className="select-input"
            type="text"
            placeholder="Select Place"
          />
          <input
            className="search-input"
            type="text"
            placeholder="Enter Food or Restaurant"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
