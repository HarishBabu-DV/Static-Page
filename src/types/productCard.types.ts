export interface ProductCardProps {
	prodId: number;
	width: string | number;
	height: string | number;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description: string;
	price: string | number;
	rating: number;
}

export type RatingsProps = {
	rating: number;
};

export type FavoriteButtonProps = {
	id: number;
};
