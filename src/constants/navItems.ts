import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export const navItemsData = {
	categories: [
		{
			name: "Categories",
		},

		{ value: "all", name: "All" },
		{
			value: "men",
			name: "Men",
		},
		{
			value: "women",
			name: "Women",
		},
		{
			value: "kids",
			name: "Kids",
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
		name: "Whats New",
	},
	{
		id: 3,
		path: "/delivery",
		name: "Delivery",
	},
];
