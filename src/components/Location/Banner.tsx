import { classNames } from '../../utils/CssUtil';
import * as React from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const VARIANTS = {
	positive:
		'bg-Alerts-Positive-Lighter text-Alerts-Positive-Dark [&>button]:after:bg-Alerts-Positive-Light [&>svg]:text-Alerts-Positive-Light',
	negative:
		'bg-Alerts-Negative-Lighter text-Alerts-Negative-Dark [&>button]:after:bg-Alerts-Negative-Light [&>svg]:text-Alerts-Negative-Light',
	accent:
		'bg-Accents-Accent2-Lighter text-Accents-Accent2-Dark [&>button]:after:bg-Accents-Accent2-Light [&>svg]:text-Accents-Accent2-Light',
	default:
		'bg-secondary text-typography-white [&>button]:after:bg-Accents-Accent1-Light [&>svg]:text-Accents-Accent1-Light',
};

type VARIANTS_TYPE = keyof typeof VARIANTS;

interface BannerProps {
	variant?: VARIANTS_TYPE;
	content?: string;
	url?: string;
	urlLabel?: string;
	emoji?: string;
}

export const Banner: React.FunctionComponent<BannerProps> = ({
	variant = 'default',
	content,
	url,
	urlLabel,
	emoji,
}) => {
	return (
		<>
			<div
				className={classNames(
					'flex items-center justify-center pt-3 pb-4   lg:text-base text-center font-semibold',
					VARIANTS[variant]
				)}>
				<IoMdInformationCircleOutline className='mt-[2px] mr-2 w-5 h-5' />
				<p className='text-[12px] font-semibold'>{content}</p>
				{url && (
					<a href={url}>
						<button className='ml-2 relative after:absolute after:w-full after:h-[2px] after:left-0 after:bottom-[-3px]'>
							{urlLabel}
						</button>
					</a>
				)}
				{emoji && <span className='px-3 text-base md:text-lg'>{emoji}</span>}
			</div>
		</>
	);
};
