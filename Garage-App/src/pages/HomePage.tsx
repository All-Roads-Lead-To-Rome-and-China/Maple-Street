import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { initScrollAnimations } from "../hooks/useScrollAnimation";
import ModernButton from "../components/ModernButton";
import WordSlider from "../components/WordSlider";

// Images
import heroImg from "../assets/hero_garage.png";
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

  // Apply gradient background to body when homepage is active
  useEffect(() => {
    document.body.classList.add("homepage-gradient");
    return () => {
      document.body.classList.remove("homepage-gradient");
    };
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
    <div
      ref={pageRef}
      className="page-container"
      style={{
        padding: 0,
        maxWidth: "100%",
      }}
    >
      {/* Hero Section - Full viewport, Apple-style */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#000000",
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
        {/* Strong center gradient overlay for text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />
        {/* Bottom gradient overlay - blends to match body gradient start */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, transparent 100%)",
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
          {/* Company Name / Brand */}
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "1.5rem",
            }}
          >
            Maple Street Auto Repairs
          </p>
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
          <div
            style={{
              marginBottom: "3rem",
            }}
          >
            <WordSlider
              staticText="We provide"
              words={["expert repairs", "trusted service", "quality parts", "fast turnaround"]}
            />
          </div>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <ModernButton
              onClick={() => navigate("/customer")}
            >
              Book an appointment
            </ModernButton>
            <ModernButton
              variant="secondary"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn more
            </ModernButton>
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

      {/* Services Grid - Premium Design */}
      <section
        id="services"
        style={{
          padding: "8rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gradient orb */}
        <div style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container">
          <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{
              fontSize: "1rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #0071e3 0%, #40a9ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
            }}>
              What We Offer
            </p>
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "white",
              marginBottom: "1.5rem",
              letterSpacing: "-0.03em",
              fontWeight: 700,
            }}>
              Our Services
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.6)",
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
              gap: "1.5rem",
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                className={`scroll-fade-up delay-${(i % 3) * 100 + 100}`}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,113,227,0.2)";
                  e.currentTarget.style.borderColor = "rgba(0,113,227,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  style={{
                    height: "220px",
                    position: "relative",
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
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  {/* Gradient overlay on image */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
                  }} />
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <h3 style={{
                    marginBottom: "0.75rem",
                    color: "white",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    color: "rgba(255,255,255,0.6)",
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

      {/* Stats/Trust Section */}
      <section style={{
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          opacity: 0.5,
        }} />

        <div className="container">
          <div
            className="scroll-fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "3rem",
              textAlign: "center",
            }}
          >
            {[
              { value: "15+", label: "Years Experience" },
              { value: "10,000+", label: "Happy Customers" },
              { value: "50+", label: "Certified Mechanics" },
              { value: "24/7", label: "Emergency Support" },
            ].map((stat, i) => (
              <div key={i} className={`scroll-scale-in delay-${i * 100}`}>
                <div style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Redesigned with Feature Cards */}
      <section style={{
        padding: "8rem 2rem",
        position: "relative",
      }}>
        <div className="container">
          <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "rgba(100,180,255,1)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
            }}>
              Why Us
            </p>
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1.5rem",
              color: "#ffffff",
              letterSpacing: "-0.03em",
              fontWeight: 700,
            }}>
              Why Choose Us?
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}>
              We combine expertise, transparency, and quality to deliver the best automotive care.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
            {[
              {
                icon: "🏆",
                title: "Certified Mechanics",
                desc: "Our team consists of ASE certified professionals with years of hands-on experience.",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                desc: "No hidden fees or surprise charges. We provide detailed upfront estimates every time.",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              },
              {
                icon: "⚙️",
                title: "Quality Parts",
                desc: "We use only high-quality OEM or equivalent parts to ensure lasting repairs.",
                gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`scroll-fade-up delay-${(i % 3) * 100 + 100}`}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "24px",
                  padding: "2.5rem",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                }}
              >
                {/* Gradient accent bar */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: item.gradient,
                }} />

                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: item.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}>
                  {item.icon}
                </div>

                <h3 style={{
                  marginBottom: "0.75rem",
                  fontSize: "1.375rem",
                  fontWeight: 600,
                  color: "#ffffff",
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Award image - now positioned as a centered showpiece */}
          <div
            className="scroll-scale-in"
            style={{
              marginTop: "5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{
              maxWidth: "800px",
              width: "100%",
              height: "400px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 32px 64px rgba(0,0,0,0.15)",
              position: "relative",
            }}>
              <img
                src={awardImg}
                alt="Award Winning Service"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Dark overlay for text legibility */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
              }} />
              {/* Text container */}
              <div style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                right: "2rem",
              }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "#ffffff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}>
                  Award-Winning Service
                </h3>
                <p style={{
                  color: "rgba(255,255,255,0.9)",
                  margin: 0,
                  fontSize: "1rem",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}>
                  Recognized for excellence in automotive care since 2008
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us - Enhanced with contact overlay */}
      <section style={{
        padding: "8rem 2rem",
        position: "relative",
      }}>
        <div className="container">
          <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "rgba(180,230,255,0.9)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1rem",
            }}>
              Location
            </p>
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1rem",
              color: "white",
              letterSpacing: "-0.03em",
              fontWeight: 700,
            }}>
              Visit Us
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.6)",
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
              position: "relative",
              height: "550px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
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

            {/* Floating contact card */}
            <div style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "2rem",
              maxWidth: "320px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              zIndex: 1000,
            }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#1d1d1f",
                marginBottom: "1rem",
              }}>
                Maple Street Auto Repairs
              </h3>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                fontSize: "0.9375rem",
                color: "#424245",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>📍</span>
                  <span>MKU Boulevard, Milton Keynes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>📞</span>
                  <span>+44 7466 555 555</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>⏰</span>
                  <span>Mon-Fri: 8am - 6pm</span>
                </div>
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <ModernButton onClick={() => navigate("/customer")}>
                  Book Appointment
                </ModernButton>
              </div>
            </div>
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
