<?php
namespace App\Encoder;

class CsvEncoder implements EncoderInterface {
    private $delimiter;
    private $format;

    public function supports(string $format): bool {
        $delimiters = ['CSV' => ',', 'SSV' => ';', 'TSV' => "\t"];
        if (isset($delimiters[$format])) {
            $this->format = $format;
            $this->delimiter = $delimiters[$format];
            return true;
        }
        return false;
    }

    public function decode(string $data): array {
        $lines = explode("\n", trim($data));
        $header = str_getcsv(array_shift($lines), $this->delimiter, '"', "\\");
        $result = [];
        foreach ($lines as $line) {
            if (empty(trim($line))) continue;
            $row = str_getcsv($line, $this->delimiter, '"', "\\");
            if (count($row) === count($header)) {
                $result[] = array_combine($header, $row);
            }
        }
        return $result;
    }

    public function encode(array $data): string {
        if (empty($data)) return "";
        $output = fopen('php://temp', 'r+');
        fputcsv($output, array_keys($data[0]), $this->delimiter);
        foreach ($data as $row) {
            fputcsv($output, $row, $this->delimiter);
        }
        rewind($output);
        $content = stream_get_contents($output);
        fclose($output);
        return trim($content);
    }
}