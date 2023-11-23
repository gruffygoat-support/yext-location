import * as React from 'react';

import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '40%',
				}}>
				<TailSpin
					height='100'
					width='100'
					color='#102B51'
					ariaLabel='tail-spin-loading'
					radius='1'
					wrapperStyle={{}}
					wrapperClass=''
					visible={true}
				/>
			</div>
		</>
	);
};

export default Loader;
