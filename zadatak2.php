<?php

$ucionice = [
    ['naziv' => '(003)',  'nrows' => 9, 'ncols' => 6 ],
    ['naziv' => '(006)',  'nrows' => 8, 'ncols' => 4 ],
    ['naziv' => '(001)',  'nrows' => 7, 'ncols' => 5 ],
    ['naziv' => '(101)',  'nrows' => 6, 'ncols' => 6 ],
    ['naziv' => '(A201)', 'nrows' => 5, 'ncols' => 3 ],
];

$studenti = [
    'Mirko Mirković'        => ['(006)',  3, 2],
    'Franjo Franjić'        => ['(003)',  6, 1],
    'Lucija Lucić'          => ['(A201)', 5, 2],
    'Boris Borisović'       => ['(101)',  4, 5],
    'Pero Perić'            => ['(006)',  6, 1],
    'Ana Anić'              => ['(006)',  2, 3],
    'Zrinka Zrinkić'        => ['(001)',  2, 5],
    'Slavko Slavić'         => ['(A201)', 1, 1],
    'Marko Marković'        => ['(003)',  2, 6],
    'Marija Marijić'        => ['(A201)', 2, 6],
    'Maja Majić'            => ['(006)',  8, 4],
    'Vladimir Vladimirović' => ['(101)',  3, 1]
    // ,
    // 'a' => ['(101)',  3, 1]
];


// ----------------------------------
// Dodajte svoj kod ispod.
// ----------------------------------


function send_JSON_and_exit($message)
{
    header('Content-type:application/json;charset=utf-8');
    echo json_encode($message);
    flush();
    exit(0);
}

if(isset($_GET['ucionice']))
{
    send_JSON_and_exit($ucionice);
}
else if(isset($_GET['osoba']))
{
    $msg = [];
    $msg['row'] = $studenti[$_GET['osoba']][1];
    $msg['col'] = $studenti[$_GET['osoba']][2];
    send_JSON_and_exit($msg);
}
else if(isset($_GET['ucionica']))
{
    $msg = [];
    foreach($studenti as $key => $value)
    {
        if($value[0] === $_GET['ucionica'])
            $msg[] = $key;
    }
    send_JSON_and_exit($msg);
}
else if(isset($_GET['nacrtaj']))
{
    $msg = [];
    foreach($ucionice as $ucionica)
    {
        if($ucionica['naziv'] === $_GET['nacrtaj'])
        {
            $msg['nrows'] = $ucionica['nrows'];
            $msg['ncols'] = $ucionica['ncols'];
        }
    }
    send_JSON_and_exit($msg);
}
else if(isset($_GET['zauzeca']))
{
    $msg = [];
    foreach($studenti as $key => $value)
    {
        if($value[0] === $_GET['zauzeca'])
            $msg[] = [$value[1], $value[2]];
    }
    send_JSON_and_exit($msg);
}

?>