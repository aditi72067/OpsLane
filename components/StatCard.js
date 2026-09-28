import {
  Package,
  AlertTriangle,
  Clock,
  CircleAlert,
} from "lucide-react";

const iconMap = {
  orders: Package,
  priority: AlertTriangle,
  delayed: Clock,
  issues: CircleAlert,
};

const colorMap = {
  orders: {
    icon: "bg-blue-50 text-blue-600",
    value: "text-slate-900",
  },
  priority: {
    icon: "bg-amber-50 text-amber-600",
    value: "text-slate-900",
  },
  delayed: {
    icon: "bg-red-50 text-red-600",
    value: "text-red-600",
  },
  issues: {
    icon: "bg-orange-50 text-orange-600",
    value: "text-orange-600",
  },
};

export default function StatCard({
  title,
  value,
  description,
  type = "orders",
}) {
  const Icon = iconMap[type] || Package;
  const colors = colorMap[type] || colorMap.orders;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className={`text-3xl font-bold mt-2 ${colors.value}`}>
            {value}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {description}
          </p>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.icon}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}