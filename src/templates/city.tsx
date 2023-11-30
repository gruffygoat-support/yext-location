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
import { isProduction } from '@yext/pages/util';
import '../index.css';
import Favicon from '../assets/images/yext-favicon.ico';
import DirectoryCityGrid from '../components/DirectoryCityGrid';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
const Map = React.lazy(() => import('../components/Map'));

export const config: TemplateConfig = {
	stream: {
		$id: 'city-stream',
		filter: {
			entityTypes: ['ce_city'],
		},
		fields: [
			'id',
			'uid',
			'meta',
			'name',
			'description',
			'slug',
			'c_addressRegionDisplayName',
			'dm_directoryParents.name',
			'dm_directoryParents.slug',
			'dm_directoryParents.meta',
			'dm_directoryParents.c_addressRegionDisplayName',
			'dm_directoryChildren.name',
			'dm_directoryChildren.address',
			'dm_directoryChildren.mainPhone',
			'dm_directoryChildren.slug',
			'dm_directoryChildren.c_geomodifier',
			'dm_directoryChildren.cityCoordinate',
		],
		localization: {
			locales: ['en'],
			primary: false,
		},
	},
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
	return `${document.slug.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
	return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
	document,
}): HeadConfig => {
	return {
		title: document.name,
		charset: 'UTF-8',
		viewport: 'width=device-width, initial-scale=1',
		tags: [
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

export const transformProps: TransformProps<any> = async (data) => {
	const { dm_directoryParents, name, slug } = data.document;

	(dm_directoryParents || []).push({ name: name, slug: '' });

	return {
		...data,
		document: {
			...data.document,
			dm_directoryParents: dm_directoryParents,
		},
	};
};

const City: Template<TemplateRenderProps> = ({
	relativePrefixToRoot,
	document,
}) => {
	const {
		name,
		description,
		siteDomain,
		slug,
		dm_directoryParents,
		dm_directoryChildren,
	} = document;
	return (
		<>
			<PageLayout>
				<div className='grid grid-cols-1 xl:p-8 gap-2 md:grid-cols-2 bg-bg h-max lg:grid-cols-2 '>
					<div
						className=' p-4  p-[2.5rem]  flex flex-col justify-center 
					md:p-[2.9rem]
					lg:p-[2.9rem]
					2xl:ml-[2rem] 2xl:mr-[8rem] 2xl:pl-[4.5rem]  2xl:p-[1rem] 
					large:ml-[9.5rem]  large:mr-[9rem]
					xl:p-[2rem] xl:py-10 
					large:pl-0  
					extraLarge:ml-[4rem] extraLarge:mr-[8rem]
					
					'>
						<Breadcrumbs
							breadcrumbs={dm_directoryParents}
							baseUrl={relativePrefixToRoot}
							className='leading-none'
						/>
						<h1 className='text-[28px] lg:text-[48px] text-typography-link font-bold mb-3 leading-none'>
							{'Browse All Regional Finance Branches In the Greater'}
							<br />
							{name + ' ' + 'Area'}
						</h1>
						{name && (
							<div>
								<DirectoryCityGrid
									name={
										document?.c_addressRegionDisplayName
											? document?.c_addressRegionDisplayName
											: name
									}
									description={description}
									directoryChildren={dm_directoryChildren}
									relativePrefixToRoot={relativePrefixToRoot}
								/>
							</div>
						)}
					</div>

					<React.Suspense fallback={<></>}>
						<div className='lg:block md:block hidden m-5'>
							<Map coordinates={document?.dm_directoryChildren} />
						</div>
					</React.Suspense>
				</div>
				<div
					className=' my-[5rem]  p-8  

				md:p-[2.9rem]
				lg:p-[3rem]
				xl:p-[4rem]
				2xl:mx-[15rem] 
				large:mx-[9rem] large:p-[2.5rem]
				extraLarge:ml-[8.5rem] extraLarge:mr-[8erm] extraLarge:p-[2rem]
				'>
					<div className='lg:text-[32px] text-[22px] font-bold mb-3 text-typography-link leading-none mb-6'>
						About Branches in {name}
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-2  '>
						<div className='text-typography-time font-normal opacity-[80%] lg:w-[493px] lg:pr-4 mb-5'>
							<p className='text-xs'>
								Regional Finance has branch locations offering personal loans
								across New Mexico, from Farmington all the way down to Las
								Cruces. As a trusted lender providing personal loans across the
								nation for over 30 years, our team knows how to lend a helping
								hand when you need a fast auto repair loan, appliance loan,
								travel loan, or debt consolidation loan in New Mexico.
							</p>
						</div>

						<div
							className='text-typography-time font-normal 
						lg:w-[493px] lg:ml-[1.6rem]
						extraLarge:ml-[4.8rem]
						'>
							<p className='mb-10 md:mb-4 text-xs opacity-[80%] '>
								You may have a few questions, and we're ready with answers. Call
								or drop by the branch location nearest you.
							</p>
							<p className='text-lg opacity-[80%]'>
								¿Hablas Español? Tenemos representantes de habla hispana que
								pueden ayudarlo. Llámenos para más información.
							</p>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default City;
