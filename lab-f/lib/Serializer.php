<?php
namespace App;

use App\Encoder\EncoderInterface;

class Serializer {
    private array $encoders = [];

    public function addEncoder(EncoderInterface $encoder): void {
        $this->encoders[] = $encoder;
    }

    public function convert(string $data, string $from, string $to): string {
        if ($from === $to) return $data;

        $inputData = [];
        foreach ($this->encoders as $encoder) {
            if ($encoder->supports($from)) {
                $inputData = $encoder->decode($data);
                break;
            }
        }

        foreach ($this->encoders as $encoder) {
            if ($encoder->supports($to)) {
                return $encoder->encode($inputData);
            }
        }
        return "Error: Unsupported format.";
    }
}