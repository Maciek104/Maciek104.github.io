from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

DATABASE = "cars.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def home():
    return redirect(url_for("cars_list"))


# LISTA
@app.route("/cars")
def cars_list():
    conn = get_db()
    cars = conn.execute(
        "SELECT * FROM cars ORDER BY id"
    ).fetchall()
    conn.close()

    return render_template(
        "cars_list.html",
        cars=cars
    )


# PODGLĄD
@app.route("/cars/<int:id>")
def car_show(id):
    conn = get_db()

    car = conn.execute(
        "SELECT * FROM cars WHERE id=?",
        (id,)
    ).fetchone()

    conn.close()

    return render_template(
        "car_show.html",
        car=car
    )


# CREATE
@app.route("/cars/create", methods=["GET", "POST"])
def car_create():

    if request.method == "POST":

        manufacturer = request.form["manufacturer"]
        model = request.form["model"]
        year = request.form["year"]
        price = request.form["price"]

        conn = get_db()

        conn.execute(
            """
            INSERT INTO cars
            (manufacturer, model, year, price)
            VALUES (?, ?, ?, ?)
            """,
            (manufacturer, model, year, price)
        )

        conn.commit()
        conn.close()

        return redirect(url_for("cars_list"))

    return render_template("car_create.html")


# EDIT
@app.route("/cars/<int:id>/edit", methods=["GET", "POST"])
def car_edit(id):
    conn = get_db()
    car = conn.execute(
        "SELECT * FROM cars WHERE id=?",
        (id,)
    ).fetchone()

    if request.method == "POST":
        manufacturer = request.form["manufacturer"]
        model = request.form["model"]
        year = request.form["year"]
        price = request.form["price"]

        conn.execute(
            """UPDATE cars SET manufacturer=?, model=?, year=?, price=? WHERE id=?""",
            (manufacturer, model, year, price, id)
        )

        conn.commit()
        conn.close()

        return redirect(url_for("cars_list"))

    conn.close()

    return render_template(
        "car_edit.html",
        car=car
    )


# DELETE
@app.route("/cars/<int:id>/delete")
def car_delete(id):

    conn = get_db()

    conn.execute(
        "DELETE FROM cars WHERE id=?",
        (id,)
    )

    conn.commit()
    conn.close()

    return redirect(url_for("cars_list"))


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=57791,
        debug=True
    )