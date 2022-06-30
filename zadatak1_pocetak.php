<?php
session_start();
ispisi_header(); 
ispisi_formu();
ispisi_footer();


$_SESSION['uzeti_predmeti'] = [];
$_SESSION['predmeti_na_lokaciji'] = [];

//---------------------------------
function ispisi_header()
{
    ?>
    <!DOCTYPE html>
        <html lang="hr">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
    <?php
}

function ispisi_formu()
{
    ?>
            <form action="zadatak1.php" method="post">
                Unesi naziv lokacije:
                <input type="text" name="lokacija">
                <br>
                <br>
                <button type="submit">Kreni!</button>
            </form>
        <?php
}

function ispisi_footer()
{
    ?>
     </body>
     </html>
     <?php
}
?>