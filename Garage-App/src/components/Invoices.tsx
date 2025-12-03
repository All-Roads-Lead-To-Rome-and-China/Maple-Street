import { useState, useEffect } from "react";
import useBooking from "../hooks/useBooking";

const SERVICE_PRICES: Record<string, number> = {
    "Oil Change": 50,
    "Tire Rotation": 30,
    "Brake Inspection": 40,
    "Full Service": 150,
    "MOT": 45,
    "General Repair": 80, // Base price
};

const Invoices = () => {
    const { getAllBookings } = useBooking();
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const bookings = await getAllBookings();
                // Filter for completed bookings to generate invoices
                const completedBookings = bookings.filter(b => b.status === "Completed");

                // Map bookings to invoice structure
                const invoiceData = completedBookings.map(b => ({
                    id: b.$id,
                    customer: b.customerId, // Ideally fetch customer name, but using ID for now as per "only existing functions" constraint if no easy join
                    date: b.bookingDate,
                    service: b.serviceType,
                    vehicle: `${b.vehicleYear} ${b.vehicleMake} ${b.vehicleModel}`,
                    amount: SERVICE_PRICES[b.serviceType] || 100, // Default to 100 if unknown
                    status: "Paid" // Assuming completed bookings are paid or ready to be paid
                }));

                setInvoices(invoiceData);
            } catch (err) {
                console.error("Error fetching invoices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [getAllBookings]);

    if (loading) return <div>Loading invoices...</div>;

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "2rem", color: "var(--primary-color)" }}>Invoices & Payments</h2>

            <div style={{ display: "grid", gap: "1.5rem" }}>
                {invoices.length > 0 ? (
                    invoices.map((inv) => (
                        <div key={inv.id} className="glass-panel" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Invoice #{inv.id?.substring(0, 8)}</span>
                                    <span style={{
                                        fontSize: "0.8rem",
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "1rem",
                                        background: "var(--success-color)",
                                        color: "white"
                                    }}>
                                        {inv.status}
                                    </span>
                                </div>
                                <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                    <p style={{ margin: "0.25rem 0" }}>Customer ID: {inv.customer}</p>
                                    <p style={{ margin: "0.25rem 0" }}>Vehicle: {inv.vehicle}</p>
                                    <p style={{ margin: "0.25rem 0" }}>Service: {inv.service}</p>
                                    <p style={{ margin: "0.25rem 0" }}>Date: {new Date(inv.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-color)" }}>
                                    £{inv.amount.toFixed(2)}
                                </div>
                                <button className="btn btn-outline" style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="glass-panel" style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
                        No invoices found. Complete bookings to generate invoices.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Invoices;
