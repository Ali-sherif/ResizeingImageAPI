
# Image Resizing API

This Application used for resizing image to specific dimensions



## Installation

Install all dependencies and dev dependencies

```bash
  npm install 
```
    
## Run Locally

To build type script files, run the following command

```bash
  npm run build
```

To run tests, run the following command

```bash
  npm run jasmine
```

To build type script files and to run tests by one command, run the following command 

```bash
  npm run test
```

 To enforces a consistent style that import from .prettierrc.json and .eslintrc.json files

```bash
  npm run prettier

  npm run lint
```



Start the server

```bash
  npm run start
```



## API Reference

#### Get all information about api

```http
  GET /
```



####  Resizing an image

```http
  GET /api/image?filename='image_name'&width=number&height=number
```

| Query item | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `filename`      | `string` | **Required**. name of image |
| `width`      | `number` | **Required**. width of image |
| `height`      | `number` | **Required**. height of image |





## Features

- Resizing Images
- if image already it  will retrive it without reprocessed it again 


## Tech Stack

**Client:** Browser

**Server:** Node, Express

