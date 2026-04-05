import type { Metadata } from "next";
import CustomersApp from "./components/CustomersApp";

export const metadata: Metadata = {
  title: "Customers — TP Dumpsters",
  robots: { index: false, follow: false },
};

export default function CustomersPage() {
  return <CustomersApp />;
}
