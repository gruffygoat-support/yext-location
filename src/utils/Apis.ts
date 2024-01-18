import axios from 'axios';
import { Coordinate, MapProps } from '../types/MapProps';
import { fetch } from '@yext/pages/util';

export default class Apis {
	static async getCoordinates(slug: MapProps): Promise<any> {
		const url = `https://cdn.yextapis.com/v2/accounts/1499906/entities?v=20161012&entityType=location&limit=50`;
		//const isoRegionCodeFilter = `{"isoRegionCode":{"$eq":"${slug.toUpperCase()}"}}`;
		const isoRegionCodeFilter = `{"isoRegionCode":{"$eq":"${slug.toUpperCase()}"}, "closed":{"$eq":false}}`;
		const { data } = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
				'Api-Key': 'ef8da365f161cd1eae34f56b93f13441',
			},
			params: {
				filter: isoRegionCodeFilter,
			},
		});
		return data.response.entities.map((entity: any) => entity.cityCoordinate);
	}
	static async getStatesInfo(slug: MapProps, offset = 0): Promise<any> {
		const url = `https://cdn.yextapis.com/v2/accounts/1499906/entities?v=20161012&entityType=location&limit=50&offset=${offset}`;

		//const isoRegionCodeFilter = `{"isoRegionCode":{"$eq":"${slug.toUpperCase()}"}}`;
		const isoRegionCodeFilter = `{"isoRegionCode":{"$eq":"${slug.toUpperCase()}"}, "closed":{"$eq":false}}`;
		const { data } = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
				'Api-Key': 'ef8da365f161cd1eae34f56b93f13441',
			},
			params: {
				filter: isoRegionCodeFilter,
			},
		});
		return data.response;
	}

	static async getHeaderMenuNav(): Promise<any> {
		const apiUrl = `https://regionalfinance.com/wp-json/menu-api/v2/header-menu/`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		return data;
	}
	static async getDesktopFooter(): Promise<any> {
		const apiUrl = `https://regionalfinance.com/wp-json/menu-api/v2/footer-menu/`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		return data;
	}
	static async getMobileFooter(): Promise<any> {
		const apiUrl = `https://regionalfinance.com/wp-json/menu-api/v2/footer-mobile-menu/`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		return data;
	}

	// static hasActiveSubscription(org: Org): boolean {
	// 	// Stripe
	// 	const hasActiveStripeSubscription =
	// 		org?.stripe_subscription?.status == 'active';
	// 	// Shopify
	// 	const shopifySubscriptions = org?.shopify?.subscriptions ?? [];
	// 	const hasActiveShopifySubscription =
	// 		shopifySubscriptions.length > 0 &&
	// 		shopifySubscriptions.some(
	// 			(subscription: any) => subscription.status == 'ACTIVE'
	// 		);
	// 	// Return
	// 	return hasActiveStripeSubscription || hasActiveShopifySubscription;
	// }

	// static subscriptionProductID(org: Org): string | undefined {
	// 	const shopifySubscriptions = org?.shopify?.subscriptions ?? [];
	// 	return (
	// 		shopifySubscriptions[0]?.stripeProductID ??
	// 		org?.stripe_subscription?.plan?.product
	// 	);
	// }

	// static getBillingCycleStartDate(org: Org): Date | undefined {
	// 	// Shopify
	// 	const allShopifySubscriptions = org?.shopify?.subscriptions ?? [];
	// 	const shopifySubscription = allShopifySubscriptions[0];
	// 	if (shopifySubscription && shopifySubscription.currentPeriodEnd) {
	// 		// Subtract 30 days to get the current period start. Note that Shopify billing cycles are 30 days, not 1 month.
	// 		return new Date(
	// 			new Date(shopifySubscription.currentPeriodEnd).getTime() -
	// 				30 * 24 * 60 * 60 * 1000
	// 		);
	// 	}
	// 	// Stripe
	// 	const stripeSubscription = org?.stripe_subscription;
	// 	if (stripeSubscription && stripeSubscription.current_period_start) {
	// 		return new Date(stripeSubscription.current_period_start * 1000); // Convert Unix timestamp to JavaScript Date object
	// 	}
	// 	// Neither
	// 	return undefined;
	// }

	// static getBillingCycleEndDate(org: Org): Date | undefined {
	// 	// Shopify
	// 	const allShopifySubscriptions = org?.shopify?.subscriptions ?? [];
	// 	const shopifySubscription = allShopifySubscriptions[0];
	// 	if (shopifySubscription && shopifySubscription.currentPeriodEnd) {
	// 		return new Date(shopifySubscription.currentPeriodEnd);
	// 	}
	// 	// Stripe
	// 	const stripeSubscription = org?.stripe_subscription;
	// 	if (stripeSubscription && stripeSubscription.current_period_end) {
	// 		return new Date(stripeSubscription.current_period_end * 1000); // Convert Unix timestamp to JavaScript Date object
	// 	}
	// 	// Neither
	// 	return undefined;
	// }

	// static getSeatsCount(org: Org): number {
	// 	const allShopifySubscriptions = org?.shopify?.subscriptions ?? [];
	// 	const shopifySubscription = allShopifySubscriptions[0];
	// 	if (shopifySubscription) {
	// 		return shopifySubscription.seats ?? 0; // Shopify
	// 	} else {
	// 		return org?.stripe_subscription?.quantity ?? 0; // Stripe
	// 	}
	// }
}
