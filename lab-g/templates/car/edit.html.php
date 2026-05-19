<?php

/** @var \App\Model\Car $car */
/** @var \App\Service\Router $router */

$title = "Edit car: {$car->getMake()} {$car->getModel()}";
$bodyClass = 'edit';

ob_start(); ?>
    <h1>Edit car</h1>
    <form method="post" action="<?= $router->generatePath('car-edit', ['id'=> $car->getId()]) ?>">
        <label>Make:
            <input type="text" name="make" value="<?= htmlspecialchars($car->getMake()) ?>" required>
        </label>
        <label>Model:
            <input type="text" name="model" value="<?= htmlspecialchars($car->getModel()) ?>" required>
        </label>
        <label>Year:
            <input type="number" name="year" value="<?= htmlspecialchars($car->getYear()) ?>" required>
        </label>
        <label>Price:
            <input type="number" step="0.01" name="price" value="<?= htmlspecialchars($car->getPrice()) ?>" required>
        </label>
        <button type="submit">Save changes</button>
    </form>

    <a href="<?= $router->generatePath('car-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';