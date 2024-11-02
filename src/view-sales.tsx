import { getPreferenceValues, List, Icon, Color } from "@raycast/api";
import { useFetch } from "@raycast/utils";

const token = getPreferenceValues<Preferences>().token;

type Response = {
  success: boolean;
  next_page_url: string;
  next_page_key: string;
  sales: Sale[];
};

type Sale = {
  id: string;
  email: string;
  seller_id: string;
  timestamp: string;
  daystamp: string;
  created_at: string;
  product_name: string;
  product_has_variants: boolean;
  price: number;
  gumroad_fee: number;
  subscription_duration: string;
  formatted_display_price: string;
  formatted_total_price: string;
  currency_symbol: string;
  amount_refundable_in_currency: string;
  product_id: string;
  product_permalink: string;
  partially_refunded: boolean;
  chargedback: boolean;
  purchase_email: string;
  zip_code: string;
  paid: boolean;
  has_variants: boolean;
  variants: Record<string, string>;
  variants_and_quantity: string;
  has_custom_fields: boolean;
  custom_fields: Record<string, string>;
  order_id: number;
  is_product_physical: boolean;
  purchaser_id: string;
  is_recurring_billing: boolean;
  can_contact: boolean;
  is_following: boolean;
  disputed: boolean;
  dispute_won: boolean;
  is_additional_contribution: boolean;
  discover_fee_charged: boolean;
  is_gift_sender_purchase: boolean;
  is_gift_receiver_purchase: boolean;
  referrer: string;
  card: Card;
  product_rating: number | null;
  reviews_count: number;
  average_rating: number;
  subscription_id: string;
  cancelled: boolean;
  ended: boolean;
  recurring_charge: boolean;
  license_key: string;
  license_id: string;
  license_disabled: boolean;
  affiliate: Affiliate;
  quantity: number;
};

type Card = {
  visual: string | null;
  type: string | null;
};

type Affiliate = {
  email: string;
  amount: string;
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export default function Command() {
  const { data } = useFetch<Response>(
    `https://api.gumroad.com/v2/sales?access_token=${token}`
  );

  return (
    <List isLoading={!data}>
      {data?.sales.map((sale) => (
        <List.Item
          key={sale.id}
          title={sale.product_name}
          subtitle={formatDate(sale.created_at)}
          accessories={[
            {
              text: sale.formatted_total_price,
              icon: { source: Icon.BankNote, tintColor: Color.Green },
            },
          ]}
        />
      ))}
    </List>
  )
}
