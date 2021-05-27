import { NDJSON } from "https://js.sabae.cc/NDJSON.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { getDate } from "https://js.sabae.cc/getDate.js";
import { JAPAN_PREF, JAPAN_PREF_EN, JAPAN_PREF_ISO } from "https://js.sabae.cc/JAPAN_PREF.js";

const url = "https://vrs-data.cio.go.jp/vaccination/opendata/latest/prefecture.ndjson";

const download = async () => {
  const ndjson = await (await fetch(url)).text();
  const data = NDJSON.parse(ndjson);
  console.log(data);
  
  const fn = getDate();
  await Deno.writeTextFile("latest.ndjson", ndjson);
  const csv = CSV.stringify(data);
  await Deno.writeTextFile("latest.csv", csv);
  await Deno.writeTextFile("data/" + fn + ".csv", csv);
};
const makeSummary = async () => {
  const data = CSV.parse(await Deno.readTextFile("latest.csv"));
  const res = [];
  for (let i = 1; i <= 47; i++) {
    const no = i < 10 ? "0" + i : i;
    let sum = 0;
    let mid = 0;
    let date = "2000-01-01";
    for (const d of data) {
      if (d.prefecture == no) {
        if (d.status == 2) {
          sum += parseInt(d.count);
        } else {
          mid += parseInt(d.count);
        }
        if (new Date(d.date).getTime() > new Date(date).getTime()) {
          date = d.date;
        }
      }
    }
    res.push({
      "ISO3166-2": JAPAN_PREF_ISO[i - 1],
      pref: JAPAN_PREF[i - 1],
      sum,
      mid,
      date,
    });
  }
  //console.log(data);
  console.log(res);
  await Deno.writeTextFile("latest_summary.csv", CSV.stringify(res));
};
await makeSummary();
