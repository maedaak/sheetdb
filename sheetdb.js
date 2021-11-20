// developed by Maeda Akira

const search_fields_setting = ['title', 'creator', 'publisher', 'note'];
// const filter_field = "";
const defalt_page_size = 10;
let page_size = defalt_page_size;
let page;
let search_fields = {};
for (let field of search_fields_setting) {
    search_fields[field] = 1;
}
let output = [];
let result = [];

// SheetJS依存コードブロック
function excel2list() {
    let req = new XMLHttpRequest();
    req.open("GET", excel_file, true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        let data = new Uint8Array(req.response);
        let workbook = XLSX.read(data, {type:"array"});
        output = to_json(workbook);
        result = output;
        page = 1;
        pagenation();
        disp_page();
    };
    req.send();
}

function to_json(workbook) {
    let sheetName = workbook.SheetNames[0];
    let result = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
            raw: true,
        });
    return result;
}

// オリジナルのページネーションコードブロック
function disp_page(){
    let start = (page - 1) * page_size;
    let end = parseInt(start) + parseInt(page_size);
    let source = $("#list_template").html();
    let template = Handlebars.compile(source);
    let items = {}
    items["db"] = result.slice(start, end);
    let html = template(items);
    $("#contents").html(html);
}

function pagenation(){
    let size = Math.ceil(result.length / page_size);
    let page_link = {};
    let prev_page = page - 1;
    
    page_link["prev_page"] = prev_page;
    let next_page = page + 1;
    if (size == 1) {
        page_link["next_page"] = 0;
    }
    else {
        page_link["next_page"] = next_page;
    }
    page_link["last_page"] = size;
    
    let max_pages = 10;
    let page_center = 6;
    let pages = Math.ceil(result.length / page_size); 
    let page_start;
    let page_end;
    if (page >= max_pages) {
        page_start = page - page_center + 1;
        page_end = page + max_pages - page_center + 1;
        if (page_end > pages) {
            page_end = pages;
        }
    }
    else {
        page_start = 1;
        page_end =  max_pages;
        if (page_end > pages) {
            page_end = pages;
        }
    }
    let page_nos = [];
    for (let i = page_start; i <= page_end; i++) {
        let data = {};
        data["page_no"] = i;
        if (i != page){
            data["current_page"] = 0;
        }
        else {
            data["current_page"] = 1;
        }
        page_nos.push(data);
    }
    page_link["page"] = page_nos;
    
    if (result.length >= page_size){
        page_link["disp_page"] = 1;
    }
    else {
        page_link["disp_page"] = 0;
    }
    
    page_link["hits"] = result.length;
    
    let source = $("#page_template").html();
    let template = Handlebars.compile(source);
    let html = template(page_link);
    $("#pagenation").html(html);
}

// リストを条件を絞って表示するオリジナルコードブロック
function show_list(no){
    page = no || 1;
    let keywords = $("#search").val();
    let filter = $("#filter").val();
    page_size = $("#page_size").val() || 10;
    let newresult = [];
    for (let item of output){
        let match = 1;
        // if (filter == "any") {
        //  match = 1;
        // }
        // else if (item[filter_field].indexOf(filter) == -1){
        //  match = 0;
        // }
        let marged_field = "";
        for(key in item){
            if (search_fields[key] == 1) {
                marged_field = marged_field + "\t" + item[key];
            }
        }
        marged_field = normaliz(marged_field);
        keywords = keywords.replace(/　/g, ' ');
        for (keyword of keywords.split(' ')){
            keyword = normaliz(keyword);
            if (marged_field.indexOf(keyword) == -1){
                match = 0;
                break;
            }
        }
        if (match == 1){
            newresult.push(item);
        }
    }
    result = newresult;
    pagenation();
    disp_page();
}

function normaliz(data){
	data = data.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    data = data.toUpperCase();
    return data;
}

function enterkey_down(key) {
    if(key === "Enter"){
        show_list();
    }
}