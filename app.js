$(document).ready(function(){
    var Points = 0;
    var ClickMulti = 1;
    var menu;
    var ClickMultiPrice = 10;
    var auto1 = 0;
    var auto1Price = 30;
    var allautomulti = 1
    var timeplayed = 0
    var boosters = 0
    var UPGClickMulti = 1
    const upgradesbought = [false , false , false]
    menu = switchMenu("main");

    // Hiding Buttons
    document.getElementById("BuyBooster").style.display = "none";

    function readable(number) {
    var s = ['', 'k', 'M', 'B', 'T'];
    var e = Math.floor(Math.log(number) / Math.log(1000));
    t = (number / Math.pow(1000, e)).toFixed(2) + " " + s[e];
    if (number < 1){
        return 0
    }
    return t
}   
    function GetInfo(type){
        if (type == "clickamt"){
            return ClickMulti * Math.pow(2 , boosters) * UPGClickMulti
        }
    }
    setInterval(function(){
        $("#pps").html("Points Per Second: " + readable(Math.round(auto1 * allautomulti * Math.pow(2 , boosters) * 100) / 100));
        Points += auto1 / 60 * allautomulti * Math.pow(2 , boosters);
        $("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
        console.log("tick")
    }, 16.666667);

    //tick()
    $("#ClickPoint").click(function(){
        Points += GetInfo("clickamt");
	    //$("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
    });

    $("#UpgradeClick").click(function(){
        if (Points >= ClickMultiPrice){
            Points = Points - ClickMultiPrice;
            ClickMulti += 1;
            ClickMultiPrice = ClickMultiPrice + 5 + ClickMulti;
            $("#ClickPoint").html("+" + GetInfo("clickamt") + " Points");
	        //$("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
            $("#UpgradeClick").html("Increase Click Amount (" + ClickMultiPrice + " Points)");
        }
    });

    $("#UpgradeAuto1").click(function(){
        if (Points >= auto1Price){
            Points = Points - auto1Price;
            auto1 += 1;
            auto1Price = auto1Price + 15 + auto1;
	        //$("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
            $("#UpgradeAuto1").html("Increase Auto Points (" + auto1Price + " Points)");
        }
    });

    $("#BuyBooster").click(function(){
        if (Points >= Math.pow(10 ,4 + boosters)){
            if (confirm("This will reset everything except upgrades") == true) {
            Points = 0;
            ClickMulti = 1;
            ClickMultiPrice = 10;
            auto1 = 0;
            auto1Price = 30; 
            $("#UpgradeAuto1").html("Increase Auto Points (" + auto1Price + " Points)");
            $("#UpgradeClick").html("Increase Click Amount (" + ClickMultiPrice + " Points)");
            $("#ClickPoint").html("+" + GetInfo("clickamt") + " Points");
            boosters += 1
            $("#BuyBooster").html("Buy Booster (" + Math.pow(10 ,4 + boosters) + " Points")
            }
        }
    });

    function switchMenu(menu){
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block");
        return menu;
    }

    $("#upgrades").click(function(){
        menu = switchMenu("upgrades");
    });

    $("#main").click(function(){
        menu = switchMenu("main");
    });

    $("#UPG_DoublePassivePoint").click(function(){  
        if (Points >= 500 && upgradesbought[0] == false){
            Points = Points - 500
            upgradesbought[0] = true
            allautomulti = allautomulti * 2
            document.getElementById("UPG_DoublePassivePoint").style.backgroundColor = "lime";
        }
    });

    $("#UPG_DoubleClickPoint").click(function(){  
        if (Points >= 1000 && upgradesbought[1] == false){
            Points = Points - 1000
            UPGClickMulti = UPGClickMulti * 2
            upgradesbought[1] = true
            document.getElementById("UPG_DoubleClickPoint").style.backgroundColor = "lime";
            $("#ClickPoint").html("+" + GetInfo("clickamt") + " Points");
        }
    });

    $("#UPG_Booster").click(function(){  
        if (Points >= 2000 && upgradesbought[2] == false){
            Points = Points - 2000
            upgradesbought[2] = true
            document.getElementById("UPG_Booster").style.backgroundColor = "lime";
            document.getElementById("BuyBooster").style.display = "inline";
        }
    });
});
