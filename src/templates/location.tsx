/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from 'react';
import {
	GetHeadConfig,
	GetPath,
	GetRedirects,
	HeadConfig,
	Template,
	TemplateConfig,
	TemplateProps,
	TemplateRenderProps,
	TransformProps,
} from '@yext/pages';
import '../index.css';
import Favicon from '../assets/images/yext-favicon.ico';
import About from '../components/About';
import { Banner } from '../components/Location/Banner';
import Details from '../components/Details';
import Hours from '../components/Hours';
import PageLayout from '../components/PageLayout';
import BreadCrumbs from '../components/Breadcrumbs';
import Cta from '../components/Cta';
import { Image } from '@yext/pages/components';
import Brands from '../components/Location/ImageCard';
import Content from '../components/Location/Content';
import Faqs from '../components/Location/Faqs';
import Apis from '../utils/Apis';

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
	stream: {
		$id: 'location-stream',
		// Defines the scope of entities that qualify for this stream.
		// You can use entityTypes, savedFilterIds, and/or entityIds

		// Specifies the exact data that each generated document will contain.
		// This data is passed in directly as props to the default exported function.
		fields: [
			'id',
			'uid',
			'meta',
			'name',
			'address',
			'mainPhone',
			'description',
			'hours',
			'slug',
			'geocodedCoordinate',
			'services',
			'photoGallery',
			'dm_directoryParents.name',
			'dm_directoryParents.slug',
			'dm_directoryParents.meta',
			'dm_directoryParents.c_addressRegionDisplayName',
			'dm_directoryChildren.slug',
			'c_cTALendingTree',
			'c_cTACreditKarma',
			'c_cTABestCompany',
			'c_cTATrustPilot',
			'c_branchManager',
			'fax',
			'c_pagesAboutDescription',
			'c_disclosureNew',
			'c_fAQQuestion1',
			'c_fAQAnswer1',
			'c_fAQQuestion2',
			'c_fAQAnswer2',
			'c_fAQQuestion3',
			'c_fAQAnswer3',
			'c_fAQQuestion4',
			'c_fAQAnswer4',
			'c_fAQQuestion5',
			'c_fAQAnswer5',
			'c_alertBannerText',
			'c_startLoanProcessURL',
		],
		filter: {
			entityTypes: ['location'],
		},
		// The entity language profiles that documents will be generated for.
		localization: {
			locales: ['en'],
			primary: false,
		},
		transform: {
			replaceOptionValuesWithDisplayNames: ['paymentOptions'],
		},
	},
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
	return document.slug
		? document.slug
		: `${document.locale}/${document.address.region}/${document.address.city}/${
				document.address.line1
		  }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
	return [`index-old/${document.locale}/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
	document,
}): HeadConfig => {
	return {
		title: document.name,
		charset: 'UTF-8',
		viewport: 'width=device-width, initial-scale=1',
		tags: [
			{
				type: 'meta',
				attributes: {
					name: 'description',
					content: document.description,
				},
			},
			{
				type: 'link',
				attributes: {
					rel: 'icon',
					type: 'image/x-icon',
					href: Favicon,
				},
			},
		],
	};
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<any> = async (data) => {
	const { dm_directoryParents, name, slug } = data?.document;
	const footer = await Apis.getDesktopFooter();
	const header = await Apis.getHeaderMenuNav();
	const mobileFooter = await Apis.getMobileFooter();

	const faqs = [
		{
			id: 0,
			question: data?.document.c_fAQQuestion1 || '',
			answer: data?.document.c_fAQAnswer1 || '',
		},
		{
			id: 1,
			question: data?.document.c_fAQQuestion2 || '',
			answer: data?.document.c_fAQAnswer2 || '',
		},
		{
			id: 2,
			question: data?.document.c_fAQQuestion3 || '',
			answer: data?.document.c_fAQAnswer3 || '',
		},
		{
			id: 3,
			question: data?.document.c_fAQQuestion4 || '',
			answer: data?.document.c_fAQAnswer4 || '',
		},
		{
			id: 4,
			question: data?.document.c_fAQQuestion5 || '',
			answer: data?.document.c_fAQAnswer5 || '',
		},
	];

	(dm_directoryParents || []).push({ name: slug, slug: name });

	return {
		...data,
		document: {
			...data.document,
			dm_directoryParents: dm_directoryParents,
			faqs: faqs,
			footer: footer || [],
			header: header || [],
			mobileFooter: mobileFooter || [],
		},
	};
};

const Location: Template<TemplateRenderProps> = ({
	relativePrefixToRoot,
	document,
}) => {
	const {
		name,
		slug,
		address,
		hours,
		mainPhone,
		services,
		description,
		siteDomain,
		_site,
		dm_directoryParents,

		faqs,
	} = document;
	const getDirection = (lat, long) => {
		// Replace the latitude and longitude with your desired coordinates
		const latitude = lat;
		const longitude = long;

		// Construct the Google Maps URL
		const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

		// Open the URL in a new tab or window
		window.open(mapsUrl, '_blank');
	};

	const [openFaq, setOpenFaq] = React.useState(null);

	const handleToggle = (faqId) => {
		setOpenFaq((prevOpenFaq) => (prevOpenFaq === faqId ? null : faqId));
	};
	return (
		<>
			<PageLayout
				content={document?.c_alertBannerText}
				header={document?.header}
				footer={document?.footer}
				mobileFooter={document?.mobileFooter}>
				<div className='grid grid-cols-1 p-6 gap-2 md:grid-cols-2 bg-bg h-max  lg:grid-cols-2 '>
					<div className=' py-10 mt-[40px] w-lg m-auto lg:mx-[8rem]'>
						<BreadCrumbs
							breadcrumbs={dm_directoryParents}
							baseUrl={relativePrefixToRoot}
							className='leading-none'
						/>
						<br />
						<h1 className='text-[3rem] text-typography-link font-bold mb-3 leading-none'>
							{address?.city}
						</h1>
						<br />
						<div className='flex items-center gap-4 mb-[2.75rem] '>
							<Cta
								buttonText='Get Direction'
								url='#'
								action={() =>
									getDirection(
										document?.geocodedCoordinate?.latitude,
										document?.geocodedCoordinate?.longitude
									)
								}
								style='text-white bg-blue-400 shadow-md bg-secondary text-center w-max-content lg:w-[195px] '
							/>
							<Cta
								buttonText='Start Loan Process'
								url={document?.c_startLoanProcessURL}
								style='text-white bg-orange shadow-md bg-primary text-center '
							/>
						</div>
						{/* horizontal line */}
						<div className='border-t w-[80%] max-w[100%]border-gray-500' />
						{/* content of hours and branch */}
						<div className='grid grid-cols-2 gap-4 py-5  '>
							<Content document={document} />
							<div>
								{hours && (
									<Hours
										title={'Restaurant Hours'}
										hours={hours}
									/>
								)}
							</div>
						</div>
					</div>

					<div>
						<img
							src='https://images.unsplash.com/photo-1639389016237-85a1a16f76d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJyYW5jaCUyMHJlaWdvbmFsJTIwZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D'
							width={570}
							height={610}
						/>
					</div>
				</div>

				{/* Image Card  */}
				<Brands document={document} />
				{/* Image Content section */}
				<div className='grid grid-cols-1 lg:grid-cols-2 bg-bg h-max '>
					<div className='lg:h-[100%]'>
						<img src='https://plus.unsplash.com/premium_photo-1679814366168-f6f39e7e8ae4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhbmt8ZW58MHx8MHx8fDA%3D' />
						{/* <img src='https://media.istockphoto.com/id/610843572/photo/smart-technology-has-changed-my-life-for-the-better.webp?b=1&s=170667a&w=0&k=20&c=znMvbAgDa7tBZQe5F7FLN6KduxjWfwoHZFB-kGRa0FE=' /> */}
					</div>
					<div className=' py-10 px-10 mt-[40px] lg:ml-[6rem] lg:mr-[12rem] lg:w-[55%]'>
						<div className=' text-xl text-typography-link lg:text-[32px] font-bold'>
							Regional Finance: your personal loan partner
						</div>
						<br />
						<p className='mb-5 text-lg text-gray-400'>
							{document.c_pagesAboutDescription}
						</p>
						<div className=' flex gap-2 flex-wrap mb-5 '>
							<span
								className='text-typography-breadcrumb   underline underline-offset-1 cursor-pointer '
								style={{
									fontSize: 14,
								}}>
								Consumer Information Brochure
							</span>
							<span
								className='text-typography-breadcrumb text-md underline underline-offset-1 cursor-pointer '
								style={{
									fontSize: 14,
								}}>
								Concerns & Complaints
							</span>
							<span
								className='text-typography-breadcrumb  text-md underline underline-offset-1 cursor-pointer '
								style={{
									fontSize: 14,
								}}>
								Rates & Fees
							</span>
							<span
								className='text-typography-breadcrumb text-md underline underline-offset-1 cursor-pointer '
								style={{
									fontSize: 14,
								}}>
								View License
							</span>
							<span
								className='text-typography-breadcrumb text-md underline underline-offset-1 cursor-pointer '
								style={{
									fontSize: 14,
								}}>
								RegionalFinance.com
							</span>
						</div>
						<div className='text-gray-400 text-sm text-justify'>
							{document.c_disclosureNew}
						</div>
					</div>
				</div>
				{/* Faqs section */}
				<div className='flex flex-col items-center my-9 sm:m-4'>
					<div className='mb-5 text-2xl text-t font-bold '>
						Frequently asked questions
					</div>
					{faqs.map((faq, index) => (
						<div key={index}>
							<Faqs
								question={faq?.question}
								answer={faq?.answer}
								toggleFaq={openFaq === faq.id}
								setToggleFaq={() => handleToggle(faq.id)}
							/>
							<br />
						</div>
					))}
					<br />
				</div>
			</PageLayout>
		</>
	);
};

export default Location;
