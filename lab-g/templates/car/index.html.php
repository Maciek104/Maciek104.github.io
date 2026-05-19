<?php

/** @var \App\Model\Car[] $cars */
/** @var \App\Service\Router $router */

$title = "Cars list";
$bodyClass = 'index';

ob_start(); ?>
    <h1>Cars</h1>
    <a href="<?= $router->generatePath('car-create') ?>" class="button">Add new car</a>
    <ul>
        <?php foreach ($cars as $car): ?>
            <li>
                <a href="<?= $router->generatePath('car-show', ['id' => $car->getId()]) ?>">
                    <?= htmlspecialchars($car->getMake() . ' ' . $car->getModel()) ?>
                </a>
                (<?= $car->getYear() ?>) - $<?= number_format($car->getPrice(), 2) ?>
            </li>
        <?php endforeach; ?>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';