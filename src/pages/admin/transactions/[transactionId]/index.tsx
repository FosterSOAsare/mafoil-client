import React, { useEffect, useState } from "react";

import AdminLayout from "@/components/layouts/admin.layout";
import { useLazyGetATransactionRequestQuery } from "@/apis/transactionsApi";
import { useParams } from "next/navigation";
import Loading from "@/components/atom/Loading";
import { useRouter } from "next/router";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import NotFound from "@/components/NotFound";

const Transaction = () => {
	const params = useParams();
	const [getATransaction, { data, error, isLoading }] = useLazyGetATransactionRequestQuery();
	const [notFound, setNotFound] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const id = router.query.transactionId;

			// write whatever you want
			getATransaction(id);
		}
	}, [router.isReady]);

	useEffect(() => {
		if (!error) return;
		setNotFound(true);
	}, [error]);

	useCreateErrorFromApiRequest(error);
	return (
		<AdminLayout>
			{isLoading && (
				<div className="flex h-screen items-center justify-center flex-col">
					<Loading text="Fetching event..." />
				</div>
			)}
			{!isLoading && (
				<>
					{notFound && (
						<>
							<NotFound />
						</>
					)}

					{!notFound && (
						<>
							<h1>Transaction Details</h1>
						</>
					)}
				</>
			)}
		</AdminLayout>
	);
};

export default Transaction;
