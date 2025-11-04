export type ServicesList = {
	name: string;
	description: string;
};

export interface Services {
	heading: string;
	services: ServicesList[];
}
