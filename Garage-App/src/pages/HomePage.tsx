import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { initScrollAnimations } from "../hooks/useScrollAnimation";

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

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const HomePage = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  // Initialize scroll animations
  useEffect(() => {
    const cleanup = initScrollAnimations(pageRef);
    return cleanup;
  }, []);

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
    <div ref={pageRef} className="page-container" style={{ padding: 0, maxWidth: "100%" }}>
      {/* Hero Section - Full viewport, Apple-style */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(180deg, #1d1d1f 0%, #000000 100%)",
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
            opacity: 0.5,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "3rem",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: "700",
              marginBottom: "1.5rem",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "white",
            }}
          >
            Expert Care for{" "}
            <span style={{
              background: "linear-gradient(135deg, #0071e3 0%, #40a9ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Your Vehicle
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.375rem)",
              marginBottom: "3rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "600px",
              margin: "0 auto 3rem",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Professional auto repair and maintenance services you can trust.
            Book your appointment online today.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn-primary"
              style={{
                padding: "1.125rem 2.5rem",
                fontSize: "1.125rem",
                fontWeight: 500,
              }}
              onClick={() => navigate("/customer")}
            >
              Book an appointment
            </button>
            <a
              href="#services"
              className="btn btn-outline"
              style={{
                padding: "1.125rem 2.5rem",
                fontSize: "1.125rem",
                fontWeight: 500,
              }}
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
          }}
        >
          <div style={{
            width: "28px",
            height: "48px",
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: "14px",
            position: "relative",
          }}>
            <div style={{
              width: "4px",
              height: "8px",
              background: "rgba(255,255,255,0.6)",
              borderRadius: "2px",
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "scrollDown 2s infinite",
            }} />
          </div>
        </div>
        <style>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-8px); }
            60% { transform: translateX(-50%) translateY(-4px); }
          }
          @keyframes scrollDown {
            0% { opacity: 1; top: 8px; }
            100% { opacity: 0; top: 24px; }
          }
        `}</style>
      </section>

      {/* Services Grid */}
      <section
        id="services"
        style={{ padding: "8rem 2rem", background: "#fbfbfd" }}
      >
        <div className="container">
          <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--primary-color)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}>
              What We Offer
            </p>
            <h2 style={{
              fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
              color: "var(--text-primary)",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}>
              Our Services
            </h2>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              Comprehensive maintenance and repair solutions tailored to your needs.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "2rem",
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                className={`scroll-fade-up delay-${(i % 3) * 100 + 100}`}
                style={{
                  background: "white",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  border: "1px solid var(--border-color)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    height: "220px",
                    background: "#f5f5f7",
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
                      transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <h3 style={{
                    marginBottom: "0.75rem",
                    color: "var(--text-primary)",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "8rem 2rem", background: "white" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6rem",
            flexWrap: "wrap",
          }}
        >
          <div className="scroll-slide-left" style={{ flex: 1, minWidth: "320px" }}>
            <p style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--primary-color)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}>
              Why Us
            </p>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "2rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
            }}>
              Why Choose Us?
            </h2>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}>
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
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--success-color) 0%, #2dd4bf 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{
                      marginBottom: "0.375rem",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      color: "var(--text-secondary)",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="scroll-slide-right"
            style={{
              flex: 1,
              minWidth: "320px",
              height: "480px",
              borderRadius: "var(--radius-2xl)",
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src={awardImg}
              alt="Award Winning Service"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* Visit Us (Map Only) */}
      <section style={{ padding: "8rem 2rem", background: "#fbfbfd" }}>
        <div className="container">
          <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--primary-color)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}>
              Location
            </p>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}>
              Visit Us
            </h2>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1.25rem",
              maxWidth: "500px",
              margin: "0 auto",
            }}>
              Conveniently located at MKU Boulevard, Milton Keynes.
            </p>
          </div>

          <div
            className="scroll-scale-in"
            style={{
              height: "500px",
              borderRadius: "var(--radius-2xl)",
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
              border: "1px solid var(--border-color)",
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
          background: "#1d1d1f",
          color: "white",
          padding: "5rem 2rem 2rem",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "4rem",
              marginBottom: "4rem",
            }}
          >
            {/* Brand */}
            <div>
              <h3 style={{
                fontSize: "1.375rem",
                marginBottom: "1.25rem",
                color: "white",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}>
                Maple Street Auto
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.7",
                fontSize: "0.9375rem",
              }}>
                Your trusted partner for all automotive needs. Quality service,
                every time.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{
                fontSize: "0.8125rem",
                marginBottom: "1.25rem",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                Contact Us
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                color: "rgba(255,255,255,0.8)",
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
                fontSize: "0.9375rem",
              }}>
                <li>📍 MKU Boulevard, Milton Keynes</li>
                <li>📞 +44 7466 555 555</li>
                <li>✉️ info@maplestreetauto.com</li>
                <li>⏰ Mon-Fri: 8am - 6pm</li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 style={{
                fontSize: "0.8125rem",
                marginBottom: "1.25rem",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                Quick Links
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}>
                <li>
                  <a
                    href="#services"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "0.9375rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/customer"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "0.9375rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >
                    Book Appointment
                  </a>
                </li>
                <li>
                  <a
                    href="/staff/login"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      textDecoration: "none",
                      fontSize: "0.9375rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >
                    Staff Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "2rem",
            textAlign: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.875rem",
          }}>
            © {new Date().getFullYear()} Maple Street Auto Repairs. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
