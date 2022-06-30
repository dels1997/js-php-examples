<?php

require_once __DIR__ .'/db.class.php';

session_start();

if(isset($_POST['lokacija']) && lokacija_postoji($_POST['lokacija']))
    $_SESSION['lokacija']= $_POST['lokacija'];
else if(isset($_POST['lokacija']) && !lokacija_postoji($_POST['lokacija']))
    exit('Lokacija ' . $_POST['lokacija'] . ' ne postoji! Gasim program...');

if(isset ($_POST['idi_btn']))
    $poruka = gibaj_se_u_smjeru($_POST['idi']);
else if(isset($_POST['uzmi_btn']) && isset($_POST['uzmi']))
    uzmi_predmete($_POST['uzmi']);
else if(isset($_POST['ispusti']))
    ispusti_predmet($_POST['ispusti']);

$_SESSION['predmeti_na_lokaciji'] = dohvati_predmete_na_lokaciji($_SESSION['lokacija']);
// $temp = [];

ispisi_header();
if(isset($_SESSION['lokacija']))
{
    prikazi_formu_za_kretanje();
    prikazi_formu_za_uzimanje($_SESSION['predmeti_na_lokaciji']);
    prikazi_formu_za_ispustanje($_SESSION['uzeti_predmeti']);

}

if(isset($poruka))
echo '<p>' . $poruka .'</p></br></br>';

ispisi_footer();

// debug();

//---------------------------------
function lokacija_postoji($lokacija)
{
    $db = DB::getConnection(); 
    $st = $db->prepare('SELECT * FROM lokacije WHERE naziv=:naziv');
    $st->execute(['naziv' => $lokacija]);
    $row = $st->fetch();
    if(!isset($row['naziv']))
        return null;
    return $row['naziv'];
}


function prikazi_formu_za_kretanje()
{
    echo '<form action="zadatak1.php" method="post">';
    echo 'Odaberi smjer u kojem želiš ići: ';
    echo '<select name="idi">'.
        '<option value="sjever">sjever</option>'.
        '<option value="istok">istok</option>'.
        '<option value="zapad">zapad</option>'.
        '<option value="jug">jug</option>'.
        '</select>';
    echo '<button type="submit" name="idi_btn">Idi!</button>';
    echo '</form></br></br>';
    
}

function prikazi_formu_za_uzimanje($predmeti)
{
    echo '<form action="zadatak1.php" method="post">';
    echo 'Na lokaciji se nalaze predmeti:</br>';
    foreach($predmeti as $predmet)
    {
        echo '<input type="checkbox" name="uzmi[]" value="' . $predmet .'">' . $predmet . '</br>';
    }
    
    echo '</br><button type="submit" name="uzmi_btn">Uzmi odabrane predmete!</button></br>';
    echo '</form></br></br>';
}

function prikazi_formu_za_ispustanje($predmeti)
{
    echo '<form action="zadatak1.php" method="post">';
    echo 'Elf nosi predmete:</br>';
    foreach($predmeti as $predmet)
    {
        echo '<button type="submit" name="ispusti" value="' . $predmet . '">' . $predmet .'</button></br>';
    }
    echo 'Klikom na gumb, Elf će izgubiti predmet!</br>';
    echo '</form></br></br>';
}


function dohvati_predmete_na_lokaciji($lokacija)
{
    $db = DB::getConnection(); 
    $st = $db->prepare('SELECT * FROM predmeti WHERE lokacija=:lokacija');
    $st->execute(['lokacija' => $lokacija]);

    $predmeti = [];
    while($row = $st->fetch())
    {
        $predmet = $row['naziv'];
        if(!in_array($predmet, $_SESSION['uzeti_predmeti']))
            $predmeti[] = $predmet;
    }

    return $predmeti;
}

function gibaj_se_u_smjeru($smjer)
{
    $db = DB::getConnection(); 
    $st = $db->prepare('SELECT * FROM lokacije WHERE naziv=:naziv');
    $st->execute(['naziv' => $_SESSION['lokacija']]);
    $row = $st->fetch();

    $nova_lokacija = $row[$smjer];

    if($nova_lokacija === '-')
    {
        return 'Nije moguće ići u smjeru ' . $smjer . '. Elf je ostao na lokaciji ' . $_SESSION['lokacija'] . '.';
    }
    else
    {
        $_SESSION['lokacija'] = $nova_lokacija;
    }
    return null;
}

function uzmi_predmete($predmeti)
{
    if(isset($predmeti))
        foreach($predmeti as $predmet)
        {
            if(!in_array($predmet, $_SESSION['uzeti_predmeti']))
                $_SESSION['uzeti_predmeti'][] = $predmet;
        }
}


function ispusti_predmet($predmet)
{
    $novi_predmeti = [];
    foreach($_SESSION['uzeti_predmeti'] as $predmet_session)
    {
        if($predmet_session !== $predmet)
        {
            $novi_predmeti[] = $predmet_session;
        }
    }
    $_SESSION['uzeti_predmeti'] = $novi_predmeti;
}

function ispisi_header()
{
    ?>
    <!DOCTYPE html>
        <html lang="hr">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>Elf se nalazi na lokaciji: <?php echo $_SESSION['lokacija'];?></h1>
    <?php
}

function ispisi_footer()
{
    ?>
     </body>
     </html>
     <?php
}


function debug()
{
    echo '<pre>';
    echo '$_POST='; print_r($_POST);
    echo '$_SESSION='; print_r($_SESSION);
    echo '<pre>';
}

?>