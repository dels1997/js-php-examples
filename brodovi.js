$ (document).ready (function ()
{
    var id_igre = 0;
    var retci = 0;
    var stupci = 0;
    var req = null;

    var broj_jedan = 0;
    var broj_dva = 0;
    var broj_tri = 0;
    var broj_cetiri = 0;

    var mapa = new Array (11);
    init ();
    
    
    $.when (req).done (function program ()
    {
        nacrtaj ();
    });


    function nacrtaj ()
    {

        nacrtaj_mapu (mapa);
        let duljina = mapa.length
        let visina = mapa[0].length

        let okvir = $ ('#mapa');
        okvir
            .css ('border-collapse', 'collapse')
            .css ('margin', '0')
            .css ('width', '450px')
            .css ('height', '450px')
            .css ('border', 'none')
            .css ('text-align', 'center')
            .css ('table-layout', 'fixed');
            
        var br_brod_redak = Array (10);
        var br_brod_stupac = Array (10);
        for (let i = 0; i < 10; ++i) {
            br_brod_redak[i] = 0;
            br_brod_stupac[i] = 0;
        }
     
        for (let i = 0; i < visina - 1; ++i) {
            okvir.append ('<tr style="width:450px; line-height=70px; white-space: nowrap;" id="' + i + '">');

            for (let j = 0; j < duljina - 1; ++j) {//https://stackoverflow.com/questions/4825295/onclick-to-get-the-id-of-the-clicked-button
                let red = $ ('#' + i);
                red.append ('<td style="display: block;" id="' + i + j + '">');
                trenutni = $ ('#' + i + j);


                if (mapa[i][j] === 0)
                    trenutni.html ("");
                else if (mapa[i][j] === 1)
                    trenutni.html ("&#9875;");
                else
                    trenutni.html ("&#127754;"); 

                $ ('#' + i + j).css ('background-color', '#BEBEBE').css ('border', '1px solid black').on ('click', function obradi_klik ()
                {  
                    vrati_pozadine ();
                    
                    mapa[i][j] += 1; mapa[i][j] = mapa[i][j] % 3;
                    if (mapa[i][j] === 0) {
                        $ (this).html ('');
                    }
                    else if (mapa[i][j] === 1) {
                        $ (this).html ('&#9875;');
                        ++br_brod_redak[i];
                        ++br_brod_stupac[j];
                    }
                    else {
                        $ (this).html ('&#127754;');
                        --br_brod_redak[i];
                        --br_brod_stupac[j];
                    }
                    
                    // bojanje brojeva u retcima
                    if (retci[i] !== 0) {
                        if (br_brod_redak[i] > retci[i]) {
                            $ ('#r' + i).css ('color', 'red');
                        }
                        else if (br_brod_redak[i] === retci[i]) {
                            $ ('#r' + i).css ('color', 'lightgreen');
                        }
                        else {
                            $ ('#r' + i).css ('color', 'black');
                        }
                    }
                    else {
                        if (br_brod_redak[i] === 0)
                            $ ('#r' + i).css ('color', 'lightgreen');
                        else
                            $ ('#r' + i).css ('color', 'red');
                    }

                    // bojanje brojeva u stupcima
                    if (stupci[j] !== 0) {
                        if (br_brod_stupac[j] > stupci[j]) {
                            $ ('#s' + j).css ('color', 'red');
                        }
                        else if (br_brod_stupac[j] === stupci[j]) {
                            $ ('#s' + j).css ('color', 'lightgreen');
                        }
                        else {
                            $ ('#s' + j).css ('color', 'black');
                        }
                    }
                    else {
                        if (br_brod_stupac[j] === 0)
                            $ ('#s' + j).css ('color', 'lightgreen');
                        else
                            $ ('#s' + j).css ('color', 'red');
                    }

                    // bojanje brodova preostalih za rasporediti:
                    var provjereno = new Array (10);
                    for (let m = 0; m < 10; ++m)
                        provjereno[m] = Array (10)
                    for (let m = 0; m < 10; ++m) {
                        for (let n = 0; n < 10; ++n)
                            provjereno[m][n] = 0;
                    }
                    broj_jedan = broj_dva = broj_tri = broj_cetiri = 0;
                    function nadi_tip (m, n) {
                        if ((m + 1 < 10) && mapa[m + 1][n] === 1 && provjereno[m + 1][n] === 0) {
                            let i = 1;
                            while ((m + i < 10) && mapa[m + i][n] === 1 && provjereno[m + i][n] === 0) {
                                provjereno[m + i][n] = 1;
                                ++i;
                            }
                            if (i === 1)
                                ++broj_jedan;
                            else if (i === 2)
                                ++broj_dva;
                            else if (i === 3)
                                ++broj_tri;
                            else if (i >= 4)
                                ++broj_cetiri;
                        }
                        else if ((m - 1 >= 0) && mapa[m - 1][n] === 1 && provjereno[m - 1][n] === 0) {
                            let i = 1;
                            while ((m - i >= 0) && mapa[m - i][n] === 1 && provjereno[m - i][n] === 0) {
                                provjereno[m - i][n] = 1;
                                ++i;
                            }
                            if (i === 1)
                                ++broj_jedan;
                            else if (i === 2)
                                ++broj_dva;
                            else if (i === 3)
                                ++broj_tri;
                            else if (i >= 4)
                                ++broj_cetiri;
                        }
                        else if ((n + 1 < 10) && mapa[m][n + 1] === 1 && provjereno[m][n + 1] === 0) {
                            let i = 1;
                            while ((n + i < 10) && mapa[m][n + i] === 1 && provjereno[m][n + i] === 0) {
                                provjereno[m][n + i] = 1;
                                ++i;
                            }
                            if (i === 1)
                                ++broj_jedan;
                            else if (i === 2)
                                ++broj_dva;
                            else if (i === 3)
                                ++broj_tri;
                            else if (i >= 4)
                                ++broj_cetiri;
                        }
                        else if ((n - 1 >= 0) && mapa[m][n - 1] === 1 && provjereno[m][n - 1] === 0) {
                            let i = 1;
                            while ((n - i >= 0) && mapa[m][n - i] === 1 && provjereno[m][n - i] === 0) {
                                provjereno[m][n - i] = 1;
                                ++i;
                            }
                            if (i === 1)
                                ++broj_jedan;
                            else if (i === 2)
                                ++broj_dva;
                            else if (i === 3)
                                ++broj_tri;
                            else if (i >= 4)
                                ++broj_cetiri;
                        }
                        else {
                            ++broj_jedan;
                        }
                    }
                    for (let m = 0; m < 10; ++m) {
                        for (let n = 0; n < 10; ++n) {
                            if (mapa[m][n] !== 1) {
                                provjereno[m][n] = 1;
                            }
                            else if (provjereno[m][n] === 0 && mapa[m][n] === 1) {
                                provjereno[m][n] = 1;
                                nadi_tip (m, n);
                            }
                        }
                    }
                    function obojaj_kruzice () {
                        // brodovi duljine 4
                        if (broj_cetiri >= 1) { if (broj_cetiri > 1) $ ('#info4').html ('&#x2717;'); else $ ('#info4').html ('&#x2713;'); $ ('#411').html ('&#9899;');$ ('#412').html ('&#9899;');$ ('#413').html ('&#9899;');$ ('#414').html ('&#9899;');}
                        else {$ ('#info4').html ('&#x2713;'); $ ('#411').html ('&#9898;');$ ('#412').html ('&#9898;');$ ('#413').html ('&#9898;');$ ('#414').html ('&#9898;');}

                        // brodovi duljine 3
                        if (broj_tri >= 2) {if (broj_tri > 2) $ ('#info3').html ('&#x2717;'); else $ ('#info3').html ('&#x2713;'); $ ('#311').html ('&#9899;');$ ('#312').html ('&#9899;');$ ('#313').html ('&#9899;');$ ('#321').html ('&#9899;');$ ('#322').html ('&#9899;');$ ('#323').html ('&#9899;');}
                        else if (broj_tri >= 1) {$ ('#info3').html ('&#x2713;'); $ ('#311').html ('&#9899;');$ ('#312').html ('&#9899;');$ ('#313').html ('&#9899;');$ ('#321').html ('&#9898;');$ ('#322').html ('&#9898;');$ ('#323').html ('&#9898;');}
                        else {$ ('#info3').html ('&#x2713;'); $ ('#311').html ('&#9898;');$ ('#312').html ('&#9898;');$ ('#313').html ('&#9898;');$ ('#321').html ('&#9898;');$ ('#322').html ('&#9898;');$ ('#323').html ('&#9898;');}
                        
                        // brodovi duljine 2
                        if (broj_dva >= 3) {if (broj_dva > 3) $ ('#info2').html ('&#x2717;'); else $ ('#info2').html ('&#x2713;'); $ ('#211').html ('&#9899;');$ ('#212').html ('&#9899;');$ ('#221').html ('&#9899;');$ ('#222').html ('&#9899;');$ ('#231').html ('&#9899;');$ ('#232').html ('&#9899;');}
                        else if (broj_dva >= 2) {$ ('#info2').html ('&#x2713;'); $ ('#211').html ('&#9899;');$ ('#212').html ('&#9899;');$ ('#221').html ('&#9899;');$ ('#222').html ('&#9899;');$ ('#231').html ('&#9898;');$ ('#232').html ('&#9898;');}
                        else if (broj_dva >= 1) {$ ('#info2').html ('&#x2713;'); $ ('#211').html ('&#9899;');$ ('#212').html ('&#9899;');$ ('#221').html ('&#9898;');$ ('#222').html ('&#9898;');$ ('#231').html ('&#9898;');$ ('#232').html ('&#9898;');}
                        else {$ ('#info2').html ('&#x2713;'); $ ('#211').html ('&#9898;');$ ('#212').html ('&#9898;');$ ('#221').html ('&#9898;');$ ('#222').html ('&#9898;');$ ('#231').html ('&#9898;');$ ('#232').html ('&#9898;');}
                        
                        // brodovi duljine 1
                        if (broj_jedan >= 4) {if (broj_jedan > 4) $ ('#info1').html ('&#x2717;'); else $ ('#info1').html ('&#x2713;'); $ ('#111').html ('&#9899;');$ ('#121').html ('&#9899;');$ ('#131').html ('&#9899;');$ ('#141').html ('&#9899;');}
                        else if (broj_jedan >= 3) {$ ('#info1').html ('&#x2713;'); $ ('#111').html ('&#9899;');$ ('#121').html ('&#9899;');$ ('#131').html ('&#9899;');$ ('#141').html ('&#9898;');}
                        else if (broj_jedan >= 2) {$ ('#info1').html ('&#x2713;'); $ ('#111').html ('&#9899;');$ ('#121').html ('&#9899;');$ ('#131').html ('&#9898;');$ ('#141').html ('&#9898;');}
                        else if (broj_jedan >= 1) {$ ('#info1').html ('&#x2713;'); $ ('#111').html ('&#9899;');$ ('#121').html ('&#9898;');$ ('#131').html ('&#9898;');$ ('#141').html ('&#9898;');}
                        else {$ ('#info1').html ('&#x2713;'); $ ('#111').html ('&#9898;');$ ('#121').html ('&#9898;');$ ('#131').html ('&#9898;');$ ('#141').html ('&#9898;');}
                    }
                    obojaj_kruzice ();
                });                       
            }
            if (retci[i] !== 0)
                $ ('#r' + i).html (retci[i]).css ('background-color', 'white').css ('text-align', 'right');
            else
                $ ('#r' + i).html (retci[i]).css ('background-color', 'white').css ('text-align', 'right').css ('color', 'lightgreen');
        }
        for (let j = 0; j < duljina - 1; ++j) {
            if (stupci[j] !== 0)
                $ ('#s' + j).html (stupci[j]).css ('background-color', 'white');
            else
                $ ('#s' + j).html (stupci[j]).css ('background-color', 'white').css ('color', 'lightgreen');
        }

        $ ('#bzvz').css ('background-color', 'white');
    }

    function init () {
        $('#provjera').prop('disabled', false);
        init_obojaj_kruzice ();
        vrati_checkmarks ();
        for (let i = 0; i < 11; ++i) {
            mapa[i] = new Array (11);
            for (let j = 0; j < 11; ++j) {
                mapa[i][j] = 0;
            }
        }

        req = $.ajax({
            url: 'https://rp2.studenti.math.hr/~zbujanov/dz4/id.php',
            dataType: "json",
            data: {},
            success: function (data)
            {
                id_igre = data["id"];
                retci = data["rows"];
                stupci = data["cols"];
                // console.log("id igre = " + id_igre);
                // console.log("retci = " + retci);
                // console.log("stupci = " + stupci);
            },
            error: function (xhr, status)
            {
                console.log ("error: nisam uspio inicijalizirati :(");
            }
        });
        return mapa
    }

    $ ("#ispocetka").on ("click", function ()
        {
            $ ('#mapa').empty ();
            init ();
            $.when (req).done (function program ()
            {   
                nacrtaj ();
            });
        });

    $ ('#provjera').on ('click', function obradi_provjeru ()
    {
        var lista_objekata = new Array ();

        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                let tip = '';
                if (mapa[i][j] === 1)
                    tip = 'ship';
                else if (mapa[i][j] === 2)
                    tip = 'sea';
                else continue;
                lista_objekata.push ({row: i + 1, col: j + 1, type: tip});
            }
        }

        if (lista_objekata.length !== 0) {
            $.ajax(
            {
                url: "https://rp2.studenti.math.hr/~zbujanov/dz4/check.php",
                data:
                {
                    id: id_igre,
                    list: lista_objekata,
                },
                type: "POST",
                dataType: "json",
                success: function(data)
                {
                    for (let i = 0; i < data.length; ++i) {
                        if (data[i]["answer"] === 'wrong') {
                            let row = data[i]['row'] - 1;
                            let col = data[i]['col'] - 1;
                            $ ('#' + row + col)
                                .css ('background-color', 'darkred');
                        }
                    }//pazit da nema provjere kad nista nije stavljeno
                    let broj_tocnih = 0;
                    let broj_stavljenih = 0;
                    if (data.length !== 0) {
                        for (let i = 0; i < data.length; ++i) {
                            if (data[i]["answer"] === 'correct' && data[i]["type"] === 'ship') {
                                ++broj_tocnih;
                            }
                            if (data[i]["type"] === 'ship') {
                                ++broj_stavljenih;
                            }
                        }
                    }
                    if (broj_tocnih === 20 && broj_stavljenih === 20) {
                        for (let i = 0; i < data.length; ++i)
                            if (data[i]["answer"] === 'correct' && mapa[data[i]["row"] - 1][data[i]["col"] - 1] === '&#9875;') {
                                let red = data[i]["row"] - 1;
                                let stupac = data[i]["col"] - 1;
                                $ ('#' + red + stupac).css ('background-color', 'darkgreen');
                            }

                        if (confirm ("Čestitke na pobjedi! Želiš li igrati ponovno?")) {
                            $ ('#mapa').empty ();
                            vrati_checkmarks ();
                            init ();
                            $.when (req).done (function program ()
                            {   
                                nacrtaj ();
                            });
                        }
                        else {
                            for (let i = 0; i < 10; ++i) {
                                for (let j = 0; j < 10; ++j) {
                                    $ ('#' + i + j).off ();
                                }
                            }
                            $('#provjera').prop('disabled', true);
                        }             
                    }
                },
                error: function(xhr,status)
                {
                    console.log("error: Nisam uspio provjeriti stanje :(");
                }
            });
        }
    });
});

function nacrtaj_mapu (mapa) {
    let duljina = mapa.length
    let visina = mapa[0].length

    let okvir = $ ('#mapa');   

    for (let i = 0; i < visina - 1; ++i) {
        okvir.append ('<tr id="' + i + '">');
        let red = $ ('#' + i);
        for (let j = 0; j < duljina - 1; ++j) {
            red.append ('<td id="' + i + j + '">');
        }
        red.append ('<td id="r' + i + '">');
    }
    okvir.append ('<tr id="stupci">');
    let red = $ ('#stupci');
    for (let j = 0; j < duljina - 1; ++j) {
        red.append ('<td id="s' + j + '">');
    }
    red.append ('<td id="bzvz">');
}

function vrati_pozadine () {
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            $ ('#' + i + j).css ('background-color', '#BEBEBE');
        }
    }
}

//ovo je najgluplji moguci nacin, lakse je priko regexa, ali eto samo copy paste jer neman previse vrimena :)
function init_obojaj_kruzice () {
    $ ('#411').html ('&#9898;');$ ('#412').html ('&#9898;');$ ('#413').html ('&#9898;');$ ('#414').html ('&#9898;');
    
    $ ('#311').html ('&#9898;');$ ('#312').html ('&#9898;');$ ('#313').html ('&#9898;');$ ('#321').html ('&#9898;');$ ('#322').html ('&#9898;');$ ('#323').html ('&#9898;');

    $ ('#211').html ('&#9898;');$ ('#212').html ('&#9898;');$ ('#221').html ('&#9898;');$ ('#222').html ('&#9898;');$ ('#231').html ('&#9898;');$ ('#232').html ('&#9898;');

    $ ('#111').html ('&#9898;');$ ('#121').html ('&#9898;');$ ('#131').html ('&#9898;');$ ('#141').html ('&#9898;');
}

function vrati_checkmarks () {
    $ ('#info1').html ('&#x2713;');
    $ ('#info2').html ('&#x2713;');
    $ ('#info3').html ('&#x2713;');
    $ ('#info4').html ('&#x2713;');
}
