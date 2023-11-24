import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Faqs = ({ question, answer, toggleFaq, setToggleFaq, faqId, index }) => {
	return (
		<div className=' flex flex-col  bg-faqBanner w-max lg:w-[731px] w-[350px] p-6 '>
			<div
				className='flex  justify-between text-typography-link font-semibold
						 '>
				{question}
				{toggleFaq ? (
					<FaMinus
						className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer'
						size={24}
						onClick={setToggleFaq}
					/>
				) : (
					<FaPlus
						className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100  duration-300 cursor-pointer'
						size={24}
						onClick={setToggleFaq}
					/>
				)}
			</div>
			{toggleFaq && (
				<>
					<div className={`transition duration-150 ease-in-out mt-5 `}>
						<div className='border-t border-gray-500 mb-4' />
						{answer}
					</div>
				</>
			)}
		</div>
	);
};

export default Faqs;
