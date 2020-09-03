const Event = require('../models/event-model')
let callbackHelper = require('../updateFlag');

const createEvent = (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an event',
        })
    }

    const event = new Event(body)

    if (!event) {
        return res.status(400).json({
            success: false,
        })
    }



    event
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: event._id,
                message: 'Event created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })
        })

    callbackHelper.runCallback();
}

const deleteEvent = async (req, res) => {
    await Event.findOneAndDelete({
        _id: req.params.id
    }, (err, event) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!event) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `Event not found`
                })
        }

        return res.status(200).json({
            success: true,
            data: event
        })
    }).then(callbackHelper.runCallback()).catch(err => console.log(err))
}

const getEvents = async (req, res) => {
    await Event.find({}, (err, events) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!events.length) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: `Events not found`
                })
        }
        return res.status(200).json({
            success: true,
            data: events
        })
    }).catch(err => console.log(err))
}

const getLast = async (req, res) => {
    await Event.find({}).sort({
        createdAt: -1
    }).limit(3).exec((err, events) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            data: events
        })
    })
}

const getNumber = async (req, res) => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    let date = yyyy + "/" + mm + "/" + dd;

    await Event.find({
        "date": date
    }, (err, events) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            data: events.length
        })
    }).catch(err => console.log(err))
}

const searchEvents = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide search terms',
        })
    }

    let date1 = body.date1;

    let date2 = body.date2;

    let type = body.type;

    if (type === "Select All") {
        await Event.find({
            date: {
                $gte: date1,
                $lte: date2
            }
        }, (err, events) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                body: events
            })
        }).catch(err => console.log(err))
    } else {
        await Event.find({
            date: {
                $gte: date1,
                $lte: date2
            },
            type: type
        }, (err, events) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                body: events
            })
        }).catch(err => console.log(err))
    }




}


module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    getLast,
    getNumber,
    searchEvents
}