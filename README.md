<a name="readme-top"></a>

# <a href="https://kitchenpos.netlify.app/">Restaurant Point of sale App</a>

## Overview

"Kitchen POS" is a point of sale application for restaurants, designed to simplify the process of order taking, while streamlining communication between the server in the front of house, and the chefs in the kitchen. I built this app to work in conjunction with a kitchen display application<a href="https://github.com/Fishamble/kitchen_back_end">(Github)</a>, which is an app for orchestrating the various sections of a commercial kitchen, such that orders are displayed, timed and prepared in a logical, sequential manner. The app provides a timeline, which arranges the orders depending on the station(grill, fry), so that each chef can, at a glance, determine which item they should be preparing, if there are any modifications to the ingredients and the remaining time before the order should be sent.

### How to use

Both apps are deployed on netlify. First open the <a href="https://kitchenpos.netlify.app/">POS app</a>, select a table and add some orders. Optionally you can customise the order with extra ingredients before sending it through to the kitchen.
Following this you can open the <a href="https://kitchendisplay.netlify.app/">kitchen display app</a>, where you can view all the open orders along a timeline.
Note: While the POS app was designed for mobile, the display app requires a **larger screen** to display correctly.

## Built with

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

My primary objective while developing this project was to expand my knowledge around Redux and how it can be used to manage complex state in React applications. I developed my understanding of the Redux architecture, including its core principles, such as state management, immutability, and reducers.
Other objective included reinforcing my prior understanding of reacts core concepts, such as components, state, props, and lifecycle methods.

I am satisfied I achieved my initial learning goals, however, I also gained an appreciation and rudimentary understanding of the concepts
around data modeling, software architecture and the importance of initial design in facilitating the evolution of the software as requirements changed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<span>
    <a href="https://kitchenpos.netlify.app/">
      <img src="https://github.com/Fishamble/kitchenpos/blob/master/src/Assets/KitchenPOS.jpg?raw=true" alt="POS" width="200px" />      
    </a>
    <br>
</span>

<span>
<iframe src="[https://www.youtube.com/embed/aFnXjlkPwfc](https://youtu.be/vgQ1oEJDxEU)" height="300px" width="450" allowfullscreen></iframe>
</span>

<!-- CONTACT -->

## Contact

John Paul Larkin - johnplarkin@gmail.com

## Links

<a href="https://github.com/Fishamble/kitchen_back_end">Kitchen display Github</a>

<a href="https://kitchendisplay.netlify.app/">Display deployed Netlify link</a>

<a href="https://github.com/Fishamble/kitchenpos">Kitchen POS Github</a>

<a href="https://kitchenpos.netlify.app/">POS deployed Netlify link</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Bugs/Refactors

I encountered one perplexing bug during the projet. The issue involved the countdown timers, which would all reset to zero every time a new order was added. The components containing the stopwatch were children of a component which was conditionaly rendered, based on a boolean state. I mistakenly believed tht the key would identify the element on the DOM, however the issue was that the component unmounted and remounted each time an order was added to the array. With the remount the components would be loaded fresh and the timer would restart. I fixed the issue by using css toggle the display on and off, rather than coditionally mounting to the DOM.

I originally employed the inbuilt useContext and useReducer hooks for state managaement. With time the application state became increasingly complex and the reducer grew to include numerous switch cases and reducer functions. I also realised that I had broken a cardinal rule, in that my reducer functions were not pure and thus could result in side effects. Despite this the program continued to work as expected, however I decided to refactor the state managememnt to implement redux, which allowed me to break the reducer into mutiple seperate slices, making for more readable, predictable and expandable code.

Issue with timer not syncing up. Originally I utitilised Date objects to store times when orders would change status. This resulted in issues as non-serialized data should not be used in a redux reducer. To fix the issue I switchedto to saving the time as timestamps instead.

// scroll overflow affected by flex end
// custom hooks
// mutltiple states/reducers for orderdetails etc
// how to handle edits
// Fixed bug in which default food item would not toggle selected on the open orders array



designed so chef only clicks twice. once when they are finished preparing. again when the order is ready.
click on each station to highlight the items 
hover on closed orders to reveal details

