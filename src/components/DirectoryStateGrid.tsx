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
		childrenDivs = sortedChildren.map((child: DirectoryChild) => (
			<div key={child.slug}>
				<a
					key='uRL'
					href={relativePrefixToRoot + child.slug}
					className='font-semibold text-md text-typography-link hover:underline  '>
					{child.name}{' '}
					<span className='text-typography-lightGray text-xs font-normal'>
						({child.dm_childEntityIds?.length || 0})
					</span>
				</a>
			</div>
		));
	}
	return (
		<>
			<div className='space-y-10 mt-6 '>
				{directoryChildren && (
					<div className='grid grid-cols-3 text-base  gap-x-2 gap-y-[1.5rem]'>
						{childrenDivs}
					</div>
				)}
			</div>
		</>
	);
};

export default DirectoryStateGrid;
