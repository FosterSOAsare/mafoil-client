import React from "react";
import Head from "next/head";

import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

const privacy = () => {
	return (
		<div>
			<Head>
				<title>Mafo.il - Privacy Policy</title>
			</Head>
			<Header />
			<main className="mx-auto py-12 px-6 md:px-10">
				<h3 className="font-medium text-center text-3xl mb-6 underline">Privacy Policy</h3>

				<div className="w-full max-w-7xl mx-auto mt-3">
					<p className="text-[15px] mb-3">
						Mafoil ("us", "we", or "our") operates the mafo.il website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data
						when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the
						collection and use of information in accordance with this policy.
					</p>
					<div className="mb-3">
						<h3 className="text-brown font-medium">1. About this Notice</h3>
						<p className="text-light text-[15px]">
							This Privacy Notice provides information on how Mafo.il collects and processes your personal data when you visit our website or mobile applications. It sets out what we do
							with your personal data and how we keep it secure and explains the rights that you have in relation to your personal data.
						</p>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">2. Who We Are</h3>
						<p className="text-[15px]">
							Mafo.il is the leading pan-African e-commerce platform. Our platform consists of our marketplace, which connects sellers with consumers, our logistics service, which
							enables the shipment and delivery of packages from sellers to consumers, and our payment service, which facilitates transactions among participants active on our platform
							in selected markets.
							<br />
							This website and/or mobile app is operated by a member of the Mafo.il group of companies, the ultimate holding company of which is Mafo.il Technologies AG. Information on
							our subsidiaries can be found on our website. Any personal data provided or collected by Mafo.il is controlled by the subsidiary that the website and/or mobile app relates
							to.
						</p>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">3. The Data We Collect About You?</h3>
						<div>
							<p className="text-[15px]">
								Personal data means any information that can be used to identify directly or indirectly a specific individual. We collect your personal data in order to provide
								tailored products and services and in order to analyse and continually improve our products and services. We may collect, use, store and transfer different kinds of
								personal data for marketing and personal data optimization purposes. Mafo.il also uses Google Digital Marketing to propose targeted offers for certain products and
								services to our customers.
								<br />
								You provide us with your personal data when you register your personal details on our website and mobile platforms and transact with the same.
								<br />
								The personal data we collect includes:
							</p>

							<div className="mb-3 mt-2">
								<p className="text-[15px]">
									<span className="font-bold">A. Information you provide to us: </span>
									We receive and store the information you provide to us including your identity data, contact data, biometric data, delivery address and financial data. These types
									of personal data may include:
								</p>

								<ul className="pl-10 list-disc">
									<li className="text-[14px]">contact details (such as your name, postal addresses, phone numbers and email addresses),</li>
									<li className="text-[14px]">online registration information (such as your password and other authentication information),</li>
									<li className="text-[14px]">payment information (such as your credit card information and billing address),</li>
									<li className="text-[14px]">information provided as part of online questionnaires (such as responses to any customer satisfaction surveys or market research)</li>
									<li className="text-[14px]">in certain cases your marketing preferences.</li>
								</ul>
							</div>

							<div>
								<p className="text-[15px]">
									<span className="font-bold">B. Information we automatically collect/generate or obtain from third parties: </span> We automatically collect and store certain types
									of information regarding your use of the Mafo.il marketplace including information about your searches, views, downloads and purchases. In addition, we may receive
									information about you from third parties including our carriers; payment service providers; merchants/brands; and advertising service providers.
									<br />
									hese types of personal data may relate to your device (such as your PC, tablet or other mobile device), your use of our websites and apps (as well as certain third
									party websites with whom we have partnered), and/or your personal preferences, interests, or geographic location. Examples of these types of information include:
								</p>

								<ul className="list-disc pl-10">
									<li className="text-sm">name and age (or predicted age range),</li>
									<li className="text-sm">information about your device, operating system, browser and IP address,</li>
									<li className="text-sm">unique identifiers associated with your device,</li>
									<li className="text-sm">details of web pages that you have visited,</li>
									<li className="text-sm">
										which products you have looked at online (including information about products you have searched for or viewed, purchased or added to an online shopping
										basket),
									</li>
									<li className="text-sm">how long you spend on certain areas of a website or app together with the date and time of your visit/usage,</li>
									<li className="text-sm">personal data contained within user-generated content (such as blogs and social media postings),</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">4. Cookies and other Identifiers</h3>
						<p className="text-light text-[15px]">
							{" "}
							A cookie is a small file of letters and numbers that we put on your computer, mobile phone or tablet if you agree. Cookies allow us to distinguish you from other users of
							our website and mobile applications, which helps us to provide you with an enhanced browsing experience. For more information about cookies and how we use them, please read
							our Cookie Notice:
						</p>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">5. How We Use Your Personal Data</h3>
						<p className="text-light text-[15px]">We use your personal data to operate, provide, develop and improve the products and services that we offer, including the following:</p>
						<ul className="list-disc pl-10">
							<li className="text-sm">Registering you as a new customer.</li>
							<li className="text-sm">Processing and delivering your orders.</li>
							<li className="text-sm">Managing your relationship with us.</li>
							<li className="text-sm">Enabling you to participate in promotions, competitions and surveys.</li>
							<li className="text-sm">Improving our website, applications, products and services.</li>
							<li className="text-sm">Recommending/advertising products or services which may be of interest to you.</li>
							<li className="text-sm">Enabling you to access certain products and services offered by our partners and vendors.</li>
							<li className="text-sm">Complying with our legal obligations, including verifying your identity where necessary.</li>
							<li className="text-sm">Detecting fraud.</li>
						</ul>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">6. How We Share Your Personal Data</h3>
						<div className="mb-3">
							<p className="text-[15px]">A. We may need to share your personal data with third parties for the following purposes:</p>
							<ul className="list-disc pl-10">
								<li className="text-sm">
									Sale of products and services: In order to deliver products and services purchased on our marketplace from third parties, we may be required to provide your
									personal data to such third parties.
								</li>
								<li className="text-sm">
									Working with third party service providers: We engage third parties to perform certain functions on our behalf. Examples include fulfilling orders for products or
									services, delivering packages, analyzing data, providing marketing assistance, processing payments, transmitting content, assessing and managing credit risk, and
									providing customer service.
								</li>
								<li className="text-sm">
									Business transfers: As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information may be
									transferred together with other business assets.
								</li>
								<li className="text-sm">
									Detecting fraud and abuse: We release account and other personal data to other companies and organizations for fraud protection and credit risk reduction, and to
									comply with applicable law.
								</li>
							</ul>
						</div>

						<div>
							<p className="text-[15px]">B. When we share your personal data with third parties we:</p>
							<ul className="list-disc pl-10">
								<li className="text-sm">
									require them to agree to use your data in accordance with the terms of this Privacy Notice, our Privacy Policy and in accordance with applicable law; and
								</li>
								<li className="text-sm">
									only permit them to process your personal data for specified purposes and in accordance with our instructions. We do not allow our third-party service providers to
									use your personal data for their own purposes.
								</li>
							</ul>
						</div>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">7. Data Security</h3>
						<p className="text-light text-[15px]">
							We have put in place security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
							<br />
							In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process
							your personal data on our instructions and they are subject to a duty of confidentiality.
							<br />
							We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required
							to do so.
						</p>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">8. Your Legal Rights</h3>
						<p className="text-light text-[15px]">
							A. It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.
							<br />
							B. Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct or erase your personal
							data, object to or restrict processing of your personal data, right to ask that we transfer your personal data to a third party, and unsubscribe from our emails and
							newsletters.
							<br />
							C. Where you wish to permanently delete your data from our website and other applications, you can choose the option of closing your account. You can close your account by
							clicking on this link and following the instructions. Once your account is closed, all products and services that you access through your account will no longer be
							available.
							<br />
							D. We can refuse to accede to your request where it is unreasonable or where you have failed to provide additional information necessary to confirm your identity.
						</p>
					</div>
					<div className="mb-3">
						<h3 className="text-brown font-medium">9. Data Controllers & Contact</h3>
						<p className="text-light text-[15px]">
							If you have any questions or concerns about Mafo.il's Privacy Notice or you are looking for more information on how we process your personal data, or wish to exercise your
							legal rights in respect of your personal data, please contact the Data Privacy Officer by email at Ghana.Legal@Mafo.il.com.
							<span>We will investigate any complaint about the way we manage Personal Data and ensure that we respond to all substantiated complaints within prescribed timelines.</span>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default privacy;
