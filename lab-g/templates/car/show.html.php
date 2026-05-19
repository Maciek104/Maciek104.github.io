<?php
/** @var \App\Model\Car $car */
/** @var \App\Service\Router $router */

$title = "{$car->getMake()} {$car->getModel()} ({$car->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= htmlspecialchars($car->getMake() . ' ' . $car->getModel()) ?></h1>

    <ul>
        <li>Year: <?= htmlspecialchars($car->getYear()) ?></li>
        <li>Price: $<?= htmlspecialchars($car->getPrice()) ?></li>
    </ul>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('car-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('car-edit', ['id'=> $car->getId()]) ?>">Edit</a></li>
        <li>
            <form action="<?= $router->generatePath('car-delete', ['id' => $car->getId()]) ?>" method="post" style="display:inline">
                <button type="submit" onclick="return confirm('Are you sure you want to delete this car?')">Delete</button>
            </form>
        </li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . '/../base.html.php';