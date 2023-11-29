import { Disclosure, Transition } from '@headlessui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import * as React from 'react';

interface FaqProps {
	question: string;
	answer: string;
}

const Faqs: React.FC<FaqProps> = ({ question, answer }) => {
	return (
		<Disclosure>
			{({ open }) => (
				<div className='flex flex-col bg-faqBanner w-max lg:w-[731px] w-[350px] md:w-[500px] p-6 cursor-pointer'>
					<Disclosure.Button className='flex justify-between text-typography-link font-semibold'>
						<span>{question}</span>
						{open ? (
							<FiMinus
								className='text-primary font-normal cursor-pointer'
								size={24}
							/>
						) : (
							<FiPlus
								className='text-primary font-normal cursor-pointer'
								size={24}
							/>
						)}
					</Disclosure.Button>
					<Transition
						enter='transition-all ease-in duration-[900ms]'
						enterFrom='opacity-0 max-h-0'
						enterTo='opacity-100 max-h-[500px]'
						leave='transition-all ease-out duration-[800ms]'
						leaveFrom='opacity-100 max-h-[500px]'
						leaveTo='opacity-0 max-h-0'>
						{(ref) => (
							<div
								ref={ref}
								className='mt-5'>
								<div className='border-t border-gray-500 mb-4 transition ease-in-out delay-1000' />
								{answer}
							</div>
						)}
					</Transition>
				</div>
			)}
		</Disclosure>
	);
};

export default Faqs;
