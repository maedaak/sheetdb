# JavaScriptとExcelを使った書誌「１万件」検索サンプルページ

## サンプルサイトURL
https://maedaak.github.io/sheetdb/

## 概要
独自JavaScriptとExcelを使った書誌「１万件」検索サンプルページである。

## サンプルデータ
NACSIS-CATの総合目録データベースの書誌情報(CC-BY)を使用している。
そのままだとRDFでありExcel化できないため、大学図書館員のための図書館システム開発練習用データ( https://mbc.dl.itc.u-tokyo.ac.jp/data4librarysystem/ )の図書書誌TSVから、先頭１万件を抽出して使用した。

## メタデータの読み込み
- 外部ExcelファイルをHTMLロード時に読み込み
- SheetJS (https://github.com/SheetJS/sheetjs) を使用

## HTMLテンプレート
- Handlebars.js を使用
    - Mustache記法となる

## 機能
- シンプルな文字列の一致による絞り込み（英数の正規化あり）
- キーワードスペース区切りでAND検索
- プルダウンメニューによる絞り込み（オプション）
- キーワード入力全角英数の半角化（オプション）
- ヒット件数表示
- ページネーション
- 画面表示件数変更

## 開発
- Excel内検索はSheetJSに依存
- その他、ページネーションなどは前田による独自開発コードで実現

## 利点
- Excelのためデータメンテナンスが容易
- 書誌「１万件」でもそれなりの速度で起動する
- HTMLテンプレートはメジャーなMustache記法である
- AND検索をサポート
- sheetdb.jsのコーディングによりインターフェイスカスタマイズの余地あり

## 難点
- ユーザ独自コードに依存

## 現在の開発状況
- Wiki ( https://github.com/maedaak/sheetdb/wiki )を参照

## 関連サイト
- Lits.jsとTSVによる「１万件」書誌検索サンプルページ
    - https://maedaak.github.io/cat10000/
- List.jsのHTML内検索機能を使った書誌「１万件」検索サンプルページ
    - https://maedaak.github.io/listjs-tsv/

## Copy Right
### index.html及びsheets.js
- Design: 東京大学情報システム部・前田朗
- Contributor: 東京大学史料編纂所助教・中村覚

### cat10000.xls
- 国立情報学研究所の「NII総合目録データベース（NACSIS-CAT）」(CC-BYライセンス)から10000書誌を使用。
