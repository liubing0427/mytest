var flag = true;
var index = -1;
window.onload = function ()
{
    var oTxt = document.getElementById('lst-ib');
    oTxt.onkeyup = function(e)
    {
        e = e || window.event;
        if(flag && e.keyCode != 13)
        {
            getdata();
        }
        else
        {
            flag = true;
        }
    };

    $("#lst-ib").bind('input', function(){
        if(oTxt.value=="")
        {
            document.getElementById("tr1").innerText = '';
        }
    });
}

function getdata()
{
    var oTxt = document.getElementById('lst-ib');
    var oUl = document.getElementById('st');
    var oScript = null ;
    oUl.innerHTML = '' ;
    //避免造成代码冗余，出现众多script标签（由于每输入一个字符，就会动态生成script标签，因此每次需要清除上一次遗留下的script标签）
    if(oScript)
    {
        document.body.removeChild(oScript);
    }       
    oScript = document.createElement('script');
    //其中‘wd’是搜索的关键字，‘cb’是一个回调函数，该回调函数是我们取到数据要后执行的函数，oScript.src中cb=baidu即表示取到数据后执行baidu函数
    oScript.src = 'http://suggestion.baidu.com/su?wd='+oTxt.value+'&p=3&cb=baidu&from=superpage';
    document.body.appendChild(oScript);
}

//回调时调用的函数，将取得的联想词展示出来
function baidu (json)
{
    index = -1;
    var oUl = document.getElementById('st');
    var suglist = document.createElement("ul");
    suglist.id = "suglist";
    for (var i = 0; i < json.s.length; i++) {
        var sugli = document.createElement("li");
        sugli.innerHTML = json['s'][i];
        sugli.className = "li-cl";
        suglist.appendChild(sugli)
    }
    oUl.appendChild(suglist);

    $(".li-cl").click(function(){
        var li = $(this);
        $("#lst-ib").val(li.text());
        $(suglist).hide();
        document.getElementById("btnK").click();
    });

    $(".li-cl").mouseover(function(){
        $(this).addClass("bdsug-s");
    });

    $(".li-cl").mouseout(function(){
        $(this).removeClass("bdsug-s");
    });
}

function sIndex(index) {
    var suglist = document.getElementById("suglist");
    var lis = $(suglist).find("li");
    $(lis).removeClass("bdsug-s");
    if (index != -1) {
        var li = $($(lis)[index]);
        $(li).addClass("bdsug-s");
        $("#lst-ib").val(li.text());
    } else {
    }
}

document.onkeydown = function(e) {
    var suglist = document.getElementById("suglist");
    e = e || window.event;
    if (e.keyCode == 9 || e.keyCode == 27) {
        if ($(suglist))
        {
            $(suglist).hide();
        }
    } else if (e.keyCode == 13) {
        //me.addStat("rsv_sug2", 0);
        if ($(suglist))
        {
            $(suglist).hide();
        }
        document.getElementById("btnK").click();
        return false;
    } else if (e.keyCode == 86 && e.ctrlKey) {
        //me.addStat("rsv_n", 2)
    } else if ($(suglist)) {
        if (e.keyCode == 38) {
            flag = false;
            e.preventDefault();
            var n = $(suglist).find("li").length;
            index--;
            if (index < -1) {
                index = n - 1
            }
            sIndex(index);
        }
        if (e.keyCode == 40) {
            flag = false;
            e.preventDefault();
            var n = $(suglist).find("li").length;
            index++;
            if (index >= n) {
                index = -1
            }
            sIndex(index);
        }
    } else {
        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();
            getdata();
        }
    }
}

function Show_Hidden(trid){
    if(document.getElementById("lst-ib").value!="")
    {
        document.getElementById("tr1").innerText = '根据相关法律法规和政策，"'+document.getElementById("lst-ib").value+'"的搜索结果未予显示';
        trid.style.display='block';
        //window.location.assign("http://www.baidu.com/s?wd="+document.getElementById('lst-ib').value);
    }
    else
    {
        document.getElementById("tr1").innerText = '';
        trid.style.display='none';
    }
}
