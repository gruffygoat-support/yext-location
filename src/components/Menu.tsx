import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { removeAmpersandCodeFromArray } from '../utils/helper';

const HeaderMenu = ({ menuName, dropDown }) => {
	return (
		<div className='flex items-center justify-center'>
			<Menu
				as='div'
				className='relative inline-block text-left'>
				{({ open }) => (
					<>
						<div className='flex items-center justify-center'>
							<Menu.Button className='inline-flex w-full justify-center rounded-md  px-4 py-2 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
								{menuName}

								{dropDown?.length > 0 && (
									<>
										{open ? (
											<ChevronUpIcon
												className='-mr-1  ml-1 mt-[3px] h-5 w-5 '
												aria-hidden='true'
											/>
										) : (
											<ChevronDownIcon
												className='-mr-1 ml-1 mt-[3px] h-5 w-5'
												aria-hidden='true'
											/>
										)}
									</>
								)}
							</Menu.Button>
						</div>
						{dropDown?.length > 0 && (
							<Transition
								as={Fragment}
								enter='transition ease-out duration-100'
								enterFrom='transform opacity-0 scale-95'
								enterTo='transform opacity-100 scale-100'
								leave='transition ease-in duration-75'
								leaveFrom='transform opacity-100 scale-100'
								leaveTo='transform opacity-0 scale-95'>
								<Menu.Items className='absolute z-50  mt-3 w-[200px] origin-top-right  rounded-md bg-white shadow-lg  '>
									{dropDown?.map((item) => (
										<div className='px-1 py-1 '>
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
