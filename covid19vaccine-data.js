import { CSV } from "https://js.sabae.cc/CSV.js";
import { JAPAN_PREF } from "https://js.sabae.cc/JAPAN_PREF.js";
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { Num } from "https://js.sabae.cc/Num.js";

const formatDate = (ymd) => {
	const d = new Day(ymd);
	return d.year + "年" + d.month + "月" + d.day + "日";
};

class Covid19VaccineData extends HTMLElement {
  constructor() {
		super();
		this.init();
	}
	async init() {
		// データ読み込み
		const csv = async (url) => CSV.parse(await (await fetch(url)).text());
		const data = await csv("https://code4fukui.github.io/covid19vaccine/latest_summary.csv")
		const pop = await csv("https://code4fukui.github.io/population_jp/population_jp.csv");
		//console.log(data, pop);
		for (let i = 0; i < 47; i++) {
			const p = pop[i].population_jp;
			const d = data[i];
			d.population = p;
			d.midrate = d.mid / p * 100;
			d.sumrate = d.sum / p * 100;
		}
		//console.log(data);
		
		// 全国合計計算
		const sum = { population: 0, mid: 0, sum: 0 };
		for (let i = 0; i < 47; i++) {
			const d = data[i];
			sum.population += parseInt(d.population);
			sum.mid += parseInt(d.mid);
			sum.sum += parseInt(d.sum);
			sum.date = d.date;
		}
		// 全国平均計算
		sum.midrate = sum.mid / sum.population * 100;
		sum.sumrate = sum.sum / sum.population * 100;

		const pref = this.getAttribute("pref") || "日本";
		const npref = JAPAN_PREF.indexOf(pref);
		//console.log(pref, npref, JAPAN_PREF);

		const cr = (tag, cls, val) => {
			const c = document.createElement(tag);
			c.className = cls;
			if (val) {
				c.textContent = val;
			}
			return c;
		};
		const d = npref >= 0 ? data[npref] : sum;;
		this.appendChild(cr("span", "date", formatDate(d.date) + "現在 "));
		this.appendChild(cr("span", "caption", pref + "のワクチン接種完了人数は "));
		const a = cr("a", "number", Num.addComma(d.sum) + "人");
		a.href = "https://code4fukui.github.io/covid19vaccine/";
		this.appendChild(a);
		this.appendChild(cr("span", "rate", " (完了率 " + d.sumrate.toFixed(2) + "%)"));
	}
}

customElements.define("covid19vaccine-data", Covid19VaccineData);
