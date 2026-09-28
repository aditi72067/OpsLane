import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const metadata = {
  title: "OpsLane | Fulfillment Operations Hub",
  description: "A centralized fulfillment operations hub for orders, inventory, and issue management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main application area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Header />

            {/* Page content */}
            <main className="flex-1 p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}