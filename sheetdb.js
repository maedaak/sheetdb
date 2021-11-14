// developed by Maeda Akira
const search_fields_setting = ['title', 'creator', 'publisher', 'note'];
// const filter_field = "";
const defalt_page_size = 10;
var page_size = defalt_page_size;
var page;
var search_fields = {};
for (var field of search_fields_setting) {
	search_fields[field] = 1;
}
var output = [];
var result = [];

function excel2list() {
    var xhr = new XMLHttpRequest();
	xhr.open('GET', excel_file, true);
	xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        var arrayBuffer = this.response;
        var data = new Uint8Array(arrayBuffer);
        var chank = [];
        for (var i = 0; i != data.length; ++i){
            chank[i] = String.fromCharCode(data[i]);
        }
        var datastring = chank.join("");
        var workbook = XLSX.read(datastring, {type: "binary"});
        output = to_json(workbook);
        result = output;
        pagenation();
        page = 1;
        pagenation();
        disp_page();
    };
    xhr.send();
}

function to_json(workbook) {
    var result = {};
    var sheetName = workbook.SheetNames[0];
    var roa = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
             sraw: true,
        });
    if (roa.length > 0) {
        result = roa;
    }
    return result;
}

function disp_page(){
	var start = (page - 1) * page_size;
	var end = parseInt(start) + parseInt(page_size);
    var source = $("#list_template").html();
    var template = Handlebars.compile(source);
    var items = {}
    items["db"] = result.slice(start, end);
    var html = template(items);
    $("#contents").html(html);
}

function pagenation(){
	var size = Math.ceil(result.length / page_size);
    var page_link = {};
    var prev_page = page - 1;
    
    page_link["prev_page"] = prev_page;
    var next_page = page + 1;
    if (size == 1) {
    	page_link["next_page"] = 0;
    }
    else {
        page_link["next_page"] = next_page;
    }
    page_link["last_page"] = size;
    
    var max_pages = 10;
    var page_center = 6;
    var pages = Math.ceil(result.length / page_size); 
    var page_start;
    var page_end;
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
    var page_nos = [];
    for (var i = page_start; i <= page_end; i++) {
       var data = {};
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
    
    var source = $("#page_template").html();
    var template = Handlebars.compile(source);
    var html = template(page_link);
    $("#pagenation").html(html);
}

function show_list(no){
	page = no || 1;
	var keywords = $("#search").val();
	var filter = $("#filter").val();
	page_size = $("#page_size").val() || 10;
    var newresult = [];
    for (var item of output){
        var match = 1;
        // if (filter == "any") {
        // 	match = 1;
        // }
        // else if (item[filter_field].indexOf(filter) == -1){
        // 	match = 0;
        // }
    	var marged_field = "";
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