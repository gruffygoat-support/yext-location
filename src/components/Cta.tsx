import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CtaProps {
	buttonText: string;
	url?: string;
	style?: string;
	action?: any;
}

const Cta = ({ buttonText, url, style, action }: CtaProps) => {
	return (
		<div className='flex items-center justify-center'>
			<a
				href={url}
				onClick={action}
				className={twMerge(
					'py-2 px-2  xl:py-4 lg:px-6 text-xs md:text-xs md:font-semibold lg:text-s lg:font-semibold font-bold lg:w-max rounded-lg hover:scale-[1.02] duration-250',
					style
				)}
				target=''
				rel='noopener noreferrer'>
				{buttonText}
			</a>
		</div>
	);
};

export default Cta;
