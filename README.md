# Online Shop

## Description

An online shop developed for the Javascript Prameworks Course Assignment.

The application allows users to browse, search and sort products, view product details, manage shopping cart and complete to checkout. It also includes a contact form an a responsive design.

## Live Demo

[View live website](https://noroff-react-shop.netlify.app/)

## Features

- Product listing with original price, discount and rating
- Product details with description, review and tags
- Dynamic product search and sorting
- Shopping cart with quantity adjustment and removal
- Persistent shopping cart
- Toast notifications
- Checkout confirmation
- Contact form with validation
- Responsive design for different screen size

# Built with

- React
- Typescript
- Vite
- React Router
- Zustand
- Lucide React
- CSS
- Noroff API

### Installation

1. Clone reposotory:

```
git clone https://github.com/Foadosman/javascript-frameworks.git
```

2. Navigate to the project folder:

```
cd javascript-frameworks
```

3. Install dependencies:

```
npm install
```

4. Start dev server:

```
npm run dev
```

## AI Usage

Date: 13 November 2026
- Purpose: I kept having typos because og (PascalCase). 
- Outcome: Understanding why React components must start with capital letter and resolving issue with the ProductList component.

Date: 16 November 2026
- Purpose: understanding how to define TypeScript type based in Noroff API and how to use with Reacts Usestate hook.
- Outcome: Recieved explanations and suggestions for creating seperate Protuct type and importing it to Productlist and using it to define the expected structure of the product state.

Date: 24 November 2026
- Purpose: Understanding how Zustand persist middleware works and how to perserve shooping cart state when page in refreshed. 
- Outcome: Recieved explanations and troubleshooting assistance that helped me implement persistent shopping cart state and explanations for how Zustand persist middleware works

Date: 25 November 2026
- Purpose: React.ChangeEvent. (I think this was very clear in the module, but I wanted to doublecheck, this was more of a brainstorm or to just talk to someone…)
- Outcome: Explanations for using React.ChangeEvent and React.FormEvent

Date: 26 November 2026
- Purpose: Understanding why the product listing and product details page require different TypeScript interfaces for the API responses.
- Outcome: Recieved explanations for creating a separate SingeProductApiResponse interface using it to type the API response for product details page.

Date: 26 november 2026
- Purpose: Finding a solution to ensure that removal notification is displayed when product changed from one to zero. (I’m honestly gonna say that I didn’t need to use AI here, but my brain was cooked)
- Outcome: Recieved explenation and suggestion for ceonnection already existing removal function.

Date: 28 November 2026
- Purpose: Troubleshooting 404 code error that occured when refreshin a pages after deploying to netlify.
- Outcome: Revieced suggestion to create a _redirects file, after reviewing course material for a long time and couldn’t find any spesific solution.
