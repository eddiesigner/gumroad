import { getPreferenceValues, List, ActionPanel, Action, Icon, Color } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { ProductsResponse } from "./types";
import { ProductDetails } from "./product-details";

const token = getPreferenceValues<Preferences>().token;

export default function Command() {
  const { data } = useFetch<ProductsResponse>(
    `https://api.gumroad.com/v2/products?access_token=${token}`
  );

  return (
    <List isLoading={!data}>
      {data?.products.map((product) => (
        <List.Item
          key={product.id}
          title={product.name}
          subtitle={product.formatted_price}
          icon={product.thumbnail_url ? { source: product.thumbnail_url } : { source: Icon.Image, tintColor: Color.Magenta }}
          accessories={[
            {
              text: `${product.sales_count} Sales`,
            },
          ]}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" target={<ProductDetails product={product} />} />
              <Action.OpenInBrowser url={product.short_url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
