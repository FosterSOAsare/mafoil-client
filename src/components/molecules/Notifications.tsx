import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import { markNotificationAsRead, notificationType, useNotificationsSelector } from "@/slices/notifications.slice";
import { useMarkNotificationAsReadRequestMutation } from "@/apis/notificationsApi";

import { AiOutlineClose } from "react-icons/ai";

const Notifications = ({ setShowNotifications }: { setShowNotifications: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const notifications = useSelector(useNotificationsSelector);
	const [markAsReadRequest, { error, data }]: any = useMarkNotificationAsReadRequestMutation();
	const dispatch = useDispatch();
	const router = useRouter();

	const markAsRead = async (_id: string) => {
		markAsReadRequest(_id);
	};

	useEffect(() => {
		if (!error) return;
		toast.error(error?.data?.error, { autoClose: 1500 });
	}, [error]);

	useEffect(() => {
		if (!data) return;
		setShowNotifications(false);
		dispatch(markNotificationAsRead({ _id: data?._id }));
		router.push(`${data?.link}`);
	}, [data]);

	return (
		<aside className="w-1/4 bg-white shadow-md  fixed right-0 flex items-center justify-start pb-6 flex-col top-[12.7vh] z-[2] h-[88vh] overflow-y-auto">
			<div className="w-full bg-white sticky top-0 left-0 z-[2] shadow-sm">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-bold text-center mx-auto">Notifications</h3>
					<button className="w-8 mx-4 my-4 h-8 hover:bg-slate-200  flex items-center justify-center" onClick={() => setShowNotifications(false)}>
						<AiOutlineClose />
					</button>
				</div>
			</div>

			<div className="h-[110vh] w-full">
				{notifications?.length > 0 &&
					notifications?.map((notification: notificationType, index: number) => (
						<button key={index} className="w-full flex items-center justify-start p-2 text-sm text-left border-b-[1px] mb-2 gap-2" onClick={() => markAsRead(notification._id)}>
							{notification?.status === "unread" && <span className="w-[5px] h-[5px] bg-blue  rounded-full block"></span>}
							<p className="w-[calc(100%-7px)]">{notification.desc}</p>
						</button>
					))}

				{notifications?.length === 0 && (
					<div className="flex items-center justify-center h-full w-full">
						<p>There are currently no notifications</p>
					</div>
				)}
			</div>

			<ToastContainer />
		</aside>
	);
};

export default Notifications;
