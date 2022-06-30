$ (document).ready (function ()
{   
    
    dodaj_canvas_u_html ();
    $ ('body').children ('h2').hide ();
    $ ('body').children ('.chart').hide ();
    let ctx = $ ("#cnv").get (0).getContext ("2d");

    let charts = $ (".chart");
    ctx.translate (10, 40);

    let naslovi = $ ("h2");
    for (let i = 0; i < charts.length; ++i) {
        
        dodaj_naslov (naslovi.eq (i).html (), charts.eq (i).attr ('title'));
        
        dodaj_legendu (charts.eq (i).attr ('title'), charts.eq (i).children ());
        
        ctx.translate (50, 40);

        if (charts.get (i).hasAttribute ('data-xlabel') && charts.get (i).hasAttribute ('data-ylabel')) {
            translx = 1.25 * ctx.measureText (charts.eq (i).data ('ylabel')).width;
        }
        else
            translx = 0;

        let transl = dodaj_chart (charts.get (i), charts.eq (i), translx);

        ctx.moveTo (0,0);
        
        if (charts.get (i).hasAttribute ('data-xlabel') && charts.get (i).hasAttribute ('data-ylabel')) {        
            let duljina = (- translx + 1.25 * max_text_length_chart (charts.eq (i)) + 315 + 1.25 * ctx.measureText (charts.eq (i).data ('xlabel')).width + 1.25 * ctx.measureText (charts.eq (i).data ('ylabel')).width) / 2;
            dodaj_x_labelu (transl, duljina, charts.eq (i).data ('ylabel'));            
        }

        ctx.moveTo (0, 0);
        ctx.translate (-50, transl + 40);
        ctx.translate (0, 10);
    }
});

function dodaj_canvas_u_html () {
    $ ('body').append ('<canvas id="cnv" height="1200" width="1800" style="border: 1px solid black;">Ovaj tekst se prikazuje ako Canvas nije podržan.</canvas>');
}

function dodaj_naslov (html, title) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    ctx.save ();
    ctx.font = '40px serif';
    ctx.fillText (html, 0, 0);
    ctx.restore ();

    ctx.translate (0, 40);

    ctx.save ();
    ctx.textBaseline = "top";
    ctx.font = 'bold 20px serif';
    ctx.fillText (title, 0, 0);
    ctx.restore ();
}

function max_val_chart (chart) {
    let sets = chart.children ();
    let size = sets.length;
    let max = -1.0;

    for (let i = 0; i < size; ++i) {
        let set = sets.eq (i).children ();
        let size2 = set.length;
        for (let j = 0; j < size2; ++j) {
            if (Number (set.eq (j).data ('value')) > max)
                max = Number (set.eq (j).data ('value'));
        }
    }
    return max;
}

function dodaj_legendu (title, kolekcija) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    ctx.save ();
    ctx.translate (2 * ctx.measureText (title).width + 40, 0);
    ctx.moveTo (0, 0);
    for (let j = 0; j < kolekcija.length; ++j) {
        let red = 100 + j * 30;
        let green = 200 - j * 30;
        let blue = 150 + j * 20;
        ctx.beginPath ();
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';//isto ovisi o poretku
        ctx.moveTo (0, 0);
        ctx.lineTo (15, 0);
        ctx.lineTo (15, 15);
        ctx.lineTo (0, 15);
        ctx.lineTo (0, 0);
        ctx.fill ();
        ctx.fillStyle = 'black';
        ctx.textBaseline = "top";
        ctx.font = '10px serif';
        ctx.translate (20, 10 / (2 * 1.25));
        ctx.fillText (kolekcija.eq (j).data ('dataset'), 0, 0);
        ctx.translate (0, - 10 / (2 * 1.25));
        
        ctx.translate (1.25 * ctx.measureText (kolekcija.eq (j).data ('dataset')).width, 0);
    }   
    ctx.restore ();
}

function dodaj_chart (chart1, chart2, translx) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    ctx.save ();
    ctx.translate (translx, 0);
    let transl = nacrtaj_chart (chart2);
    ctx.restore ();
    if (chart1.hasAttribute ('data-xlabel') && chart1.hasAttribute ('data-ylabel')) {
        ctx.save ();
        ctx.font = 'bold 15px serif';
        ctx.textAlign = "end";
        ctx.translate (0, transl / 2);
        ctx.fillText (chart2.data ('xlabel'), 0, 0);
        ctx.restore ();
    }
    return transl;
}

function dodaj_x_labelu (transl, duljina, ylabel) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    ctx.save ();
    ctx.translate (0, transl);
    ctx.translate (duljina, 0);
    ctx.font = 'bold 15px serif';
    ctx.fillText (ylabel, 0, 0);
    ctx.restore ();
}

function max_text_length_chart (chart) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");

    let sets = chart.children ();
    let size = sets.length;
    let max_text_length = -1.0;

    for (let i = 0; i < size; ++i) {
        let set = sets.eq (i).children ();
        let size2 = set.length;
        for (let j = 0; j < size2; ++j) {
            if (Number (ctx.measureText (set.eq (j).html ()).width) > max_text_length) {
                max_text_length = Number (ctx.measureText (set.eq (j).html ()).width);
            }
        }
    }
    return max_text_length;
}

function nacrtaj_chart (chart) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    let sets = chart.children ();
    let koliko_setova = sets.length;

    let koliko_u_setu = 0;

    max_val = max_val_chart (chart);
    max_text_length = max_text_length_chart (chart);

    ctx.save ();
    for (let i = 0; i < koliko_setova; ++i) {
        ctx.save ();
        let redni_broj_skupa = i;
        koliko_u_setu = nacrtaj_skup_podataka (sets.eq (0), sets.eq (i), max_val, max_text_length, koliko_setova, redni_broj_skupa);
        ctx.restore ();
        ctx.translate (0, 20);
    }
    ctx.restore ();

    ctx.save ();
    for (let i = 0; i < koliko_u_setu; ++i) {
        ctx.translate (0, koliko_setova * 10  /*- koliki je font*/);
        ctx.font = '15px serif';
        ctx.save ();
        ctx.translate (max_text_length * 1.25 - 10, 0);
        ctx.translate (0, 15 / (2 * 1.25 * koliko_setova));
        ctx.textAlign = "end";
        ctx.fillText (sets.eq (0).children ().eq (i).html (), 0, 0);
        ctx.translate (0, -15 / (2 * 1.25 *  koliko_setova));
        ctx.restore ();
        ctx.translate (0, - koliko_setova * 10);
        ctx.translate (0, (koliko_setova + 1) * 20);
    }
    ctx.restore ();

    ctx.save ();
    ctx.beginPath ();
    ctx.moveTo (0, 0);
    ctx.lineTo (10, (koliko_setova + 1) * (koliko_u_setu) * 20);
    ctx.restore();

    return (koliko_setova + 1) * (koliko_u_setu) * 20;
}

function nacrtaj_skup_podataka (set_zero, set_current, max_val, max_text_length, koliko_setova, redni_broj_skupa) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    let elements = set_current.children ();
    let elements_zero = set_zero.children ();

    let koliko_u_setu = elements.length;
    
    ctx.translate (max_text_length * 1.25, 0);
    for (let i = 0; i < elements_zero.length; ++i) {
        for (let j = 0; j < elements.length; ++j) {
            if (elements.eq (j).html () === elements_zero.eq (i).html ()) {
                nacrtaj_podatak (elements.eq (j), koliko_u_setu, max_val, max_text_length, koliko_setova, redni_broj_skupa);
                break;
            }
        }
    }
    return koliko_u_setu;
}

function nacrtaj_podatak (element, koliko_u_setu, max_val, max_text_length, koliko_setova, redni_broj_skupa) {
    let ctx = $ ("#cnv").get (0).getContext ("2d");
    let val = Number (element.data ('value'));

    ctx.save ();
    ctx.beginPath ();
    ctx.lineWidth = 2;
    ctx.moveTo (0, 0);
    ctx.lineTo ((val / max_val) * 300, 0);
    ctx.lineTo ((val / max_val) * 300, 15);
    ctx.lineTo (0, 15);
    ctx.lineTo (0, 0);
    ctx.stroke ();

    let red = 100 + redni_broj_skupa * 30;
    let green = 200 - redni_broj_skupa * 30;
    let blue = 150 + redni_broj_skupa * 20;
    ctx.beginPath ();
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';//isto ovisi o poretku
    ctx.moveTo (0, 0);
    ctx.lineTo ((val / max_val) * 300, 0);
    ctx.lineTo ((val / max_val) * 300, 15);
    ctx.lineTo (0, 15);
    ctx.lineTo (0, 0);
    ctx.fill ();

    ctx.beginPath ();
    ctx.moveTo (0, 0);
    ctx.translate ((val / max_val) * 300 + 15, 11);
    ctx.font = '15px serif';
    ctx.strokeText (val, 0, 0);
    ctx.restore ();

    ctx.translate (0, 20 * (koliko_setova + 1));
}