import * as React from 'react';
interface Document {
	c_cTATrustPilot: {
		cTAPhoto: { url: string }; // Assuming that cTAPhoto is a string representing the image URL
	};
	c_cTACreditKarma: {
		cTAPhoto: { url: string };
	};
	c_cTALendingTree: {
		cTAPhoto: { url: string };
	};
	c_cTABestCompany: {
		cTAPhoto: { url: string };
	};
	// Add more properties if necessary
}

interface ImageComponentProps {
	document: Document;
}
const ImageCard: React.FC<ImageComponentProps> = ({ document }) => {
	return (
		<div className='  flex-1 items-center justify-center py-10 mt-[40px] w-lg mx-auto lg:mx-[8rem]'>
			<p className=' text-3xl text-center text-typography-link font-semibold gap-y-5'>
				Trusted reviews from real customers *
			</p>
			<div className=' grid grid-cols-1 lg:grid-cols-4 gap-x-2  gap-y-4 my-[3rem] w-'>
				<div
					className='shadow-xl shadow-gray-200 p-2 rounded-lg ml-[22px]'
					style={{
						width: '288px',
						height: '90px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 10,
					}}>
					<img
						src={document.c_cTATrustPilot.cTAPhoto.url}
						className='object-cover'
						style={{ width: '45%', height: '100%' }}
					/>
				</div>
				<div
					className='shadow-xl shadow-gray-200 p-2 rounded-lg'
					style={{
						width: '288px',
						height: '90px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 10,
					}}>
					<img
						src={document.c_cTACreditKarma.cTAPhoto.url}
						className='object-cover'
						style={{ width: '60%', height: '100%' }}
					/>
				</div>
				<div
					className='shadow-xl shadow-gray-200 p-2 rounded-lg'
					style={{
						width: '288px',
						height: '90px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 10,
					}}>
					<img
						src={document.c_cTALendingTree.cTAPhoto.url}
						className='object-cover'
						style={{ width: '60%', height: '100%' }}
					/>
				</div>
				<div
					className='shadow-xl shadow-gray-200 p-2 rounded-lg'
					style={{
						width: '288px',
						height: '90px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 10,
					}}>
					<img
						src={document.c_cTABestCompany.cTAPhoto.url}
						className='object-cover'
						style={{ width: '35%', height: '100%' }}
					/>
				</div>
			</div>
			<p className='text-typography-breadcrumb text-center underline underline-offset-1 cursor-pointer '>
				<a
					className='leading-2 cursor-pointer'
					href='https://regionalfinance.com/reviews/'>
					See more reviews{' '}
				</a>
			</p>
			<p className='text-gray-400 text-center font-normal'>
				*These reviews reflect customer experiences of Regional Finance as a
				whole.
			</p>
		</div>
	);
};

export default ImageCard;
