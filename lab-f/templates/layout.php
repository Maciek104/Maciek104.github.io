<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maciej Stępień (57791) - PTW LAB F</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>

<main>
    <h1>Konwerter Formatu Danych</h1>

    <form method="POST">
        <div class="form-group">
            <label for="input">Dane wejsciowe:</label>
            <textarea id="input" name="input" rows="8" placeholder="Wklej tutaj swoje dane...">
                <?php echo htmlspecialchars($input ?? ''); ?>
            </textarea>
        </div>

        <div class="controls">
            <div style="flex: 1;">
                <label for="format_in">Format wejsciowy:</label>
                <select name="format_in" id="format_in">
                    <?php
                    $formats = ['CSV', 'SSV', 'TSV', 'JSON', 'YAML'];
                    foreach($formats as $f):
                        ?>
                        <option value="<?= $f ?>" <?= ($format_in ?? '') === $f ? 'selected' : '' ?>><?= $f ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div style="flex: 1;">
                <label for="format_out">Format wyjsciowy:</label>
                <select name="format_out" id="format_out">
                    <?php foreach($formats as $f): ?>
                        <option value="<?= $f ?>" <?= ($format_out ?? '') === $f ? 'selected' : '' ?>><?= $f ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit">Konwertuj</button>
        </div>
    </form>

    <?php if (!empty($output)): ?>
        <div class="form-group">
            <label>Wynik operacji:</label>
            <div class="output-area">
                <pre><?php echo htmlspecialchars($output); ?></pre>
            </div>
        </div>
    <?php endif; ?>

    <footer>
        &copy Maciej Stępień
    </footer>
</main>

</body>
</html>