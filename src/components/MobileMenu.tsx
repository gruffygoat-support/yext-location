// import { Menu, Transition } from '@headlessui/react';
// import { Fragment, useRef, useState } from 'react';
// import { removeAmpersandCodeFromArray } from '../utils/helper';
// import { FaAngleRight } from 'react-icons/fa';

// const MobileMenu = ({ menuName, dropDown }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const buttonRef = useRef(null);

// 	const handleMouseEnter = () => {
// 		setIsOpen(true);
// 	};

// 	const handleMouseLeave = () => {
// 		setIsOpen(false);
// 	};

// 	const handleClick = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	return (
// 		<div className='flex flex-col items-start  '>
// 			<div className='flex  items-center w-[100%]'>
// 				<span
// 					className='font-bold  w-[90%] py-[24px]'
// 					style={{
// 						borderBottom: '1px solid',
// 						borderBottomColor: '#000',
// 					}}>
// 					{menuName}
// 				</span>
// 				{dropDown?.length > 0 && (
// 					<>
// 						<span
// 							className={`${
// 								isOpen ? 'transform rotate-90' : ''
// 							} transition-transform duration-500    hover:text-typography-link `}
// 							onClick={handleClick}>
// 							<FaAngleRight
// 								className=' h-[16px] w-[24px]  font-bold'
// 								aria-hidden='true'
// 							/>
// 						</span>
// 					</>
// 				)}
// 			</div>
// 			<hr />
// 			<div className='transition-transform duration-500 transform scale-y-100'>
// 				{isOpen && (
// 					<div className='overflow-hidden transition-transform duration-500 transform scale-y-100'>
// 						{dropDown?.map((item) => (
// 							<div
// 								className='py-1'
// 								key={item.title}>
// 								<a
// 									href={item.url}
// 									className='text-secondary font-bold w-full py-2 text-xs font-bold cursor-pointer'>
// 									{removeAmpersandCodeFromArray(item.title)}
// 								</a>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default MobileMenu;

// import { Menu, Transition } from '@headlessui/react';
// import { Fragment, useRef, useState } from 'react';
// import { removeAmpersandCodeFromArray } from '../utils/helper';
// import { FaAngleRight } from 'react-icons/fa';

// const MobileMenu = ({ menuName, dropDown }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const buttonRef = useRef(null);

// 	const handleMouseEnter = () => {
// 		setIsOpen(true);
// 	};

// 	const handleMouseLeave = () => {
// 		setIsOpen(false);
// 	};

// 	const handleClick = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	return (
// 		<div className='flex flex-col items-start '>
// 			<div className='flex items-center w-[100%]'>
// 				<span
// 					className='font-bold w-[90%] py-[24px]'
// 					style={{
// 						borderBottom: '1px solid',
// 						borderBottomColor: '#000',
// 					}}>
// 					{menuName}
// 				</span>
// 				{dropDown?.length > 0 && (
// 					<>
// 						<span
// 							className={`${
// 								isOpen ? 'transform rotate-90' : ''
// 							} transition-transform duration-500    hover:text-typography-link `}
// 							onClick={handleClick}>
// 							<FaAngleRight
// 								className=' h-[16px] w-[24px]  font-bold'
// 								aria-hidden='true'
// 							/>
// 						</span>
// 					</>
// 				)}
// 			</div>
// 			<hr />
// 			<Transition
// 				show={isOpen}
// 				enter='transition-transform duration-[1200ms] '
// 				enterFrom='transform opacity-90'
// 				enterTo='transform opacity-100 '
// 				leave='transition-transform duration-500 ease-in'
// 				leaveFrom='transform scale-y-100'
// 				leaveTo='transform scale-y-95'>
// 				{(ref) => (
// 					<div
// 						ref={ref}
// 						className='overflow-hidden'>
// 						{dropDown?.map((item) => (
// 							<div
// 								className='py-1'
// 								key={item.title}>
// 								<a
// 									href={item.url}
// 									className='text-secondary font-bold w-full py-2 text-xs font-bold cursor-pointer'>
// 									{removeAmpersandCodeFromArray(item.title)}
// 								</a>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</Transition>
// 		</div>
// 	);
// };

// export default MobileMenu;

import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { removeAmpersandCodeFromArray } from '../utils/helper';

const MobileMenu = ({ menuName, dropDown }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='flex flex-col items-start '>
			<div className='flex items-center w-[100%]'>
				<span className='font-bold w-[100%] py-[24px] text-typography-link'>
					{menuName}
				</span>
				{dropDown?.length > 0 && (
					<>
						<span
							className={`${
								isOpen ? 'transform rotate-90' : ''
							} transition-transform duration-500 hover:text-typography-link `}
							onClick={handleClick}>
							<FaAngleRight
								className='h-[16px] w-[24px] font-bold'
								aria-hidden='true'
							/>
						</span>
					</>
				)}
			</div>

			<div
				className={`overflow-hidden transition-max-height duration-[500ms]   ${
					isOpen ? 'max-h-[500px] mb-5' : 'max-h-0'
				}`}>
				{dropDown?.map((item) => (
					<div
						className='py-1'
						key={item.title}>
						<a
							href={item.url}
							className='text-typography-link opacity-[0.75] font-bold w-full py-2 text-xs font-bold cursor-pointer'>
							{removeAmpersandCodeFromArray(item.title)}
						</a>
					</div>
				))}
			</div>
			<div
				className='font-bold w-[80vw]   text-typography-link'
				style={{
					borderBottom: '1px solid',
					borderBottomColor: '#102b51',
				}}
			/>
		</div>
	);
};

export default MobileMenu;
