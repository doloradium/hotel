import { Outlet } from "react-router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}