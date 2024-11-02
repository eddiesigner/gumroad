import { getPreferenceValues, List, ActionPanel, Action } from "@raycast/api";
import { useFetch } from "@raycast/utils";

const token = getPreferenceValues<Preferences>().token;

type Response = {
  success: boolean;
  products: Product[];
};

type Product = {
  custom_permalink: string | null;
  custom_receipt: string | null;
  custom_summary: string;
  custom_fields: any[];
  customizable_price: number | null;
  description: string;
  deleted: boolean;
  max_purchase_count: number | null;
  name: string;
  preview_url: string | null;
  require_shipping: boolean;
  subscription_duration: string | null;
  published: boolean;
  url: string;
  id: string;
  price: number;
  purchasing_power_parity_prices: Record<string, number>;
  currency: string;
  short_url: string;
  thumbnail_url: string;
  tags: string[];
  formatted_price: string;
  file_info: Record<string, any>;
  sales_count: string;
  sales_usd_cents: string;
  is_tiered_membership: boolean;
  recurrences: string[] | null;
  variants: Variant[];
};

type Variant = {
  title: string;
  options: Option[];
};

type Option = {
  name: string;
  price_difference: number;
  purchasing_power_parity_prices: Record<string, number>;
  is_pay_what_you_want: boolean;
  recurrence_prices: Record<string, RecurrencePrice> | null;
};

type RecurrencePrice = {
  price_cents: number;
  suggested_price_cents: number | null;
  purchasing_power_parity_prices: Record<string, number>;
};

export default function Command() {
  const { data } = useFetch<Response>(
    `https://api.gumroad.com/v2/products?access_token=${token}`
  );

  return (
    <List isLoading={!data}>
      {data?.products.map((product) => (
        <List.Item
          key={product.id}
          title={product.name}
          subtitle={product.formatted_price}
          icon={product.thumbnail_url ? { source: product.thumbnail_url } : undefined}
          accessories={[
            {
              text: `${product.sales_count} sales`,
            },
          ]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={product.short_url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
