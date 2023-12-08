import * as React from 'react';
import '../index.css';
import {
	Template,
	GetPath,
	GetHeadConfig,
	HeadConfig,
	TemplateConfig,
	TemplateProps,
	TemplateRenderProps,
} from '@yext/pages';
import Banner from '../components/Banner';
import PageLayout from '../components/PageLayout';
import Favicon from '../assets/images/yext-favicon.ico';
import { BrokenIcon } from '../components/Location/Svgs';
import Cta from '../components/Cta';

export const config: TemplateConfig = {
	name: '404',
};

export const getPath: GetPath<TemplateProps> = () => {
	return `404.html`;
};

export const getHeadConfig: GetHeadConfig<
	TemplateRenderProps
> = (): HeadConfig => {
	return {
		title: '404 Page',
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

const FourOhFour: Template<TemplateRenderProps> = () => {
	return (
		<>
			<PageLayout>
				<div>
					<div className='bg-[#e3eaf3] h-[80vh] flex flex-col '>
						<div className='max-w-[90rem] m-auto '>
							<div className='flex flex-col justify-center items-center mb-6 text-center'>
								<div className='mb-8'>
									<BrokenIcon />
								</div>

								<p className=' text-[28px] lg:text-[48px] font-normal text-typography-link mb-8 '>
									Oops! We're sorry.
								</p>
								<p className='text-[16px] font-normal text-[#757575] mb-1'>
									Error: 404
								</p>
								<p className='text-[15px] font-normal text-[#757575] leading-[24.16px]'>
									The page you requested cannot be found.
								</p>
								<p className='text-[15px] font-normal text-[#757575] leading-[24.16px]'>
									Please click the button below to return to the home page.
								</p>
							</div>
							<div className=''>
								<Cta
									buttonText='Return home'
									url='index.html'
									style='text-white px-[3.5rem] py-4 shadow-md bg-primary lg:font-normal lg:text-[16px] rounded-md '
								/>
							</div>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default FourOhFour;
