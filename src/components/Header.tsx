import * as React from 'react';
import Cta from './Cta';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Apis from '../utils/Apis';
import HeaderMenu from './Menu';

const navigation = [
	{ name: 'Loans', href: '/' },
	{ name: 'Locations', href: '#' },
	{ name: 'Education', href: '#' },
	{ name: 'About us', href: '#' },
	{ name: 'Payment Options', href: '#' },
];

const Header = ({ navigation }) => {
	return (
		<Disclosure
			as='nav'
			className='bg-white shadow'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-6'>
						<div className='flex h-24 justify-between'>
							<div className='flex justify-between '>
								<div className='flex flex-shrink-0 items-center '>
									<img
										className='block lg:hidden'
										src='https://regionalfinance.com/wp-content/uploads/2023/11/logo.svg'
										alt='Your Company'
										width='100'
										height='100'
									/>
									<img
										className='hidden lg:block'
										src='https://regionalfinance.com/wp-content/uploads/2023/11/logo.svg'
										alt='Your Company'
										style={{
											backgroundSize: 'cover', // or 'contain' depending on your preference
											backgroundPosition: 'center center', // adjust as needed
											width: '151px',
											height: '35px',
											imageRendering: 'inherit',
											position: 'relative', // if you need to adjust other elements on top
											zIndex: 1, // adjust as needed based on your layout
											margin: 0, // reset margin
											padding: 0, // reset padding
										}}
									/>
								</div>
								<div className='-ml-2 mr-2 flex  md:hidden '>
									{/* Mobile menu button */}
									<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500  focus:ring-orange'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XMarkIcon
												className='block h-[50px] w-[50px] text-secondary font-semibold'
												aria-hidden='true'
											/>
										) : (
											<Bars3Icon
												className='block h-[55px] w-[55px] text-secondary font-bold'
												aria-hidden='true'
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className='hidden gap-x-6 md:ml-6  lg:ml-9 md:flex md:space-x-4'>
									{navigation.map((link) => (
										<HeaderMenu
											menuName={link.name}
											dropDown={link?.dropDown}
										/>
									))}
								</div>
							</div>
							<div className='flex items-center gap-2 lg:flex hidden'>
								<Cta
									buttonText='Prequalify Now'
									url='#'
									style='text-white bg-blue-400 shadow-md bg-secondary '
								/>
								<Cta
									buttonText='Login'
									url='#'
									style='text-white bg-orange shadow-md bg-primary text-center w-[100px]'
								/>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='md:hidden'>
						<div className='space-y-1 pt-2 pb-3'>
							{navigation.map((link) => (
								<Disclosure.Button
									key={link.href}
									as='a'
									href={link.href}
									className='block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6'>
									{link.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Header;
