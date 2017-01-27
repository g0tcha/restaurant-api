import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import restaurant from '../controller/restaurant';

let router = express();

// -- Connect to the database.
initializeDb(db => {
    // -- Interval middleware.
    router.use(middleware({ config, db }));

    // -- Api routes v1 (/v1)
    router.use('/restaurant', restaurant({ config, db }));
});

export default router;
