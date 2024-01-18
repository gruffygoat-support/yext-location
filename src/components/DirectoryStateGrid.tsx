import * as React from 'react';
import { DirectoryParent } from '../types/DirectoryParent';
import { DirectoryChild } from '../types/DirectoryChild';

interface DirectoryGridProps {
	name?: string;
	description?: string;
	directoryParents?: DirectoryParent[];
	directoryChildren?: DirectoryChild[];
	relativePrefixToRoot?: string;
}

const sortByName = (
	a: DirectoryParent | DirectoryChild,
	b: DirectoryParent | DirectoryChild
) => {
	return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};

const DirectoryStateGrid = ({
	name,
	description,
	directoryChildren,
	relativePrefixToRoot,
}: DirectoryGridProps) => {
	let sortedChildren;
	let childrenDivs;
	if (directoryChildren) {
		sortedChildren = directoryChildren?.sort(sortByName) || [];
		childrenDivs = sortedChildren.filter((child: DirectoryChild) => !child.name.includes("CLOSED")).map((child: DirectoryChild) => (
 		  			<div
				key={child.slug}
				className='w-max'>
 				<a					key='uRL'
					href={
						child.dm_childEntityIds?.length > 1
							? relativePrefixToRoot + child.slug
							: child.designation
					}
					className='font-semibold text-[18px] small:text-[14px] md:text-s  lg:text-[18px] text-typography-link hover:underline  '>
					<span>{child.name}</span>{' '}
				</a>
				<span className='text-typography-lightGray text-xs font-normal'>
					({child.dm_childEntityIds?.length || 0})
				</span>
					    
			</div>
		 
		));
	}
	return (
		<>
			<div className='space-y-10 mt-6 '>
				{directoryChildren && (
					<div className='grid  grid-cols-2 w-max max-w-lg   lg:grid-cols-2 xl:grid-cols-3 md:gap-x-2  md:grid-cols-3 gap-6  small:gap-x-[1.5rem] small:gap-y-[1rem]   xl:gap-x-[9.5rem] leading-[21.78px]'>
						{childrenDivs}
					</div>
				)}
			</div>
		</>
	);
};

export default DirectoryStateGrid;
