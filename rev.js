// ==UserScript==
// @name         Sliver.tv Bot (A)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sliver.tv betting bot
// @author       Janos Hrubos
// @include      https://www.sliver.tv/win/fortnite
// @include      https://www.sliver.tv/win/pubg
// @include      https://www.sliver.tv/win/csgo
// @match        https://www.sliver.tv/win/fortnite
// @match        https://www.sliver.tv/win/pubg
// @match        https://www.sliver.tv/win/cs
// @grant        none
// ==/UserScript==

(function() {
    var contentPanel = getEBCN('content-panel')[0];
    var miniGamePanel = getEBCN('mini-game-panel')[0];

    var rafflePrizes = getEBCN('prize-container');
    var fixedWallet = getEBCN('fixed-wallet')[0];

    var betCards = getEBCN('bet-card');
    var open = getEBCN('open-button');
    var openCrate = getEBCN('open-crate-button');
    var cont = getEBCN('continue-button');

    function getEBCN(className)
    {
        return document.getElementsByClassName(className);
    }

    function getBetTitle(betCard)
    {
        return getCards()[betCard].firstChild.innerHTML;
    }

    function getAnswer(betCard, ans)
    { // ans = 0 or 1
        return getCards()[betCard].children[1].children[0].children[ans];
    }

    function whatIsSelected(betCard)
    {
        var selected = "none";
        var sel = false;
        for(let i = 0; i < getCards()[betCard].children[1].children[0].children.length; i++)
        {
            if(getCards()[betCard].children[1].children[0].children[i].classList.contains("is-selected"))
            {
                selected = i;
                sel = true;
            }
        }
        if (sel)
        {
            return parseInt(selected);
        }
        else
        {
            return selected;
        }
    }

    function getCards()
    {
        return getEBCN('bet-card');
    }

    function isPlaced(betCard)
    {
        return getCards()[betCard].children[1].children[0].children[0].classList.contains("is-static");
    }

    function print()
    {
        for (let i = 0; i < getCards().length; i++)
        {
            console.log("--------- " + getBetTitle(i));
            if (whatIsSelected(i) == "none")
            {
                console.log("--- No bet selected");
            }
            else
            {
                console.log("-- Your answer: " + getCards()[i].children[1].children[0].children[whatIsSelected(i)].children[1].innerText);
            }
            console.log('\n');
        }
    }

    function bet(opt)
    {
        var option = -1;
        switch (opt)
        {
            case "A":
                option = 0;
                break;
            case "B":
                option = 1;
                break;
            case "C":
                option = 2;
                break;
            case "D":
                option = 3;
                break;
            case "E":
                option = 4;
                break;
            default:
        }

        for (let i = 0; i < getCards().length; i++)
        {
            if (!isPlaced(i))
            {
                getCards()[i].children[1].children[0].children[option].click();
                console.log("##### ALL BETS PLACED #####");
            }
        }
    }

    function openCrates()
    {
        if (open.length != 0)
        {
            open[0].click();
            console.log("Opened crate.");
        }
        if (openCrate.length != 0 && !openCrate[0].classList.contains("is-disabled"))
        {
            openCrate[0].click();
            console.log("Rolled crate.");
        }
        if (cont.length != 0)
        {
            cont[0].click();
            console.log("Continue after crate.");
        }
    }

    function style()
    {

        contentPanel.innerHTML = "";
        fixedWallet.innerHTML = "";
        miniGamePanel.style.flexBasis = "100%";

        //bet cards
        for (let i = 0; i < betCards.length; i++)
        {
            centerize(betCards[i]);
        }

        for (let i = 0; i < rafflePrizes.length; i++)
        {
            centerize(rafflePrizes[i]);
        }
    }

    function centerize(array)
    {
        array.classList.add("center");
    }

    // diamonds-inventory-type
    function openCratesFromInv()
    {
        var crateInterval = setInterval(function()
                                        {
            if (getEBCN('continue-button').length == 0  && getEBCN('crate-inventory-type').length > 0)
            {
                for (let i = 0 ; i < getEBCN('crate-inventory-type').length; i++)
                {
                    getEBCN('crate-inventory-type')[0].children[3].click();
                    setTimeout(function() {getEBCN('open-crate-button')[0].click();}, 1000);
                    setTimeout(function() {getEBCN('continue-button')[0].click();}, 13000);
                }
            }
            else
            {
                clearInterval(crateInterval);
            }
        }, 16000);
    }

    function claimAllDiamonds()
    {
        var length = getEBCN('diamonds-inventory-type').length;
        for(let i = 0; i < length; i++)
        {
            setTimeout(function()
                       {
                getEBCN('diamonds-inventory-type')[i].children[3].children[0].click();
            }, 2000);
        }
        console.log(length + " diamond(s) opened.");
    }

    function claimAllCoins()
    {
        var length = getEBCN('coins-inventory-type').length;
        for(let i = 0; i < length; i++)
        {
            setTimeout(function()
                       {
                getEBCN('coins-inventory-type')[i].children[3].children[0].click();
            }, 1000);
        }
        console.log(length + " coin(s) opened.");
    }


    setInterval(function()
                {
        bet("A");
    }, 1000);

})();