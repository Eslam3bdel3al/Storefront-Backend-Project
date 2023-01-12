# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index ('/products'[GET])
- Show ('/product/:id'[GET])
- Create [token required] ('/product'[POST])
- [OPTIONAL] Top 5 most popular products ('/top_five' [GET])
- [OPTIONAL] Products by category (args: product category) ('/category_products/:category_id'[GET])

#### Users

- Index [token required] ('/users'[GET])
- Show [token required] ('/profile'[GET])
- Create N[token required] ('/user'[POST])
- Login ('/login'[POST])

#### Orders

- Current Order by user (args: user id)[token required] ('/active_ord'[GET])
- [OPTIONAL] Completed Orders by user (args: user id)[token required] (/completed_orders'[GET])
- Create an order ('/order'[POST])
- add product to an order ('/product_addition'[POST])

#### Categories

- Index ('/categories'[GET])
- Show ('/category/:id'[GET])
- Create (''/category''[POST])

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### order_products

- id
- quantity required of the product
- order_id
- product_id

## Database Schema

#### Users

    users (id: number [primary key], first_name: varchar, last_name: varchar, user_name: varchar, password_digest varchar)

#### Categories

    categories (id: number [primary key], category_name varchar)

#### Products

    products (id: number [primary key], product_name varchar, product_price number, category_id number [foreign key to Categorie table])

#### Orders

    orders (id number [primary key], user_id number [foreign key to Users table] ,order_status stat)
    stat type Enum ('active', 'complete')

#### Order_products

    order_products (id number [primary key], quantity number ,order_id number [foreign key to orders table], product_id number [foreign key to products table])
