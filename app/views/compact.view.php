<?php

function getColorByCrimeRate(float $crimeRate)
{
    switch ($crimeRate) {
        case ($crimeRate == 0):
            return "#777";
        case ($crimeRate <= 0.04):
            return "#27ae60";
        case ($crimeRate <= 0.07):
            return "#ff7e29";
        default:
            return "#c0392b";
    }
}

?>

<html lang="en">

<head>
    <title>Compact / CrimeView</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
    <?php require __DIR__ . "/shared/compact-navbar.view.php"; ?>
    <div class="container-compact">
        <h2>CrimeView <span class="compact-header">Compact</span></h2>
        <p>
            CrimeView compact displays criminal statistics for a route between two german cities.
            <br>
            To see additional information visit our main site <a href="/home">here</a>.
        </p>
        <hr>
        <?php if ($data["fail"]) : ?>
            <h4>Sorry, we couldn't find a route for these parameters.</h4>
            <p>Make sure to enter two valid names of german cities.</p>
        <?php else : ?>
            <h4><?php echo $data["from"]->getName() . " - " . $data["to"]->getName(); ?></h4>Average Crimerate = <span style="color: <?php echo getColorByCrimeRate($data["averageCrimeRate"]); ?>;"><?php echo $data["averageCrimeRate"]; ?></span></p>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">County</th>
                        <th scope="col">CR <?php echo $data["counties"][0]->getCrimeStats()[0]->getYear(); ?></th>
                        <th scope="col">CR <?php echo $data["counties"][0]->getCrimeStats()[1]->getYear(); ?></th>
                        <th scope="col">CR <?php echo $data["counties"][0]->getCrimeStats()[2]->getYear(); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($data["counties"] as $key => $county) : ?>
                        <tr>
                            <td><?php echo $key + 1; ?></td>
                            <td><?php echo $county->getName() . " (" . $county->getType() . ")"; ?> </td>
                            <td style="color: <?php echo getColorByCrimeRate($county->getCrimeStats()[0]->getRate()); ?>"><?php echo $county->getCrimeStats()[0]->getRate(); ?></td>
                            <td style="color: <?php echo getColorByCrimeRate($county->getCrimeStats()[1]->getRate()); ?>"><?php echo $county->getCrimeStats()[1]->getRate(); ?></td>
                            <td style="color: <?php echo getColorByCrimeRate($county->getCrimeStats()[2]->getRate()); ?>"><?php echo $county->getCrimeStats()[2]->getRate(); ?></td>
                        </tr>
                    <?php endforeach ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</body>

</html>