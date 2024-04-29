import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useUserSlice } from "@/slices/user.slice";
import adminNav from "@/data/admin-nav";

import ProtectedRoute from "../ProtectedRoute";
import NotFound from "../NotFound";

import { CiLogout } from "react-icons/ci";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useRouter();
	const { user, error } = useSelector(useUserSlice);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user && !user?.is_admin) {
			// not found page
			setNotFound(true);
		}
	}, [user]);
	return (
		<>
			{!notFound && (
				<main className="w-full h-auto min-h-screen relative">
					<div className="w-full h-full max-w-7xl mx-auto flex justify-between items-stretch">
						<aside className="w-1/4 py-6 flex flex-col h-screen sticky top-0 left-0 px-8 border-r-[1px] border-sec">
							<Link href="/" className="text-3xl px-2 font-bold font-playfair mb-6">
								Mafo.il
							</Link>

							<nav className="w-full">
								{adminNav.map((nav, index) => {
									return (
										<Link
											key={index}
											className={`flex items-center gap-2 ${
												(!nav?.href && pathname == "/admin") || (nav?.href && pathname?.startsWith(`/admin${nav?.href}`))
													? "bg-slate-300"
													: "bg-transparent hover:bg-slate-300 text-slate-600"
											} font-medium mb-4 p-2 rounded-[5px]`}
											href={`/admin${nav?.href}`}>
											<nav.icon />
											{nav?.name}
										</Link>
									);
								})}
							</nav>

							<button className="w-full h-10 font-medium text-[red] gap-4 rounded-[5px] flex items-center mt-auto">
								<CiLogout />
								Logout
							</button>
						</aside>
						<div className="w-3/4 min-h-screen p-6">{children}</div>
					</div>
				</main>
			)}
			{notFound && <NotFound />}
		</>
	);
};
const index = ({ children }: { children: React.ReactNode }) => {
	return (
		<ProtectedRoute loginRequired={true}>
			<AdminLayout>{children}</AdminLayout>
		</ProtectedRoute>
	);
};

export default index;
