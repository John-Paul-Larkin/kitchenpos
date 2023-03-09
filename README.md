# <a href="https://kitchenpos.netlify.app/">Restaurant Point of sale App</a>

### Overview

"Kitchen POS" is a point of sale application for restaurants, designed to simplify the process of order taking, while streamlining communication between the server in the front of house, and the chefs in the kitchen. I built this app to work in conjunction with a kitchen display application, which is an app for orchestrating the various sections of a commercial kitchen, such that orders are displayed, timed and prepared in a logical, sequential manner. The app provides a timeline, which arranges the orders depending on the station(grill, fry), so that each chef can, at a glance, determine which item they should be preparing, if there are any modifications to the ingredients and the remaining time before the order should be sent.

#### How to use
Both apps are deployed on netlify. First open the <a href="https://kitchenpos.netlify.app/">POS app</a>, select a table and add some orders. Optionally  you can customise the order with extra ingredients before sending it through to the kitchen.
Following this you can open the <a href="https://kitchendisplay.netlify.app/">kitchen display app</a>, where you can view all the open orders along a timeline.

<a href="https://github.com/Fishamble/kitchen_back_end">Kitchen display Github</a>

#### Tech-stack

<table>
  <thead>
    <tr>
        <th>Typescript</th>
        <th>Firebase</th>
        <th>React</th>
        <th>Redux</th>
        <th>Framer-motion</th>          
    </tr>
  </thead>
</table>

### Image

<h2 align="center">
    <a href="https://kitchenpos.netlify.app/">
      <img src="https://github.com/Fishamble/kitchenpos/blob/master/src/Assets/KitchenPOS.jpg?raw=true" alt="POS" width="200px" />      
    </a>
    <br>
</h2>









// issues bugs



// conditional rendering of components with timers resetting
// scroll overflow affectedd by flex end
// custom hooks

mutltiple states/reducers for orderdetails etc
how to handle edits

issue with timer not syncing up.
non serialized data in a redux reducer

Fixed bug in which default food item would not toggle selected on open orders array


