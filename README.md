# giftplush

This is a demo tutorial of all the technologies I have used so far in Angular 4.

To start using this project you should have Node.js installed. If not visit [Node Download Page](https://nodejs.org/en/download/).

After setting up your Node Package Manager (NPM).

Come back to this project, in the root of this project do
```
npm install
```
it will install all the necessary packages.

# Technologies

1. Algolia Instantsearch.js.
2. Paystack Inline.
3. Cloudinary.
4. Firebase.

## Algolia Instantsearch.js

This is responsible for the searches. It is awesome.
It helps with indexing your searches and producing a very responsive list.

It has features like

* Realtime Searching
* Search Analytics
* Indexing
* Textual relevance
* Security
* Search UI

I implemented the Algolia Instantsearch.js in the [Select Voucher Page](https://github.com/sirbootoo/giftplush/blob/master/src/app/_components/pick/selectvoucher.component.ts)

You can visit their website to find out more about [Algolia Instantsearch.js](https://www.algolia.com/)
 
 
 ## Paystack Inline
 
 This is a Nigerian start-up which is also operating in the states. Mad right ?
 
 It is a payment platform which is incredibly easy to use. Although they stole some concepts from STRIPE but mehn they sure made it work very well. Their easy to integrate system made them my personal favourite and in this tutorial I used their payment platform in the [Pick Placeholder page](https://github.com/sirbootoo/giftplush/blob/master/src/app/_components/pick/placeorder.component.ts). You can visit their website to know more about this. [Paystack](https://www.Paystack.com).
 
 The library is imported using the html script tag but the script tag is created in [PlaceOrder Component](https://github.com/sirbootoo/giftplush/blob/master/src/app/_components/pick/placeorder.component.ts).
