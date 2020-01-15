const { Router } = require('express');
const {Event, Site } = require('../../models');
const  moment = require('moment');

const router = new Router();

function addCoordinate(){
  let events = Event.get();

  events.forEach((element) =>{
    const tmpsite = Site.getById(element.siteID);
    element['latitude'] = tmpsite.latitude;
    element['longitude'] = tmpsite.longitude;
  });

  return events;
}
//router.get('/', (req, res) => res.status(200).json(Event.get()));

router.get('/', (req, res) => {
  try {
    res.status(200).json(addCoordinate());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

function checkDate(){
  let now = moment()
  let events = Event.get();
  let filtredEvents= [];
  events.forEach((element) =>{
    let d = moment(element.date,'DD/MM/YYYY').format('DD/MM/YYYY')
   // console.log(d)
    //console.log(moment().format('DD/MM/YYYY'))
    if(moment().format('DD/MM/YYYY') === d) {
      const tmpsite = Site.getById(element.siteID);
      element['latitude'] = tmpsite.latitude;
      element['longitude'] = tmpsite.longitude;
      filtredEvents.push(element)
    }
  });

  return filtredEvents;
}

router.get('/today', (req, res) => {
  try {
    res.status(200).json(checkDate());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

function checkAfterDate(){
  let now = moment();
  /*console.log(now.format())
  console.log(date)
  console.log(moment(date,'DD-MM-YYYY').isAfter(now))*/
  let events = Event.get();
  let filtredEvents= []
  events.forEach((element) =>{
   /* let d = moment(element.date,'DD/MM/YYYY').format('DD/MM/YYYY')
    console.log(d)*/
    if(moment(element.date,'DD/MM/YYYY').isAfter(now)) {
      const tmpsite = Site.getById(element.siteID);
      element['latitude'] = tmpsite.latitude;
      element['longitude'] = tmpsite.longitude;
      filtredEvents.push(element)
    }
  });
  return filtredEvents;
}

router.get('/after', (req, res) => {
  try {
    res.status(200).json(checkAfterDate());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});


function checkBeforeDate(){
  let now = moment();
  /*console.log(now.format())
  console.log(date)
  console.log(moment(date,'DD-MM-YYYY').isAfter(now))*/
  let events = Event.get();
  let filtredEvents= []
  events.forEach((element) =>{
    let d = moment(element.date,'DD/MM/YYYY').format('DD/MM/YYYY')
    if((moment(element.date,'DD/MM/YYYY').isBefore(now)) && !(moment().format('DD/MM/YYYY') === d)) {
      const tmpsite = Site.getById(element.siteID);
      element['latitude'] = tmpsite.latitude;
      element['longitude'] = tmpsite.longitude;
      filtredEvents.push(element)
    }
  });
  return filtredEvents;
}

router.get('/before', (req, res) => {
  try {
    res.status(200).json(checkBeforeDate());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});


router.post('/', (req, res) => {
  try {
    const event = Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

/*FOR TEST ---> FRONT-BACK-PYTHON*/
router.get('/testing', (req, res) => {

  var spawn = require("child_process").spawn;

  var process = spawn("python",["../Video Detection/yolo-object-detection/yolo.py","--image","../Video Detection/yolo-object-detection/images/yoga.jpg","--yolo","../Video Detection/yolo-object-detection/yolo-coco"]);

  process.stdout.on('data', (data) => {
    res.status(200).json(parseInt(data.toString(),10));
  });

  // Handle error output
  process.stderr.on('data', (data) => {
    res.status(401).json(data.toString());
  });

});

router.get('/testing/by-image/:name', (req, res) => {

  var spawn = require("child_process").spawn;

  var process = spawn("python",["../Video Detection/yolo-object-detection/yolo.py","--image","../Video Detection/yolo-object-detection/images/"+req.params.name,"--yolo","../Video Detection/yolo-object-detection/yolo-coco"]);

  process.stdout.on('data', (data) => {
    res.status(200).json(parseInt(data.toString(),10));
  });

  // Handle error output
  process.stderr.on('data', (data) => {
    res.status(401).json(data.toString());
  });

});
/*TEST END*/

module.exports = router;
