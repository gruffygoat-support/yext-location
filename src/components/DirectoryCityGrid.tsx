import * as React from 'react';
import { Address } from '@yext/pages/components';
import { formatPhoneNumber } from 'react-phone-number-input';
import { DirectoryParent } from '../types/DirectoryParent';
import { DirectoryChild } from '../types/DirectoryChild';

export interface DirectoryGridProps {
	name?: string;
	slug?: string;
	description?: string;
	directoryParents?: DirectoryParent[];
	directoryChildren?: DirectoryChild[];
	relativePrefixToRoot?: string;
}

const sortByCity = (a: DirectoryChild, b: DirectoryChild) => {
	const first = a.address.city;
	const second = b.address.city;
	return first < second ? -1 : first > second ? 1 : 0;
};
const transformedName = (child) => {
	const name = child.name;
	let updatedName;
	if (name.includes('CLOSED')) {
		updatedName = child.address.line1.concat(' - CLOSED').split(' ').join(' ');
		return updatedName;
	} else {
		return child.address.line1;
	}
};

const DirectoryCityGrid = ({
	name,
	slug,
	description,
	directoryChildren,
	relativePrefixToRoot,
}: DirectoryGridProps) => {
	let childrenDivs;

	if (directoryChildren) {
		const sortedChildren = directoryChildren?.sort(sortByCity) || [];
		childrenDivs = sortedChildren.map((child: any) => (
			<div key={child.slug}>
				<a
					key='uRL'
					href={relativePrefixToRoot + child.slug}
					className='font-semibold text-[18px]  md:text-s capitalize lg:text-[18px] text-typography-link hover:underline mr-2 '>
					{/* {child.slug.split('-').join(' ')}
					{child.name.split('-').at(1)} */}
					{transformedName(child)}
				</a>
				<span className='text-typography-lightGray text-xs font-normal'>
					({child.dm_childEntityIds?.length || 1})
				</span>
			</div>
		));
	}
	return (
		<>
			<div className='space-y-10 mt-6 '>
				{directoryChildren && (
					<div className='grid  grid-cols-1 gap-8 max-w-[25rem] md:gap-x-2 lg:grid-cols-2  lg:gap-4 xl:gap-x-3 gap-y-[1.5rem]'>
						{childrenDivs}
					</div>
				)}
			</div>
		</>
	);
};

export default DirectoryCityGrid;
