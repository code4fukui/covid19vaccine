```markdown
# 日本のCOVID-19ワクチン接種状況

[
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
](https://opensource.org/licenses/MIT)

このリポジトリでは、日本の新型コロナウイルス（COVID-19）ワクチン接種状況に関する、毎日更新されるオープンデータ、可視化、および埋め込み可能なWebコンポーネントを提供しています。データは政府CIOポータルの公開情報を自動的に取得し、使いやすい形式に加工しています。

## 📊 ライブデモと可視化

- **[インタラクティブマップ](https://code4fukui.github.io/covid19vaccine/)**: 都道府県別のワクチン接種率を示す日本地図。
- **[都道府県別ランキング](https://code4fukui.github.io/covid19vaccine/ranking.html)**: 全47都道府県をワクチン接種完了率でランク付けした表。

![Japan Tabular Map Visualization](https://user-images.githubusercontent.com/5986999/156900698-50266023-3760-449e-8344-964263300067.png)

## ✨ 特徴

- **毎日のデータ更新**: データは毎日自動的に更新されます。
- **複数のデータ形式**: 詳細な生データ（CSV/NDJSON）と、便利な都道府県別サマリ（CSV）を提供します。
- **インタラクティブな可視化**: 色分けされた地図と、並べ替え可能なランキング表が含まれます。
- **埋め込み可能なWebコンポーネント**: 任意のウェブサイトにワクチン接種データを表示するためのシンプルなHTMLタグです。

## 💾 データ / API

データは政府の生NDJSONフィードから取得され、以下の便利な形式に加工されています。

### 1. 都道府県別サマリ (`latest_summary.csv`)

可視化や一般的な分析など、ほとんどのユースケースに最適な集約データセットです。

- **URL**: https://code4fukui.github.io/covid19vaccine/latest_summary.csv

**スキーマ:**
| 列名 | 説明 | 例 |
| :--- | :--- | :--- |
| `ISO3166-2` | 都道府県のISO 3166-2コード。 | `JP-18` |
| `pref` | 都道府県名（日本語）。 | `福井県` |
| `sum` | ワクチン接種を完了した（2回目接種）総人数。 | `580312` |
| `mid` | 少なくとも1回の接種を受けた総人数。 | `584773` |
| `date` | データが最後に更新された日付。 | `2022-02-26` |

### 2. 完全データセット (`latest.csv`)

日付、都道府県、年齢、性別、および接種ステータス別に細分化された、完全で詳細なデータセットです。

- **URL**: https://code4fukui.github.io/covid19vaccine/latest.csv

**スキーマ:**
| 列名 | 説明 | 例 |
| :--- | :--- | :--- |
| `date` | 接種記録日。 | `2021-04-12` |
| `prefecture` | 都道府県コード（JIS X 0401）。 | `01` (北海道) |
| `gender` | 性別: `F` (女性)、`M` (男性)、`U` (不明)。 | `F` |
| `age` | 年齢層。 | `-64`, `65-` |
| `medical_worker` | 医療従事者かどうか (`true`/`false`)。 | `false` |
| `status` | 接種ステータス: `1` (1回目)、`2` (2回目/完了)。 | `1` |
| `count` | この特定のグループの人数。 | `79` |

### 3. 生データ (`latest.ndjson`)
情報源から取得したままの未加工のNDJSONデータ。
- **URL**: https://code4fukui.github.io/covid19vaccine/latest.ndjson

### 4. 過去のデータ
完全データセットの毎日のスナップショットは、[`/data`](/data/) ディレクトリにアーカイブされています。

## 🧩 埋め込み可能なウィジェット

シンプルなHTMLタグを追加することで、ご自身のウェブサイトに最新のワクチン接種データを表示できます。このコンポーネントは、最新データを含む要約文をレンダリングします。

**➡️ [ウィジェットのデモと使用方法](https://code4fukui.github.io/covid19vaccine/covid19vaccine-data.html)**

### 使用方法

1. HTMLファイルにスクリプトタグを追加します（1ページにつき1回のみ）。
2. データを表示したい場所にカスタムタグ `<covid19vaccine-data>` を追加します。

**特定の都道府県のデータを表示する場合:**
```html
<script type="module" src="https://code4fukui.github.io/covid19vaccine/covid19vaccine-data.js"></script>
<covid19vaccine-data pref="福井県"></covid19vaccine-data>
```

**全国のデータを表示する場合:**
```html
<script type="module" src="https://code4fukui.github.io/covid19vaccine/covid19vaccine-data.js"></script>
<covid19vaccine-data></covid19vaccine-data>
```

## ⚙️ 自動化

このリポジトリは、以下の手順を実行する日次スクリプト（[`download.js`](/download.js)）によって自動的に更新されます：
1. 政府の情報源から最新の `prefecture.ndjson` データを取得します。
2. 生データを `latest.ndjson` として保存します。
3. NDJSONを `latest.csv` に変換し、毎日のスナップショットを `/data` ディレクトリにアーカイブします。
4. 完全なデータを集約し、都道府県レベルの `latest_summary.csv` を作成します。
5. 更新されたファイルをこのリポジトリにコミットします。

## データソースとライセンス

- **データソース**: [新型コロナワクチンの接種状況 | 政府CIOポータル](https://cio.go.jp/c19vaccine_dashboard)
- **プロジェクト作成**: [Code for FUKUI](https://github.com/code4fukui/)
- **ライセンス**: このプロジェクトは [MIT License](LICENSE) の下で利用可能です。
```
