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
					'py-2 px-2  text-xs md:text-xs md:font-semibold lg:text-s lg:font-semibold font-normal  lg:w-max rounded-lg ',
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
