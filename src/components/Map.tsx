import * as React from 'react';
import MapBox, { Marker } from 'react-map-gl';
import Pin from './Pin';
import 'mapbox-gl/dist/mapbox-gl.css';
import Apis from '../utils/Apis';
import { Coordinate, MapProps } from '../types/MapProps';

const Map: React.FC<MapProps> = ({ slug, coordinates }) => {
	const cordinates = coordinates?.map((cords) => ({
		latitude: cords.cityCoordinate.latitude,
		longitude: cords.cityCoordinate.longitude,
	}));
	const [cords, setCords] = React.useState<Coordinate[]>(cordinates || []);
	const [Loading, setLoading] = React.useState<boolean>(slug ? true : false);

	const [viewport, setViewport] = React.useState<Coordinate>({
		longitude: cords[0]?.longitude || 0.0,
		latitude: cords[0]?.latitude || 0.0,
		zoom: 2,
	});
	const filteredCoordinates = async () => {
		const response = await Apis.getCoordinates(slug);
		setCords(response);
		setLoading(false);
	};
	React.useEffect(() => {
		if (slug) {
			filteredCoordinates();
		}
	}, []);
	const getBoundingBox = () => {
		if (cords.length === 0) {
			return null;
		}

		let minLng = cords[0].longitude;
		let maxLng = cords[0].longitude;
		let minLat = cords[0].latitude;
		let maxLat = cords[0].latitude;
		for (const cord of cords) {
			minLng = Math.min(minLng as number, cord.longitude as number);
			maxLng = Math.max(maxLng as number, cord.longitude as number);
			minLat = Math.min(minLat as number, cord.latitude as number);
			maxLat = Math.max(maxLat as number, cord.latitude as number);
		}

		return [
			[minLng, minLat],
			[maxLng, maxLat],
		];
	};

	React.useEffect(() => {
		const boundingBox = getBoundingBox();
		if (boundingBox) {
			// Fit the map viewport to include all the markers
			setViewport({
				longitude: (boundingBox[0][0] + boundingBox[1][0]) / 2,
				latitude: (boundingBox[0][1] + boundingBox[1][1]) / 2,
				zoom: 6.15,
				transitionDuration: 0,
			});
		}
	}, [cords]);

	const pins = cords.map((cord, index) => (
		<Marker
			key={`marker-${index}`}
			latitude={cord.latitude as number}
			longitude={cord.longitude as number}
			anchor='bottom'>
			<Pin size={30} />
		</Marker>
	));
	return (
		<>
			{Loading ? (
				<div
					role='status'
					className='max-w-lg animate-pulse'>
					<div className='h-[600px] bg-gray-200  dark:bg-gray-700 w-[600px] mb-4'></div>
				</div>
			) : (
				<MapBox
					mapboxAccessToken='pk.eyJ1IjoiYXNpbTEwMSIsImEiOiJjbG9zZ2d6ZHkwMDkwMmpxMG45ZmNxd2tmIn0.T0GtxGj_WhQ4t9FOzWKXgw'
					style={{
						width: '100%',
						height: '700px',
					}}
					{...viewport}
					interactive={false}
					attributionControl={false}
					mapStyle='mapbox://styles/mapbox/streets-v11'>
					<div className='cursor-pointer'>{pins}</div>
				</MapBox>
			)}
		</>
	);
};
export default Map;
