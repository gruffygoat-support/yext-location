import * as React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { BsPersonCircle } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { formatPhoneNumber } from 'react-phone-number-input';
import { BranchIcon, LocationIcon, PhoneIcon } from './Svgs';
import { FiPhone } from 'react-icons/fi';
const Content = ({ document }) => {
	return (
		<div>
			{document?.c_branchManager && (
				<div className='flex  gap-4 mb-4'>
					<div className='mt-[5px]'>
						<BranchIcon />
					</div>

					<p className='text-xs font-bold text-typography-link'>
						Branch Manager:
						<br />
						<span className=' text-s font-normal '>
							{document?.c_branchManager}
						</span>
					</p>
				</div>
			)}

			<div className='flex gap-4 mb-4'>
				<div className='mt-[6px]'>
					<LocationIcon />
				</div>
				<div className='flex flex-col'>
					<p className='text-xs font-bold text-typography-link'>
						{' '}
						Location:
						<br />
						<span className=' text-s font-normal '>
							{document?.address?.line1}
							{', '}
							{document?.address?.localizedRegionName}
							{','} {document?.address?.region} {document?.address?.postalCode}
						</span>
					</p>
				</div>
			</div>
			<div className='flex items-center gap-4 mb-4'>
				<FiPhone
					fill='#EBF5FF'
					stroke='#2E4369'
					strokeWidth={1.5}
					size={24}
				/>

				<div className='flex flex-col'>
					<p className='text-s text-typography-time font-normal w-max flex'>
						Phone:
						<div className='pl-4'>
							<span className='text-typography-breadcrumb text-s font-medium  border-b border-typography-breadcrumb mb-2'>
								{formatPhoneNumber(document?.mainPhone)}
							</span>
						</div>
					</p>
					{document?.fax && (
						<p className='text-s  text-typography-time font-normal flex'>
							Fax:
							<div className='pl-[2.1rem]'>
								<span className='text-typography-breadcrumb  border-b border-typography-breadcrumb  font-medium'>
									{formatPhoneNumber(document?.fax)}
								</span>
							</div>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Content;
