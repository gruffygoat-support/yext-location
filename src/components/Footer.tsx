import * as React from 'react';
import {
	Facebook,
	GitHub,
	Instagram,
	Twitter,
	YouTube,
} from '../assets/svgs/SocialIcons';
import { removeAmpersandCodeFromArray } from '../utils/helper';

export interface FooterProps {
	_site?: any;
	logo?: string;
	paragraph?: string;
	footerItems?: any;
	mobileFooterItems?: any;
}

const currentTime = new Date();
const year = currentTime.getFullYear();

const Footer = (props: FooterProps) => {
	const loansSubmenu = props?.footerItems?.slice(1, 9);
	let locationsubMenu = props?.footerItems?.slice(10, 30);
	const educationSubMenu = props?.footerItems?.slice(31, 34);
	const aboutUs = props?.footerItems?.slice(35, 42);
	const { mobileFooterItems } = props;

	const [branchLocation] = locationsubMenu;
	locationsubMenu = [...locationsubMenu.slice(1)].sort((a, b) =>
		a.title.localeCompare(b.title)
	);

	return (
		<>
			<footer
				className='bg-secondary hidden xl:block text-typography-footer'
				aria-labelledby='footer-heading'>
				<h2
					id='footer-heading'
					className='sr-only'>
					Footer
				</h2>
				<div className='hidden lg:block mx-auto max-w-[95rem] px-6 pb-8 lg:px-8 lg:pt-16'>
					<div className='grid grid-cols-12 gap-6 mb-8 text-white'>
						<div className='col-span-4 w-[250px] lg:mb-[50px] '>
							<img
								src='https://regionalfinance.com/wp-content/uploads/2023/11/logo-white.svg'
								style={{
									width: '200px',
									height: '54px',
									imageRendering: 'inherit',
									position: 'relative',
									zIndex: 1,
									marginBottom: 60,
									padding: 0,
								}}
							/>
							<div className='mb-6 text-typography-footer  ml-[48px] '>
								<p className='mb-1 text-s font-semibold tracking-wide'>
									Call a local branch
								</p>
								<a
									className='text-s font-normal'
									href='tel:+8886363535'>
									(888) 636-3535
								</a>
							</div>
							<div className='text-typography-footer  ml-[48px] '>
								<p className='mb-1 text-s font-semibold tracking-wide'>
									Headquarters
								</p>
								<p className='text-s font-normal'>
									Regional Management Corp. <br />
									979 Batesville Road, Suite B
									<br />
									Greer, SC 29651
									<br />
									<a href='tel:+8644487000'>(864) 448-7000</a>
								</p>
							</div>
						</div>

						<div className='col-span-2'>
							LOANS
							{loansSubmenu.map((menu, index) => (
								<div
									key={index}
									className=' text-sm py-2 w-max text-typography-footer hover:underline cursor-pointer'>
									<a
										className=''
										href={menu.url}>
										{menu.title}
									</a>
								</div>
							))}
						</div>
						<div className='col-span-2 '>
							LOCATIONS
							<div className='flex w-max justify-center align-center gap-x-4'>
								{/* First set of sliced items */}
								<div className='flex flex-col justify-center '>
									<div className=' text-sm py-2 text-typography-footer hover:underline cursor-pointer '>
										<a href={branchLocation.url}>{branchLocation.title}</a>
									</div>
									{locationsubMenu.slice(0, 9).map((menu, index) => (
										<div
											key={index}
											className=' text-sm py-2 text-typography-footer hover:underline cursor-pointer '>
											<a href={menu.url}>{menu.title}</a>
										</div>
									))}
								</div>
								{/* Second set of sliced items */}
								<div className='flex flex-col  '>
									{locationsubMenu.slice(9).map((menu, index) => (
										<div
											key={index}
											className=' text-sm py-2 text-typography-footer hover:underline cursor-pointer '>
											<a href={menu.url}>{menu.title}</a>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className='col-span-2'>
							EDUCATION
							{educationSubMenu.map((menu, index) => (
								<div
									key={index}
									className=' text-sm my-1 text-typography-footer hover:underline cursor-pointer '>
									<a href={menu.url}>{menu.title}</a>
								</div>
							))}
						</div>
						<div className='col-span-2'>
							ABOUT US
							{aboutUs.map((menu, index) => (
								<div
									key={index}
									className=' text-sm my-1 text-typography-footer hover:underline cursor-pointer '>
									<a href={menu.url}>
										{removeAmpersandCodeFromArray(menu.title)}
									</a>
								</div>
							))}
						</div>
					</div>
					<div className='ml-[48px] '>
						<p className='text-typography-footer font-normal text-sm'>
							Regional Finance is licensed in AL, AZ, CA, GA, ID, IL, IN, LA,
							MO, MS, NC, NM, OK, SC, TN, TX, UT, VA, and WI.
							<br />
							For the residents of the state of Georgia only: Regional Finance
							Company of Georgia, LLC – NMLS # 2026923.
							<br /> Regional Finance Company of Virginia, LLC is licensed by
							the Virginia State Corporation Commission under the following
							license number: CFI-161. <br />
							Loan approval is subject to our standard credit policies. Loan
							size, term and rates may vary by state.
							<br /> California Residents: Loans made or arranged pursuant to a
							California Financing Law license.
						</p>
						<div className='mt-8 '>
							<p className='text-sm leading-5 text-typography-footer cursor-pointer'>
								Copyright © 2023 Regional Management Corp. All Rights Reserved
							</p>
						</div>
						<div className='flex  mt-8 mb-8 gap-6 '>
							<a className='text-sm leading-5 text-typography-footer underline cursor-pointer'>
								Privacy & Cookie Policies
							</a>
							<a className='text-sm leading-5 text-typography-footer underline cursor-pointer'>
								Licenses Disclosures
							</a>
							<a className='text-sm leading-5 text-typography-footer underline cursor-pointer'>
								Investors
							</a>
							<a className='text-sm leading-5 text-typography-footer underline cursor-pointer'>
								Notice to California Residents
							</a>
							<a className='text-sm leading-5 text-typography-footer grow text-end'>
								<span>Built By</span>{' '}
								<a
									className='underline cursor-pointer'
									href='https://infinitymkt.com'>
									{' '}
									Infinity Marketing
								</a>
							</a>
						</div>
					</div>
				</div>
			</footer>
			<div className='bg-secondary xl:hidden lg:px-[3rem] lg:py-[4rem] block p-2 pt-6'>
				<img
					src='https://regionalfinance.com/wp-content/uploads/2023/11/logo-white.svg'
					style={{
						width: '200px',
						height: '54px',
						imageRendering: 'inherit',
						position: 'relative',
						zIndex: 1,
						marginBottom: 20,

						padding: 0,
					}}
				/>
				<div className='grid grid-cols-2 gap-1'>
					<div className='mb-[1.75rem] text-typography-footer px-2 lg:px-[47px] '>
						<p className='mb-1 text-md'>Call a local branch</p>
						<a
							className='mb-[1.25rem]'
							href='tel:+8886363535'>
							(888) 636-3535
						</a>

						{mobileFooterItems?.map((menu, index) => (
							<div
								key={index}
								className=' text-sm font-semibold py-1 text-white hover:underline cursor-pointer uppercase '>
								<a
									className='uppercase'
									href={menu.url}>
									{menu.title}
								</a>
							</div>
						))}
					</div>
					<div className='text-typography-footer px-1 '>
						<p className='mb-1'>Headquarters</p>
						<p className='text-sm'>
							Regional Management Corp.
							<br />
							979 Batesville Road, Suite B
							<br />
							Greer, SC 29651 <br />
							<a href='tel:+8644487000'>(864) 448-7000</a>
						</p>
						<div className='flex flex-col ml-3 mt-4 '>
							<a className='text-sm text-typography-footer py-2 underline cursor-pointer'>
								Privacy & Cookie Policies
							</a>
							<a className='text-sm text-typography-footer py-2  underline cursor-pointer'>
								Licenses Disclosures
							</a>
							<a className='text-sm  text-typography-footer py-2  underline cursor-pointer'>
								Investors
							</a>
							<a className='text-sm text-typography-footer py-2  underline cursor-pointer'>
								Notice to California Residents
							</a>
						</div>
					</div>
				</div>
				<div className='p-2 lg:px-[47px]'>
					<p className='text-typography-footer font-normal text-sm'>
						Regional Finance is licensed in AL, AZ, CA, GA, ID, IL, IN, LA, MO,
						MS, NC, NM, OK, SC, TN, TX, UT, VA, and WI.
						<br />
						For the residents of the state of Georgia only: Regional Finance
						Company of Georgia, LLC – NMLS # 2026923.
						<br /> Regional Finance Company of Virginia, LLC is licensed by the
						Virginia State Corporation Commission under the following license
						number: CFI-161. <br />
						Loan approval is subject to our standard credit policies. Loan size,
						term and rates may vary by state.
						<br /> California Residents: Loans made or arranged pursuant to a
						California Financing Law license.
					</p>
					<div className='my-4 '>
						<p className='text-sm leading-5 text-typography-footer cursor-pointer'>
							Copyright © 2023 Regional Management Corp. All Rights Reserved
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
