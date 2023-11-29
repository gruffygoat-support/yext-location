/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from 'react';
import { fetch } from '@yext/pages/util';
import '../index.css';
import {
	Template,
	GetPath,
	GetHeadConfig,
	HeadConfig,
	TransformProps,
	TemplateConfig,
	TemplateProps,
	TemplateRenderProps,
} from '@yext/pages';
import PageLayout from '../components/PageLayout';
import { ExternalImage } from '../types/ExternalImage';
import Favicon from '../assets/images/yext-favicon.ico';
import MapChart from '../components/MapChart';

export const config: TemplateConfig = {
	stream: {
		$id: 'root-stream',
		filter: {
			entityTypes: ['ce_root'],
		},
		fields: [
			'id',
			'uid',
			'meta',
			'name',
			'slug',
			'dm_directoryChildren.name',
			'dm_directoryChildren.slug',
			'dm_directoryChildren.c_addressRegionDisplayName',
			'dm_directoryChildren.dm_childEntityIds',
		],
		localization: {
			locales: ['en'],
			primary: false,
		},
	},
};

/**
 * A local type for transformProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
type ExternalImageData = TemplateProps & { externalImage: ExternalImage };

/**
 * Used to either alter or augment the props passed into the template at render time.
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
 * source. This example calls a public API and returns the data.
 *
 * If the page is truly static this function is not necessary.
 */
export const transformProps: TransformProps<ExternalImageData> = async (
	data
) => {
	// const url = YEXT_PUBLIC_EXTERNAL_IMAGE_API_BASE_URL + '/2';
	// const externalImage = (await fetch(url).then((res: any) =>
	// 	res.json()
	// )) as ExternalImage;

	return { ...data };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
	return document.slug;
};

type ExternalImageRenderData = TemplateRenderProps & {
	externalImage: ExternalImage;
	footer?: any;
	header?: any;
	mobileFooter?: any;
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
	TemplateRenderProps
> = (): HeadConfig => {
	return {
		title: 'Regional Finance',
		charset: 'UTF-8',
		viewport: 'width=device-width, initial-scale=1',
		tags: [
			{
				type: 'meta',
				attributes: {
					name: 'description',
					content: 'Regional Finance',
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
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `transformProps`.
 */
const Root: Template<ExternalImageRenderData> = ({
	document,
	footer,
	header,
	mobileFooter,
}) => {
	const { dm_directoryChildren } = document;
	const [mapToggle, setMapToggle] = React.useState(true);

	const sortedData = [...dm_directoryChildren].sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		return nameA.localeCompare(nameB);
	});
	const toggleMapsVisibility = () => {
		setMapToggle(!mapToggle);
	};
	return (
		<>
			<PageLayout>
				<div className='grid grid-cols-1 p-2 md:p-4 lg:p-6 gap-2 md:grid-cols-2 bg-bg h-max  lg:grid-cols-2  '>
					<div className=' py-10 xl:mt-[5rem] lg:mt[2rem] lg:w-[600px]  xl:w-[664px] xl:pl-2 mx-auto max-w-[90rem] xl:px-6 large:px-0 large:pr-0 large:pl-[83px] extraLarge:pl-[103px] extraLarge:mt-[5rem]   lg:pr-[8rem]'>
						<h1 className='lg:text-[48px] text-[28px] text-typography-link font-bold mb-3 leading-none'>
							Browse All Regional Finance Branches
						</h1>
						<div className='  mt-7 leading-6 text-justify mb-5'>
							<p className=' text-typography-time text-xs font-normal opacity-[80%] hidden lg:block md:block '>
								Coast to coast, Regional Finance is here to help. Our commitment
								to our customers has inspired continuous expansion across the
								country. With over 350 branches in 19 states so far, Regional
								Finance is close at hand to be your preferred provider of
								personal loan services.
							</p>
						</div>
						<p className=' text-typography-time text-xs font-normal block lg:hidden md:hidden  '>
							From coast to coast, Regional Finance is here to help.
						</p>
						<div
							className='lg:hidden md:hidden block'
							onClick={toggleMapsVisibility}>
							<button className='text-[18px] font-semibold text-typography-link'>
								View Map {mapToggle ? '-' : '+'}
							</button>
						</div>
					</div>
					{mapToggle && (
						<div className=' lg:block '>
							<MapChart
								states={dm_directoryChildren.map((state) => ({
									name: state.c_addressRegionDisplayName,
									url: state.slug,
								}))}
							/>
						</div>
					)}
				</div>
				<div
					className='  grid grid-rows-2 grid-cols-2 gap-y-4 xl:gap-x-2 xl:gap-y-4 lg:grid-cols-4 lg:gap-y-7 lg:gap-x-[7.5rem]  md:grid-rows-2 
					lg:grid-rows-5  xl:px-[100px]  lg:mx-[15rem] lg:my-[6rem] mx-5 my-20 '>
					{sortedData.map((state, index) => (
						<div
							key={index}
							className='w-max max-w-2xl text-center  '>
							<a
								className='text-typography-link font-semibold text-[18px]  '
								href={state.name.toLowerCase()}>
								{state.c_addressRegionDisplayName}{' '}
								<span className='text-gray-400 font-normal text-xs'>
									({state.dm_childEntityIds.length})
								</span>
							</a>
						</div>
					))}
				</div>
			</PageLayout>
		</>
	);
};

export default Root;
