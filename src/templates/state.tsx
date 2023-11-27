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
import Banner from '../components/Banner';
import DirectoryStateGrid from '../components/DirectoryStateGrid';
import PageLayout from '../components/PageLayout';
import EditTool from '../components/EditTool';
import Breadcrumbs from '../components/Breadcrumbs';
import Apis from '../utils/Apis';
// import Map from '../components/Map';

const Map = React.lazy(() => import('../components/Map'));

export const config: TemplateConfig = {
	stream: {
		$id: 'state-stream',
		filter: {
			savedFilterIds: ['dm_directory_address_region'],
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
			'dm_directoryChildren.name',
			'dm_directoryChildren.slug',
			'dm_directoryChildren.dm_childEntityIds',
			'dm_childEntityIds',
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
	const { dm_directoryParents, name } = data.document;

	(dm_directoryParents || []).push({ name: name, slug: '' });
	return {
		...data,
		document: {
			...data?.document,
			dm_directoryParents: dm_directoryParents,
		},
	};
};

const State: Template<TemplateRenderProps> = ({
	relativePrefixToRoot,
	document,
}) => {
	const {
		name,
		description,
		siteDomain,
		c_addressRegionDisplayName,
		dm_directoryParents,
		dm_directoryChildren,
	} = document;
	const [Loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<>
			<PageLayout>
				<div className='grid grid-cols-1 xl:p-8 gap-2 md:grid-cols-2 bg-bg h-max lg:grid-cols-2 '>
					<div className=' xl:py-10 xl:p-0 lg:p-4 p-4 md:p-4  xl:mx-[8rem] flex flex-col  justify-center '>
						<Breadcrumbs
							breadcrumbs={dm_directoryParents}
							baseUrl={relativePrefixToRoot}
							className='leading-none'
						/>
						<h1 className='text-[28px] lg:text-[3rem] text-typography-link font-bold mb-3 leading-none'>
							{'Browse All Regional Finance Branches' +
								' ' +
								c_addressRegionDisplayName}
						</h1>
						{name && (
							<div>
								<DirectoryStateGrid
									name={
										c_addressRegionDisplayName
											? c_addressRegionDisplayName
											: name
									}
									description={description}
									directoryChildren={dm_directoryChildren}
									relativePrefixToRoot={relativePrefixToRoot}
								/>
							</div>
						)}
					</div>
					{document && (
						<React.Suspense fallback={<div>Loading.....</div>}>
							<div className='lg:block md:block hidden m-5'>
								<Map slug={name.toLowerCase()} />
							</div>
						</React.Suspense>
					)}
				</div>
				<div className=' my-[5rem] p-4 p-8  xl:mx-[8rem] '>
					<div className='lg:text-[32px] text-[22px] font-bold mb-3 text-typography-link leading-none mb-6'>
						About Branches in {name}
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-2  '>
						<div className='text-typography-time font-normal lg:w-[493px] lg:pr-4 mb-5'>
							<p className='text-xs'>
								Regional Finance has branch locations offering personal loans
								across New Mexico, from Farmington all the way down to Las
								Cruces. As a trusted lender providing personal loans across the
								nation for over 30 years, our team knows how to lend a helping
								hand when you need a fast auto repair loan, appliance loan,
								travel loan, or debt consolidation loan in New Mexico.
							</p>
						</div>

						<div className='text-typography-time font-normal lg:w-[493px]'>
							<p className='mb-10 md:mb-4 text-xs '>
								You may have a few questions, and we're ready with answers. Call
								or drop by the branch location nearest you.
							</p>
							<p className='text-lg'>
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

export default State;
