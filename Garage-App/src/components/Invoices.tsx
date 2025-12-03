import { useState, useEffect } from "react";
import useBooking from "../hooks/useBooking";
<<<<<<< HEAD

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
=======
import useInventory from "../hooks/useInventory";
import useStaff from "../hooks/useStaff";

interface Invoice {
  id: string;
  bookingId: string;
  customerId: string;
  mechanicId: string;
  serviceType: string;
  parts: { itemName: string; quantity: number; price: number }[];
  laborHours: number;
  totalAmount: number;
  paymentStatus: "Unpaid" | "Paid";
}

const Invoices = () => {
  const { getAllBookings } = useBooking();
  const { getAllInventory } = useInventory();
  const { getAllMechanics } = useStaff();

  const [bookings, setBookings] = useState<any[]>([]);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBookings = await getAllBookings();
        setBookings(allBookings);

        const allMechanics = await getAllMechanics();
        setMechanics(allMechanics);

        const allInventory = await getAllInventory();
        setInventory(allInventory);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data for invoices.");
      }
    };
    fetchData();
  }, [getAllBookings, getAllMechanics, getAllInventory]);

  // Generate invoice when booking is completed
  const generateInvoice = (booking: any) => {
    // Example: assume 2 labor hours per booking
    const laborHours = 2;
    const laborRate = 50; // £50/hour

    // Example: parts used (could be selected manually later)
    const partsUsed = [
      { itemName: "Oil Filter", quantity: 1, price: 20 },
      { itemName: "Engine Oil", quantity: 1, price: 35 },
    ];

    const partsTotal = partsUsed.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const laborTotal = laborHours * laborRate;
    const totalAmount = partsTotal + laborTotal;

    const invoice: Invoice = {
      id: `INV-${booking.$id}`,
      bookingId: booking.$id,
      customerId: booking.customerId,
      mechanicId: booking.mechanicId || "",
      serviceType: booking.serviceType,
      parts: partsUsed,
      laborHours,
      totalAmount,
      paymentStatus: "Unpaid",
    };

    setInvoices((prev) => [...prev, invoice]);
  };

  const markAsPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, paymentStatus: "Paid" } : inv
      )
    );
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
      <h2>Invoices & Payments</h2>

      <h3>Completed Bookings (Generate Invoice)</h3>
      <ul>
        {bookings
          .filter((b) => b.status === "Completed")
          .map((b) => (
            <li key={b.$id}>
              {b.serviceType} for {b.vehicleMake} {b.vehicleModel} ({b.vehicleYear}) - {new Date(b.bookingDate).toLocaleString()}
              <button onClick={() => generateInvoice(b)} style={{ marginLeft: "10px" }}>
                Generate Invoice
              </button>
            </li>
          ))}
      </ul>

      <h3>Invoices</h3>
      <table border={1} cellPadding={8} style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Booking</th>
            <th>Customer</th>
            <th>Mechanic</th>
            <th>Service</th>
            <th>Parts</th>
            <th>Labor Hours</th>
            <th>Total (£)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.bookingId}</td>
              <td>{inv.customerId}</td>
              <td>{inv.mechanicId}</td>
              <td>{inv.serviceType}</td>
              <td>
                {inv.parts.map((p, idx) => (
                  <div key={idx}>
                    {p.itemName} x{p.quantity} (£{p.price})
                  </div>
                ))}
              </td>
              <td>{inv.laborHours}</td>
              <td>{inv.totalAmount}</td>
              <td>{inv.paymentStatus}</td>
              <td>
                {inv.paymentStatus === "Unpaid" && (
                  <button onClick={() => markAsPaid(inv.id)}>Mark Paid</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Invoices;
>>>>>>> origin/FE
