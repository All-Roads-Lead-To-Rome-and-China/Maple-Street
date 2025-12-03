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
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
        }}>
            <div className="glass-panel" style={{ padding: "2rem", width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center" style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Staff Login</h2>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label htmlFor="username" style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                border: "1px solid #cbd5e1",
                                outline: "none"
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                border: "1px solid #cbd5e1",
                                outline: "none"
                            }}
                            required
                        />
                    </div>
                    {error && <p style={{ color: "var(--error-color)", fontSize: "0.875rem" }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                        Login
                    </button>
                </form>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: "1rem",
                        background: "none",
                        border: "none",
                        color: "var(--text-secondary)",
                        textDecoration: "underline",
                        width: "100%"
                    }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default StaffLogin;
