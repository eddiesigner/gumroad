import { getPreferenceValues, List, ActionPanel, Action, Icon, Color } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { SalesResponse } from "./types";
import { formatDate } from "./utils";
import { SaleDetails } from "./sale-details";

const token = getPreferenceValues<Preferences>().token;

export default function Command() {
  const { data } = useFetch<SalesResponse>(
    `https://api.gumroad.com/v2/sales?access_token=${token}`
  );

  return (
    <List isLoading={!data}>
      {data?.sales.map((sale) => (
        <List.Item
          key={sale.id}
          title={sale.product_name}
          subtitle={formatDate(sale.created_at)}
          icon={ {source: Icon.Coins, tintColor: Color.Magenta }}
          accessories={[
            {
              text: sale.formatted_total_price,
              icon: { source: Icon.BankNote, tintColor: Color.Green },
            },
          ]}
          actions={
            <ActionPanel>
              <Action.Push title="Show Details" target={<SaleDetails sale={sale} />} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
