import { useState } from "react";
import { Outlet } from "react-router-dom";

import PremiumSidebar from "../../../pages/admin/PremiumSidebar";
import PremiumTopbar from "../../../pages/admin/PremiumTopbar";


const PremiumAdminLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);


    const openSidebar = () => {
        setSidebarOpen(true);
    };


    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    return (
        <div className="premium-layout">


            {/* ==================================================
                TOPBAR
                ================================================== */}

            <PremiumTopbar
                onMenuClick={openSidebar}
            />


            {/* ==================================================
                MOBILE SIDEBAR OVERLAY
                ================================================== */}

            {sidebarOpen && (
                <div
                    className="premium-sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}


            {/* ==================================================
                SIDEBAR
                ================================================== */}

            <PremiumSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />


            {/* ==================================================
                MAIN CONTENT
                ================================================== */}

            <main className="premium-main">

                <div className="premium-content">

                    <Outlet />

                </div>

            </main>


        </div>
    );
};


export default PremiumAdminLayout;