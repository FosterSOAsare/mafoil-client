import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import AdminLayout from "@/components/layouts/admin.layout";
import { useDecideWithdrawalRequestMutation, useLazyGetATransactionRequestQuery } from "@/apis/transactionsApi";
import Loading from "@/components/atom/Loading";
import PrimaryButton from "@/components/atom/PrimaryButton";
import SecondaryButton from "@/components/atom/SecondaryButton";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiRequest";
import NotFound from "@/components/NotFound";
import { createDateFromString } from "@/utils/createDate";

const formatGhs = (amount: number) => `GH₵${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Transaction = () => {
	const router = useRouter();
	const [getATransaction, { data: transaction, error, isLoading }] = useLazyGetATransactionRequestQuery();
	const [decideWithdrawal, { isLoading: deciding, error: decisionError }] = useDecideWithdrawalRequestMutation();
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		if (!router.isReady) return;
		getATransaction(router.query.transactionId);
	}, [router.isReady]);

	useEffect(() => {
		if (transaction) setStatus(transaction.status);
	}, [transaction]);

	async function decide(decision: "approve" | "reject") {
		const action = decision === "approve" ? "approve this withdrawal and send the payout" : "reject this withdrawal and refund the amount to the user";
		if (!window.confirm(`Are you sure you want to ${action}?`)) return;
		const result = await decideWithdrawal({ id: transaction._id, decision });
		if ("data" in result && result.data) {
			setStatus(result.data.status);
			toast.success(decision === "approve" ? "Withdrawal approved" : "Withdrawal rejected and refunded", { autoClose: 3000 });
		}
	}

	useCreateErrorFromApiRequest(decisionError);

	const isPendingWithdrawal = transaction?.type === "withdraw" && status === "pending";

	return (
		<AdminLayout>
			<Head>
				<title>Mafo.il - Transaction Details</title>
			</Head>
			{isLoading && (
				<div className="flex h-screen items-center justify-center flex-col">
					<Loading text="Fetching transaction..." />
				</div>
			)}
			{!isLoading && error && <NotFound />}
			{!isLoading && !error && transaction && (
				<section className="w-full max-w-2xl">
					<Link href="/admin/transactions" className="text-sm underline hover:text-brown">
						Back to transactions
					</Link>
					<h1 className="text-2xl font-medium mt-4 mb-6">Transaction Details</h1>

					<dl className="grid grid-cols-[160px_1fr] gap-y-3 gap-x-4 border p-6 mb-6">
						<dt className="font-medium">Type</dt>
						<dd className="capitalize">{transaction.type}</dd>
						<dt className="font-medium">Amount</dt>
						<dd>{formatGhs(transaction.amount)}</dd>
						<dt className="font-medium">Status</dt>
						<dd className="capitalize">{status}</dd>
						<dt className="font-medium">Description</dt>
						<dd>{transaction.desc}</dd>
						{transaction.address && (
							<>
								<dt className="font-medium">Payout address</dt>
								<dd className="break-all">{transaction.address}</dd>
							</>
						)}
						<dt className="font-medium">User</dt>
						<dd>{transaction.user ? `${transaction.user.fullname} (${transaction.user.email})` : "Deleted user"}</dd>
						<dt className="font-medium">Date</dt>
						<dd>{createDateFromString(transaction.createdAt)}</dd>
					</dl>

					{isPendingWithdrawal && (
						<div className="flex flex-col sm:flex-row gap-4">
							<PrimaryButton text="Approve payout" handleClick={() => decide("approve")} disabled={deciding} />
							<SecondaryButton text="Reject and refund" handleClick={() => decide("reject")} disabled={deciding} />
						</div>
					)}
					{transaction.type === "withdraw" && !isPendingWithdrawal && <p className="text-sm opacity-80">This withdrawal has already been {status === "completed" ? "approved" : "rejected"}.</p>}
				</section>
			)}
		</AdminLayout>
	);
};

export default Transaction;
