import { getPreferenceValues, List, Icon, Color } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { SalesResponse } from "./types";

const token = getPreferenceValues<Preferences>().token;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

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
