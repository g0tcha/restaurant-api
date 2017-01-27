// -- Restaurant Controller
import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';
import bodyParser from 'body-parser';

export default({ config, db }) => {
    let api = Router();

    // CRUD - Create Read Update Delete

    // '/v1/restaurant/add' - Create
    api.post('/add', (req, res) => {
        let newRestaurant = new Restaurant();
        newRestaurant.name = req.body.name;

        newRestaurant.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant saved successfully.'});
        });
    });

    // '/v1/restaurant' - Read.
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => {
            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // '/v1/restaurant/:id' - Read.
    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    // '/v1/restaurant/:id' - Update.
    api.put('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Restaurant info updated.'});
            });
        });
    });

    return api;
}
