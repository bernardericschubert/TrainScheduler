# TrainScheduler

### Overview

In this assignment, I created a train schedule application that incorporates Firebase to host arrival and departure data. The app retrieves and manipulates this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

### Details

* The app suits this basic spec:

* When adding trains, administrators should be able to submit the following:

* Train Name

* Destination 

* First Train Time -- in military time

* Frequency -- in minutes

* The app calculates when the next train will arrive relative to curren ttime.

* Users from many different machines must be able to view same train times. - aka, storage cannot be local
