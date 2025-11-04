import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export const navItemsData = {
	categories: [
		{
			label: "Categories",
			value: "categories",
		},
		{
			value: "all",
			label: "All",
		},
		{
			value: "men",
			label: "Men",
		},
		{
			value: "women",
			label: "Women",
		},
		{
			value: "kids",
			label: "Kids",
		},
	],
	quickAccess: [
		{
			name: "Account",
			icon: UserOutlined,
		},
		{
			name: "Cart",
			icon: ShoppingCartOutlined,
		},
	],
};

export const navItems = [
	{
		id: 1,
		path: "/details",
		name: "Details",
	},
	{
		id: 2,
		path: "/whats-new",
		name: "What'sNew",
	},
	{
		id: 3,
		path: "/delivery",
		name: "Delivery",
	},
];
