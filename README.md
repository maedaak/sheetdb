# JavaScriptとExcelを使った書誌「１万件」検索サンプルページ

## サンプルサイトURL
https://maedaak.github.io/sheetdb/

## 概要
JavaScriptとExcelを使った書誌「１万件」検索サンプルページである。

## サンプルデータ
NACSIS-CATの総合目録データベースの書誌情報(CC-BY)を使用している。
そのままだとRDFでありExcel化できないため、大学図書館員のための図書館システム開発練習用データ( https://mbc.dl.itc.u-tokyo.ac.jp/data4librarysystem/ )の図書書誌TSVから、先頭１万件を抽出して使っている。CiNiiへのリンクは独自に追加した。

## メタデータの読み込み
- 外部ExcelファイルをHTMLロード時に読み込み
- SheetJS (https://github.com/SheetJS/sheetjs) を使用

## HTMLテンプレート
- Handlebars (https://handlebarsjs.com/) を使用
    - Mustache記法となる

## 機能
- シンプルな文字列の一致による絞り込み（英数の正規化あり）
- キーワードスペース区切りでAND検索
- プルダウンメニューによる絞り込み（オプション）
- キーワード検索時の全角英数及び英大文字小文字の正規化
- 検索対象項目の限定
- ヒット件数表示
- ページネーション
- 画面表示件数変更

## 開発
- SheetJSとHandlebarsを使い独自開発

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

## Copy Right
### index.html及びsheetdb.js
- Licnece: MIT Licence
- Developer: 東京大学情報システム部・前田朗
- Contributor: 東京大学史料編纂所助教・中村覚
- Powerd by:
    - SheetsJS https://github.com/SheetJS/sheetjs Apache License 2.0
    - Handlebars https://handlebarsjs.com/ MIT License
    - jQuery https://github.com/jquery/jquery MIT License

### cat10000_url.xls
- 国立情報学研究所の「NII総合目録データベース（NACSIS-CAT）」(CC-BYライセンス)から10000書誌を使用。CiNiiへのリンクは独自に追加した。
