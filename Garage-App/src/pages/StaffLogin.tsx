import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "Test" && password === "Test1") {
            navigate("/staff");
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%)",
            padding: "2rem",
        }}>
            <div style={{
                background: "white",
                borderRadius: "var(--radius-2xl)",
                padding: "3rem",
                width: "100%",
                maxWidth: "420px",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-lg)",
            }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{
                        width: "64px",
                        height: "64px",
                        background: "linear-gradient(135deg, var(--primary-color) 0%, #40a9ff 100%)",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(0, 113, 227, 0.3)",
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <h2 style={{
                        color: "var(--text-primary)",
                        fontSize: "1.75rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        marginBottom: "0.5rem",
                    }}>
                        Staff Login
                    </h2>
                    <p style={{
                        color: "var(--text-secondary)",
                        fontSize: "1rem",
                    }}>
                        Sign in to access the dashboard
                    </p>
                </div>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                        <label
                            htmlFor="username"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "var(--text-primary)",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                            }}
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            style={{
                                width: "100%",
                                padding: "0.875rem 1rem",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color-strong)",
                                fontSize: "1rem",
                                transition: "all 0.2s",
                                outline: "none",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--primary-color)";
                                e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--border-color-strong)";
                                e.target.style.boxShadow = "none";
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "var(--text-primary)",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                            }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{
                                width: "100%",
                                padding: "0.875rem 1rem",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color-strong)",
                                fontSize: "1rem",
                                transition: "all 0.2s",
                                outline: "none",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--primary-color)";
                                e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--border-color-strong)";
                                e.target.style.boxShadow = "none";
                            }}
                            required
                        />
                    </div>

                    {error && (
                        <div style={{
                            padding: "0.875rem 1rem",
                            background: "rgba(255, 59, 48, 0.08)",
                            border: "1px solid rgba(255, 59, 48, 0.2)",
                            borderRadius: "var(--radius-md)",
                            color: "var(--error-color)",
                            fontSize: "0.875rem",
                            textAlign: "center",
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            marginTop: "0.5rem",
                            padding: "1rem",
                            fontSize: "1rem",
                        }}
                    >
                        Login
                    </button>
                </form>

                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            fontSize: "0.9375rem",
                            transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-color)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffLogin;
