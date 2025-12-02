import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import autoRepairImg from "../assets/auto_repair.png";
import mkuEntranceImg from "../assets/mku_entrance.png";

// Fix for default marker icon in Leaflet with Vite/Webpack
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const HomePage = () => {
  const navigate = useNavigate();
  const position: [number, number] = [52.041300, -0.755830]; // MKU University Bouverie House

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="glass-panel" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 2rem",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem",
        borderRadius: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "var(--primary-color)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}>M</div>
          <span style={{ fontWeight: "bold", fontSize: "1.25rem", color: "var(--text-primary)" }}>Maple Street Auto</span>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/staff/login")}
        >
          Staff Login
        </button>
      </header>

      {/* Hero Section */}
      <section style={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8rem 1rem 4rem",
        textAlign: "center",
        color: "white",
        overflow: "hidden"
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${autoRepairImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1
        }} />
        {/* Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: -1
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontSize: "4rem",
            marginBottom: "1.5rem",
            color: "white",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}>
            Premium Auto Care,<br />Simplified.
          </h1>
          <p style={{
            fontSize: "1.25rem",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem"
          }}>
            Experience hassle-free car maintenance with our expert mechanics.
            Book your appointment online in minutes.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
              className="btn btn-primary"
              style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
              onClick={() => navigate("/customer")}
            >
              Book Appointment
            </button>
            <button
              className="btn btn-outline"
              style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
              onClick={() => navigate("/customer/profile")}
            >
              Check Status
            </button>
          </div>
        </div>
      </section>

      {/* Features/Services Preview */}
      <section style={{ padding: "4rem 1rem", background: "white" }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: "3rem" }}>Why Choose Us</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            {[
              { title: "Expert Mechanics", desc: "Certified professionals with years of experience." },
              { title: "Transparent Pricing", desc: "No hidden fees. You approve every repair." },
              { title: "Quick Turnaround", desc: "We respect your time and get you back on the road fast." }
            ].map((feature, idx) => (
              <div key={idx} style={{
                padding: "2rem",
                borderRadius: "1rem",
                background: "var(--background-color)",
                border: "1px solid #e2e8f0",
                boxShadow: "var(--shadow-sm)"
              }}>
                <h3 style={{ marginBottom: "1rem", color: "var(--primary-color)" }}>{feature.title}</h3>
                <p style={{ color: "var(--text-secondary)" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: "4rem 1rem", background: "#f8fafc" }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: "2rem" }}>Visit Us</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "center"
          }}>
            <div style={{
              height: "400px",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)",
              border: "1px solid #e2e8f0"
            }}>
              <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    MKU University<br />
                    Bouverie House, 200 Silbury Blvd<br />
                    Milton Keynes MK9 1LT
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div>
              <img
                src={mkuEntranceImg}
                alt="MKU Entrance"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  boxShadow: "var(--shadow-md)"
                }}
              />
              <p className="text-center" style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
                Bouverie House, 200 Silbury Blvd, Milton Keynes MK9 1LT
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;