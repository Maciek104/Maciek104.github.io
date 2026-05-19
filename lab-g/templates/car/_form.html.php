<?php
/** @var \App\Model\Car|null $car */
?>

<div class="form-group">
    <label for="make">Make</label>
    <input type="text" id="make" name="car[make]" value="<?= $car ? htmlspecialchars($car->getMake()) : '' ?>">
</div>

<div class="form-group">
    <label for="model">Model</label>
    <input type="text" id="model" name="car[model]" value="<?= $car ? htmlspecialchars($car->getModel()) : '' ?>">
</div>

<div class="form-group">
    <label for="year">Year</label>
    <input type="number" id="year" name="car[year]" value="<?= $car ? htmlspecialchars($car->getYear()) : '' ?>">
</div>

<div class="form-group">
    <label for="price">Price</label>
    <input type="number" step="0.01" id="price" name="car[price]" value="<?= $car ? htmlspecialchars($car->getPrice()) : '' ?>">
</div>

<div class="form-group">
    <input type="submit" value="Submit">
</div>