export interface Coordinate {
	latitude?: number;
	longitude?: number;
	zoom?: number;
	transitionDuration?: number;
}
export interface MapProps {
	slug: string;
	coordinates?: Coordinate;
}
