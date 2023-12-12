import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { removeAmpersandCodeFromArray } from '../utils/helper';
import { FaAngleRight } from 'react-icons/fa';

const HeaderMenu = ({ menuName, dropDown }) => {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='lg:flex lg:items-center lg:justify-center'>
			<Menu
				as='div'
				className='relative inline-block text-left'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
				{({ open }) => (
					<>
						<div className='flex items-center justify-center'>
							<Menu.Button
								ref={buttonRef}
								className={`inline-flex w-full lg:w-max justify-center rounded-md text-typography-link px-4 py-2 lg:px-0 xl:px-4 text-xs font-bold  duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
								`}
								onClick={handleClick}>
								<span className='hover:text-primary'>{menuName}</span>

								{dropDown?.length > 0 && (
									<>
										<span
											className={`${
												isOpen ? 'transform rotate-90' : ''
											} transition-transform duration-500 -mr-1  mt-[5px] hover:text-typography-link `}>
											<FaAngleRight
												className=' h-[16px] w-[24px]  font-bold'
												aria-hidden='true'
											/>
										</span>
									</>
								)}
							</Menu.Button>
						</div>
						{dropDown?.length > 0 && (
							<Transition
								as={Fragment}
								show={isOpen}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'>
								<Menu.Items className='absolute z-50 mt-3 w-[200px] origin-top-right rounded-md bg-white shadow-lg'>
									{dropDown?.map((item) => (
										<div
											className='px-1 py-1 '
											key={item.title}>
											<Menu.Item>
												{({ active }) => (
													<a
														href={item.url}
														className={
															'group text-secondary font-bold flex w-full items-center rounded-md px-2 py-2 text-xs font-bold cursor-pointer'
														}>
														{removeAmpersandCodeFromArray(item.title)}
													</a>
												)}
											</Menu.Item>
										</div>
									))}
								</Menu.Items>
							</Transition>
						)}
					</>
				)}
			</Menu>
		</div>
	);
};

export default HeaderMenu;
