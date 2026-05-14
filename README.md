### `README.md` (English)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

```markdown
# COVID-19 Vaccine Status in Japan

[
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
](https://opensource.org/licenses/MIT)

This repository provides daily updated open data, visualizations, and an embeddable web component for the COVID-19 vaccination status in Japan. The data is automatically fetched from the Government of Japan's CIO Portal and processed into user-friendly formats.

## 📊 Live Demo & Visualizations

- **[Interactive Map](https://code4fukui.github.io/covid19vaccine/)**: A map of Japan showing vaccination rates by prefecture.
- **[Prefecture Ranking](https://code4fukui.github.io/covid19vaccine/ranking.html)**: A table ranking all 47 prefectures by their vaccination completion rate.

![Japan Tabular Map Visualization](https://user-images.githubusercontent.com/5986999/156900698-50266023-3760-449e-8344-964263300067.png)

## ✨ Features

- **Daily Data Updates**: Data is automatically updated daily.
- **Multiple Data Formats**: Provides raw detailed data (CSV/NDJSON) and a convenient prefecture-level summary (CSV).
- **Interactive Visualizations**: Includes a color-coded map and a sortable ranking table.
- **Embeddable Web Component**: A simple HTML tag to display vaccination data on any website.

## 💾 Data / API

Data is sourced from the government's raw NDJSON feed and processed into the following convenient formats.

### 1. Prefecture-level Summary (`latest_summary.csv`)

A summarized dataset, ideal for most use cases like visualizations and general analysis.

- **URL**: https://code4fukui.github.io/covid19vaccine/latest_summary.csv

**Schema:**
| Column | Description | Example |
| :--- | :--- | :--- |
| `ISO3166-2` | ISO 3166-2 code for the prefecture. | `JP-18` |
| `pref` | Prefecture name in Japanese. | `福井県` |
| `sum` | Total number of people who have completed vaccination (2nd dose). | `580312` |
| `mid` | Total number of people who have received at least one dose. | `584773` |
| `date` | The date the data was last updated. | `2022-02-26` |

### 2. Full Dataset (`latest.csv`)

The complete, granular dataset broken down by date, prefecture, age, gender, and vaccination status.

- **URL**: https://code4fukui.github.io/covid19vaccine/latest.csv

**Schema:**
| Column | Description | Example |
| :--- | :--- | :--- |
| `date` | Date of vaccination record. | `2021-04-12` |
| `prefecture` | Prefecture code (JIS X 0401). | `01` (Hokkaido) |
| `gender` | Gender: `F` (Female), `M` (Male), `U` (Unknown). | `F` |
| `age` | Age group. | `-64`, `65-` |
| `medical_worker` | Whether the person is a medical worker (`true`/`false`). | `false` |
| `status` | Vaccination status: `1` (1st dose), `2` (2nd dose/completed). | `1` |
| `count` | Number of people in this specific group. | `79` |

### 3. Raw Data (`latest.ndjson`)
The unprocessed NDJSON data as fetched from the source.
- **URL**: https://code4fukui.github.io/covid19vaccine/latest.ndjson

### 4. Historical Data
Daily snapshots of the full dataset are archived in the [`/data`](/data/) directory.

## 🧩 Embeddable Widget

You can display the latest vaccination data on your own website by adding a simple HTML tag. The component renders a summary sentence with the latest data.

**➡️ [Widget Demo and Instructions](https://code4fukui.github.io/covid19vaccine/covid19vaccine-data.html)**

### How to Use

1.  Add the script tag to your HTML file (only once per page).
2.  Add the custom `<covid19vaccine-data>` tag where you want the data to appear.

**To display data for a specific prefecture:**
```html
<script type="module" src="https://code4fukui.github.io/covid19vaccine/covid19vaccine-data.js"></script>
<covid19vaccine-data pref="福井県"></covid19vaccine-data>
```

**To display national data:**
```html
<script type="module" src="https://code4fukui.github.io/covid19vaccine/covid19vaccine-data.js"></script>
<covid19vaccine-data></covid19vaccine-data>
```

## ⚙️ Automation

This repository is updated automatically by a daily script ([`download.js`](/download.js)) that performs the following steps:
1.  Fetches the latest `prefecture.ndjson` data from the government source.
2.  Saves the raw data as `latest.ndjson`.
3.  Converts the NDJSON to `latest.csv` and archives a daily snapshot in the `/data` directory.
4.  Aggregates the full data to create the prefecture-level `latest_summary.csv`.
5.  Commits the updated files to this repository.

## Data Source & License

- **Data Source**: [COVID-19 Vaccine Rollout Status | Government CIO Portal](https://cio.go.jp/c19vaccine_dashboard)
- **Project by**: [Code for FUKUI](https://github.com/code4fukui/)
- **License**: This project is available under the [MIT License](LICENSE).
```

```markdown
# COVID-19ワクチン接種状況オープンデータ

[
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
](https://opensource.org/licenses/MIT)

> [Read this README in English](README.md)

このリポジトリは、日本国内の新型コロナウイルス（COVID-19）ワクチン接種状況に関するオープンデータ、可視化、そして埋め込み可能なWebコンポーネントを毎日更新して提供します。データは政府CIOポータルの公開情報を自動的に取得し、使いやすい形式に加工しています。

## 📊 デモ・可視化

- **[インタラクティブマップ](https://code4fukui.github.io/covid19vaccine/)**: 都道府県別のワクチン接種率を地図上で確認できます。
- **[都道府県別ランキング](https://code4fukui.github.io/covid19vaccine/ranking.html)**: 全47都道府県のワクチン接種完了率をランキング形式で表示します。

![Japan Tabular Map Visualization](https://user-images.githubusercontent.com/5986999/156900698-50266023-3760-449e-8344-964263300067.png)

## ✨ 主な特徴

- **毎日データ更新**: データは毎日自動的に更新されます。
- **多様なデータ形式**: 詳細