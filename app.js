$(document).ready(function(){
    var Points = new Decimal(0);
    var ClickMulti = new Decimal(1);
    var menu;
    var ClickMultiPrice = new Decimal(10)
    var auto1 = new Decimal(0);
    var auto1Price = new Decimal(30);
    var allautomulti = new Decimal(1)
    var timeplayed = 0
    var booster = new Decimal(0)
    var UPGClickMulti = new Decimal(1)
    const upgradesbought = [false , false , false]
    menu = switchMenu("main");
    // Hiding Buttons
    document.getElementById("BuyBooster").style.display = "none";
    document.getElementById("UPG_Autoclicker").style.display = "none";

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
            //return ClickMulti * Math.pow(2 , boosters) * UPGClickMulti
            return ClickMulti.multiply(Decimal.pow(2 , booster)).multiply(UPGClickMulti)
            //var c1 = 
        }
    }
    setInterval(function(){
        $("#pps").html("Points Per Second: " + readable(Math.round(auto1 * allautomulti * Math.pow(2 , booster) * 100) / 100));
        //Points += auto1 / 60 * allautomulti * Math.pow(2 , boosters);
        Points = Decimal.add(Points , auto1.divide(30).multiply(Decimal.pow(2 , booster)).multiply(allautomulti))
        $("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
        //$("#points").html("Points: " + Points)
        console.log("tick")
        //console.log(Points)
    }, 33.33);

    setInterval(function(){

        //document.getElementById("ClickPoint").disabled = "true";
        //Points = Decimal.add(Points , GetInfo("clickamt"))
    }, 100)
    //tick()
    $("#ClickPoint").click(function(){
        //document.getElementById("ClickPoint").disabled = "true";
        Points = Decimal.add(Points , GetInfo("clickamt"))
        //setTimeout(function() {document.getElementById("ClickPoint").disabled = false;}, 100);
    });

    $("#UpgradeClick").click(function(){
        console.log()
        if (Decimal.compare(Points , ClickMultiPrice) >= 0){
            Points = Decimal.sub(Points , ClickMultiPrice)
            ClickMulti = ClickMulti.add(1)
            //ClickMultiPrice = ClickMultiPrice + 5 + ClickMulti;
            ClickMultiPrice = ClickMultiPrice.plus(5).plus(ClickMulti)
            $("#ClickPoint").html("+" + GetInfo("clickamt") + " Points");
	        //$("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
            $("#UpgradeClick").html("Increase Click Amount (" + ClickMultiPrice + " Points)");
        }
    });

    $("#UpgradeAuto1").click(function(){
        if (Decimal.compare(Points , auto1Price) >= 0){
            Points = Decimal.sub(Points , auto1Price)
            auto1 = auto1.add(1)
            auto1Price = auto1Price.add(15).add(auto1)
	        //$("#points").html("Points: " + readable(Math.round(Points * 100) / 100));
            $("#UpgradeAuto1").html("Increase Auto Points (" + auto1Price + " Points)");
        }
    });

    $("#BuyBooster").click(function(){
        if (Decimal.compare(Points , Decimal.pow(10 , Decimal.add(4 , booster))) >= 0){ // Points >= Math.pow(10 ,4 + booster)
            if (confirm("This will reset everything except upgrades") == true) {
            Points = new Decimal(0);
            ClickMulti = new Decimal(1);
            ClickMultiPrice = new Decimal(10);
            auto1 = new Decimal(0);
            auto1Price = new Decimal(30); 
            $("#UpgradeAuto1").html("Increase Auto Points (" + auto1Price + " Points)");
            $("#UpgradeClick").html("Increase Click Amount (" + ClickMultiPrice + " Points)");
            $("#ClickPoint").html("+" + GetInfo("clickamt") + " Points");
            booster = Decimal.add(booster , 1)
            $("#BuyBooster").html("Buy Booster (" + Decimal.pow(10 , Decimal.add(4 , booster)) + " Points")
            document.getElementById("UPG_Autoclicker").style.display = "block";
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
        if (Decimal.compare(Points , 500) >= 0 && upgradesbought[0] == false){
            Points = Decimal.sub(Points , 500)
            upgradesbought[0] = true
            allautomulti = allautomulti * 2
            document.getElementById("UPG_DoublePassivePoint").style.backgroundColor = "lime";
        }
    });

    $("#UPG_DoubleClickPoint").click(function(){  
        if (Decimal.compare(Points , 1000) >= 0 && upgradesbought[1] == false){
            Points = Decimal.sub(Points , 1000)
            UPGClickMulti = UPGClickMulti * 2
            upgradesbought[1] = true
            document.getElementById("UPG_DoubleClickPoint").style.backgroundColor = "lime";
            $("#ClickPoint").html("+" + GetInfo("clickamt") + " Points");
        }
    });

    $("#UPG_Booster").click(function(){  
        if (Decimal.compare(Points , 2000) >= 0 && upgradesbought[2] == false){
            Points = Decimal.sub(Points , 2000)
            upgradesbought[2] = true
            document.getElementById("UPG_Booster").style.backgroundColor = "lime";
            document.getElementById("BuyBooster").style.display = "inline";
        }
    });
});
