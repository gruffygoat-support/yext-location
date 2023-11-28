import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Faqs = ({ question, answer, toggleFaq, setToggleFaq }) => {
	return (
		<div
			className='flex flex-col bg-faqBanner w-max lg:w-[731px] w-[350px] p-6 cursor-pointer'
			onClick={(e) => {
				e.stopPropagation(); // Prevents the click event from reaching the parent div
				setToggleFaq();
			}}>
			<div className='flex justify-between text-typography-link font-semibold'>
				{question}
				{toggleFaq ? (
					<FiMinus
						className='text-primary font-normal   cursor-pointer'
						size={24}
						onClick={(e) => {
							e.stopPropagation(); // Prevents the click event from reaching the parent div
							setToggleFaq();
						}}
					/>
				) : (
					<FiPlus
						className=' text-primary font-normal  cursor-pointer'
						size={24}
						onClick={(e) => {
							e.stopPropagation(); // Prevents the click event from reaching the parent div
							setToggleFaq();
						}}
					/>
				)}
			</div>
			{toggleFaq && (
				<>
					<div className=' mt-5'>
						<div className='border-t border-gray-500 mb-4 transition ease-in-out delay-1000' />
						{answer}
					</div>
				</>
			)}
		</div>
	);
};

export default Faqs;
