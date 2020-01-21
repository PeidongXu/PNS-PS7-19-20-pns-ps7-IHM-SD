const { Router } = require('express');
const {Event, Site,Favorite } = require('../../models');
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
  filtredEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );
  return filtredEvents;
}

function TodayEvents(){
  /*let filtredEvents= [];
  filtredEvents = filtredEvents.concat(checkRightNow());
  filtredEvents = filtredEvents.concat(checkTodayNotStarted());
  filtredEvents = filtredEvents.concat(checkTodayFinish());

  return filtredEvents;*/

  let data=[];
  let RightNow ={"title": "Events in progress" , "data":checkRightNow() };
  data=data.concat(RightNow)
  let NotStarted =  {"title": "Events not started" , "data":checkTodayNotStarted() };
  data=data.concat(NotStarted)
  let Finished =  {"title": "Events finished" , "data":checkTodayFinish() };
  data=data.concat(Finished)

  return data;

}

router.get('/today', (req, res) => {
  try {
    res.status(200).json(TodayEvents());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});
function checkTodayNotStarted(){
  var format = 'HH:mm'
// var time = moment() gives you current time. no format required.
  var now = moment()
  let events = checkDate()
  let filtredEvents= []
  events.forEach((element) =>{
    let beforeTime = moment(element.startHour, format)
    //console.log(afterTime.format(format))
    //console.log(moment(afterTime).isBefore(now))
    // console.log(now.isAfter( afterTime))
    if(beforeTime.isAfter( now)) {
      const tmpsite = Site.getById(element.siteID);
      element['latitude'] = tmpsite.latitude;
      element['longitude'] = tmpsite.longitude;
      filtredEvents.push(element)
    }
  });

  filtredEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );

  return filtredEvents;
}

router.get('/today/notstarted', (req, res) => {
  try {
    res.status(200).json(checkTodayNotStarted());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

function checkTodayFinish(){
  var format = 'HH:mm'
// var time = moment() gives you current time. no format required.
  var now = moment()
  let events = checkDate()
  let filtredEvents= []
  events.forEach((element) =>{
    let afterTime = moment(element.endHour, format)
    //console.log(afterTime.format(format))
    //console.log(moment(afterTime).isBefore(now))
   // console.log(now.isAfter( afterTime))
    if(now.isAfter( afterTime)) {
      const tmpsite = Site.getById(element.siteID);
      element['latitude'] = tmpsite.latitude;
      element['longitude'] = tmpsite.longitude;
      filtredEvents.push(element)
    }
  });

  filtredEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );

  return filtredEvents;
}

router.get('/today/finish', (req, res) => {
  try {
    res.status(200).json(checkTodayFinish());
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

  filtredEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );

  let data =[]
  data = data.concat({"title": "Events not started", "data": filtredEvents})

  return data
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
  filtredEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );
  let data = []
  data =data.concat( {"title": "Events already finished", "data": filtredEvents})

  return data
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


function checkRightNow(){
  //https://stackoverflow.com/questions/36197031/how-to-use-moment-js-to-check-whether-the-current-time-is-between-2-times
  var format = 'HH:mm'
// var time = moment() gives you current time. no format required.
  var time = moment()
  let events = checkDate()
  let filtredEvents= []
  events.forEach((element) =>{
    let beforeTime = moment(element.startHour, format)
    let afterTime = moment(element.endHour, format)
   // console.log(beforeTime.format(format))
    //console.log(afterTime.format(format))
    //console.log(time.isBetween(beforeTime, afterTime))
    if(time.isBetween(beforeTime, afterTime)) {
      const tmpsite = Site.getById(element.siteID);
      element['latitude'] = tmpsite.latitude;
      element['longitude'] = tmpsite.longitude;
      filtredEvents.push(element)
    }
  });

  filtredEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );

  return filtredEvents;
}

router.get('/rightnow', (req, res) => {
  try {
    res.status(200).json(checkRightNow());
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

function getFavEvents(){
  let favorites = Favorite.get()
  let favEvents=[]
  favorites.forEach((element)=>{
    let event = Event.getById(element.EventId)
    let tmpsite = Site.getById(event.siteID);
    event['latitude'] = tmpsite.latitude;
    event['longitude'] = tmpsite.longitude;
    favEvents.push(event)
  });

  favEvents.sort(
    (a, b) =>
      new moment(a.date + " " + a.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm") - new moment(b.date + " " + b.startHour,"DD/MM/YYYY HH:mm").format("YYYYMMDDHHmm")
  );

  let data = []
  data = data.concat({"title": "Favorites Events", "data": favEvents})

  return data

}

router.get('/favorites', (req, res) => res.status(200).json(getFavEvents()));

router.post('/favorites', (req, res) => {
  try {
    const fav = Favorite.create(req.body);
    res.status(201).json(fav);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

/*FOR TEST ---> FRONT-BACK-PYTHON*/
router.get('/testing/', (req, res) => {

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

function test(id){
  return Event.getById(id).imagepython

}
router.get('/detection/:id', (req, res) => {

  var spawn = require("child_process").spawn;
 // var image = test(req.params.id)

  var process = spawn("python",["../Video Detection/yolo-object-detection/yolo.py","--image","../Video Detection/yolo-object-detection/images/"+req.params.id+".jpg","--yolo","../Video Detection/yolo-object-detection/yolo-coco"]);

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
