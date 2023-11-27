import * as React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { formatPhoneNumber } from 'react-phone-number-input';

const Content = ({ document }) => {
	return (
		<div>
			<div className='flex items-center gap-5 mb-4'>
				<BsPersonCircle className='h-[24px] w-[24px] md:h-[20px] md:w-[20px]' />
				<div>
					<p className='text-xs font-bold text-typography-link'>
						{' '}
						Branch Manager:
					</p>{' '}
					<p className='mt-2 text-s font-normal'>{document?.c_branchManager}</p>
				</div>
			</div>
			<div className='flex items-center gap-5 mb-4'>
				<FaLocationDot className='-ml-[0.2rem] h-[24px] w-[24px] md:h-[20px] md:w-[20px]' />
				<div className='my-4'>
					<p className='text-xs font-bold text-typography-link'> Location: </p>

					<p className='mt-2 text-s font-normal'>{document?.address?.line1}</p>
				</div>
			</div>
			<div className='flex items-center gap-5 mb-4'>
				<FaPhoneAlt className='h-[24px] w-[24px] md:h-[20px] md:w-[20px]' />

				<div className='flex flex-col  gap-y-2'>
					<p className='text-s font-normal w-max'>
						Phone:{' '}
						<span className='text-typography-breadcrumb text-s font-medium underline'>
							{formatPhoneNumber(document?.mainPhone)}
						</span>
					</p>
					<p className='text-s font-normal'>
						Fax:{' '}
						<span className='text-typography-breadcrumb    font-medium underline'>
							{formatPhoneNumber(document?.fax)}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Content;
