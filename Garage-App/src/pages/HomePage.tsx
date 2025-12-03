import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Images
import heroImg from "../assets/hero_maple_street.png";
import oilImg from "../assets/service_oil_change.png";
import brakesImg from "../assets/service_brakes.png";
import tiresImg from "../assets/service_tires.png";
import engineImg from "../assets/service_engine.png";
import suspensionImg from "../assets/service_suspension.png";
import batteryImg from "../assets/service_battery.png";
import awardImg from "../assets/award_winning.png";

// Fix for default marker icon in React Leaflet
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

  const services = [
    {
      title: "Oil Change",
      img: oilImg,
      desc: "Premium synthetic and conventional oil changes.",
    },
    {
      title: "Brake Service",
      img: brakesImg,
      desc: "Expert brake inspections and replacements.",
    },
    {
      title: "Tire Rotation",
      img: tiresImg,
      desc: "Extend the life of your tires with regular rotation.",
    },
    {
      title: "Engine Diagnostics",
      img: engineImg,
      desc: "Advanced computer diagnostics for all makes.",
    },
    {
      title: "Suspension",
      img: suspensionImg,
      desc: "Smooth out your ride with suspension repairs.",
    },
    {
      title: "Battery Service",
      img: batteryImg,
      desc: "Testing and replacement of car batteries.",
    },
  ];

  return (
    <div className="page-container" style={{ padding: 0, maxWidth: "100%" }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.6,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "2rem",
            maxWidth: "800px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: "1rem",
            backdropFilter: "blur(5px)",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
              textShadow: "0 4px 6px rgba(0,0,0,0.5)",
              color: "white",
            }}
          >
            Expert Care for <br />{" "}
            <span style={{ color: "var(--accent-color)" }}>Your Vehicle</span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2.5rem",
              color: "#e2e8f0",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
            }}
          >
            Professional auto repair and maintenance services you can trust.
            Book your appointment online today.
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <button
              className="btn btn-primary"
              style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}
              onClick={() => navigate("/customer")}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        id="services"
        style={{ padding: "5rem 2rem", background: "#f8fafc" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              Our Services
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Comprehensive maintenance and repair solutions.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {services.map((s, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: "0",
                    textAlign: "center",
                    transition: "transform 0.2s",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div
                    style={{
                      height: "200px",
                      background: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3
                      style={{
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "5rem 2rem", background: "white" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              Why Choose Us?
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  title: "Certified Mechanics",
                  desc: "Our team consists of ASE certified professionals.",
                },
                {
                  title: "Transparent Pricing",
                  desc: "No hidden fees. We provide upfront estimates.",
                },
                {
                  title: "Quality Parts",
                  desc: "We use only high-quality OEM or equivalent parts.",
                },
                {
                  title: "Fast Turnaround",
                  desc: "We respect your time and aim for quick service.",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem" }}>
                  <div
                    style={{
                      color: "var(--success-color)",
                      fontSize: "1.25rem",
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <h4 style={{ marginBottom: "0.25rem" }}>{item.title}</h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              height: "400px",
              background: "#f1f5f9",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={awardImg}
              alt="Award Winning Service"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Visit Us (Map Only) */}
      <section style={{ padding: "5rem 2rem", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              Visit Us
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Conveniently located at MKU Boulevard, Milton Keynes.
            </p>
          </div>

          <div
            style={{
              height: "450px",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              border: "4px solid white",
            }}
          >
            <MapContainer
              center={[52.041, -0.758]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[52.041, -0.758]}>
                <Popup>
                  Maple Street Auto Repairs <br /> MKU Boulevard, Milton Keynes
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#1e293b",
          color: "white",
          padding: "4rem 2rem 2rem",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand */}
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                Maple Street Auto
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                Your trusted partner for all automotive needs. Quality service,
                every time.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                Contact Us
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "#94a3b8",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <li>📍 MKU Boulevard, Milton Keynes</li>
                <li>📞 +44 7466 555 555</li>
                <li>✉️ info@maplestreetauto.com</li>
                <li>⏰ Mon-Fri: 8am - 6pm</li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                Quick Links
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <li>
                  <a
                    href="#"
                    style={{ color: "#94a3b8", textDecoration: "none" }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{ color: "#94a3b8", textDecoration: "none" }}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/staff/login"
                    style={{ color: "#94a3b8", textDecoration: "none" }}
                  >
                    Staff Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #334155",
              paddingTop: "2rem",
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.9rem",
            }}
          >
            &copy; {new Date().getFullYear()} Maple Street Auto Repairs. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
