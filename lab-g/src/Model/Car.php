<?php
namespace App\Model;

use App\Service\Config;

class Car
{
    private ?int $id = null;
    private ?string $make = null;
    private ?string $model = null;
    private ?int $year = null;
    private ?float $price = null;

    public function getId(): ?int { return $this->id; }
    public function setId(?int $id): Car { $this->id = $id; return $this; }

    public function getMake(): ?string { return $this->make; }
    public function setMake(?string $make): Car { $this->make = $make; return $this; }

    public function getModel(): ?string { return $this->model; }
    public function setModel(?string $model): Car { $this->model = $model; return $this; }

    public function getYear(): ?int { return $this->year; }
    public function setYear(?int $year): Car { $this->year = $year; return $this; }

    public function getPrice(): ?float { return $this->price; }
    public function setPrice(?float $price): Car { $this->price = $price; return $this; }

    public static function fromArray($array): Car
    {
        $car = new self();
        $car->fill($array);
        return $car;
    }

    public function fill($array): Car
    {
        if (isset($array['id']) && !$this->getId()) $this->setId($array['id']);
        if (isset($array['make'])) $this->setMake($array['make']);
        if (isset($array['model'])) $this->setModel($array['model']);
        if (isset($array['year'])) $this->setYear($array['year']);
        if (isset($array['price'])) $this->setPrice($array['price']);
        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM cars';
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $cars = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
            $cars[] = self::fromArray($row);
        }

        return $cars;
    }

    public static function find($id): ?Car
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM cars WHERE id = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? self::fromArray($row) : null;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (!$this->getId()) {
            $sql = "INSERT INTO cars (make, model, year, price) VALUES (:make, :model, :year, :price)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                'make' => $this->getMake(),
                'model' => $this->getModel(),
                'year' => $this->getYear(),
                'price' => $this->getPrice(),
            ]);
            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE cars SET make=:make, model=:model, year=:year, price=:price WHERE id=:id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':make' => $this->getMake(),
                ':model' => $this->getModel(),
                ':year' => $this->getYear(),
                ':price' => $this->getPrice(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM cars WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $this->getId()]);

        $this->id = null;
        $this->make = null;
        $this->model = null;
        $this->year = null;
        $this->price = null;
    }
}