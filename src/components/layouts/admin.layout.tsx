import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import adminNav from "@/data/admin-nav";
import ProtectedRoute from "../ProtectedRoute";

import { CiLogout } from "react-icons/ci";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useRouter();
	return (
		<ProtectedRoute loginRequired={true}>
			<main className="w-full h-auto min-h-screen relative">
				<div className="w-full h-full max-w-7xl mx-auto flex justify-between items-stretch">
					<aside className="w-1/4 py-6 flex flex-col h-screen sticky top-0 left-0 px-8 border-r-[1px] border-sec">
						<h3 className="text-3xl px-2 font-bold font-playfair mb-6">Mafo.il</h3>

						<nav className="w-full">
							{adminNav.map((nav, index) => (
								<Link
									key={index}
									className={`flex items-center gap-2 ${
										pathname?.endsWith(nav?.href) ? "bg-slate-300" : "bg-transparent hover:bg-slate-300 text-slate-600"
									} font-medium mb-4 p-2 rounded-[5px]`}
									href={nav?.href}>
									<nav.icon />
									{nav?.name}
								</Link>
							))}
						</nav>

						<button className="w-full h-10 font-medium text-[red] gap-4 rounded-[5px] flex items-center mt-auto">
							<CiLogout />
							Logout
						</button>
					</aside>
					<div className="w-3/4 min-h-screen p-6">{children}</div>
				</div>
			</main>
		</ProtectedRoute>
	);
};

export default AdminLayout;
