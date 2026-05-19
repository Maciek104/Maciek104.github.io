<?php
/** @var \App\Model\Car $car */
/** @var \App\Service\Router $router */

$title = 'Create Car';
$bodyClass = 'create';

ob_start(); ?>

    <h1>Create a new Car</h1>

    <form action="<?= $router->generatePath('car-create') ?>" method="post">
        <?php include __DIR__ . '/_form.html.php'; ?>
    </form>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('car-index') ?>">Back to list</a></li>
    </ul>

<?php $main = ob_get_clean();
include __DIR__ . '/../base.html.php';