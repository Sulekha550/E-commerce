import { CheckCircle2, Clock3, Package, Truck, Navigation, Home, XCircle } from "lucide-react";

export default function OrderTracker({ status = "Placed" }) {
  const steps = [
    { label: "Order Placed", key: "Placed", icon: Clock3 },
    { label: "Confirmed", key: "Confirmed", icon: CheckCircle2 },
    { label: "Preparing", key: "Preparing", icon: Package },
    { label: "Shipped", key: "Shipped", icon: Truck },
    { label: "Out for Delivery", key: "Out for Delivery", icon: Navigation },
    { label: "Delivered", key: "Delivered", icon: Home }
  ];

  if (status === "Cancelled") {
    return (
      <div className="tracker-container" style={{ background: "#fee2e2", color: "#991b1b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" }}>
          <XCircle size={20} />
          <span>This order has been Cancelled.</span>
        </div>
      </div>
    );
  }

  // Normalize status naming
  const currentKey = status === "Order Placed" ? "Placed" : status === "Processing" ? "Preparing" : status;
  
  const currentIndex = steps.findIndex(s => s.key === currentKey);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent = (safeIndex / (steps.length - 1)) * 100;

  return (
    <div className="tracker-container">
      <div className="tracker-steps">
        <div className="tracker-progress-bar" style={{ width: `${progressPercent}%` }} />
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < safeIndex;
          const isActive = idx === safeIndex;
          return (
            <div key={step.key} className={`tracker-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}>
              <div className="step-icon-wrap">
                <Icon size={18} />
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
