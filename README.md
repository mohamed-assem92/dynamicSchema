# dynamicSchema

#### The aim is to create dynamic Form mongoose schema at run time depending on JsonSchema

## Usage

### clone project at your machine

### install dependencies

```
npm install
```
### run mongoDB server

```
mongod
```
### run NodeJS server

```
npm start
```

### use the following route to insert new JSONSchema which will lead to mongoose schema and form schema :

```
method POST: localhost:9090/form
```
#### body object should be as following :
```
{
	"id": "Login",
	"type": "object",
    "properties": {
      "name":{"type":"string"},
      "phone":{"type":"integer"}
    },
    "required": ["name"]
}
```
##### id: is the name of the form you should memorize it to render it when ever you want
##### type: should be an object always
##### properties: it's an object which contains the fields you want to have in the form
##### required: it's an array of string represent the fields which you want it to be required

### use the following route to get form inserted before :

```
method GET: localhost:9090/form/{id}
id = Login or the the name you have created the JSONSchema with
```
##### the result JSON should be used in front-end to render the form

### use the following route to edit exist schema
```
method PUT: localhost:9090/form/{id}
id = Login or the the name you have created the JSONSchema with
```
#### body object should be as following :
```
{
	"id": "Login",
	"type": "object",
    "properties": {
      "name":{"type":"string"},
      "phone":{"type":"integer"}
    },
    "required": ["name","phone"]
}
```

### use the following route to insert in DataBase using existed schema
```
method POST: localhost:9090/submit/{id}
id = Login or the the name you have created the JSONSchema with
```
#### body object should be as following :
```
{
	"name":"Assem",
	"phone":+2015476545,
	"email":"example@example.com"
}
Note: email field is not defined in the schema so it will not added to the saved object
```
