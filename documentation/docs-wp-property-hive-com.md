[Developer information](https://docs.wp-property-hive.com/category/32-developer-information) \> REST API

# REST API

In this article:

- [Retrieving Properties](https://docs.wp-property-hive.com/article/58-rest-api#heading-0)
- [Creating and Updating Properties](https://docs.wp-property-hive.com/article/58-rest-api#heading-1)
- [Retrieving Offices](https://docs.wp-property-hive.com/article/58-rest-api#heading-2)
- [Retrieving Enquiries](https://docs.wp-property-hive.com/article/58-rest-api#heading-3)
- [Creating and Updating Enquiries](https://docs.wp-property-hive.com/article/58-rest-api#heading-4)

Property Hive extends the standard [WordPress REST API](https://developer.wordpress.org/rest-api/) by allowing you to query, create, update and delete properties by making HTTP requests to WordPress.

To get started we recommend you get familiar with the core principles of the WordPress REST API, including [authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/), [pagination](https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/) etc.

## Retrieving Properties

To query properties in their most basic form you can make a HTTP GET request to the following URL:

```
https://{your-site.com}/wp-json/wp/v2/property
```

This will return all on market properties.

You can filter the properties returned by passing in the same parameters used on a standard property search on the website. For example:

```
https://{your-site.com}/wp-json/wp/v2/property?department=residential-lettings
```

or

```
https://{your-site.com}/wp-json/wp/v2/property?department=residential-sales&minimum_bedrooms=2
```

Don't forget that results returned will be paginated by default. Read more about [pagination here](https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/) in the WP REST API docs.

## Creating and Updating Properties

You can also create and update properties using Property Hive and making HTTP POST requests to WordPress REST API.

You'll need to authenticate to perform such actions. Read more about [authentication here](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/) in the WP REST API docs.

A simple example of a POST request to update an existing property would look something like so:

```
POST https://{your-site.com}/wp-json/wp/v2/property/243328 HTTP/1.1
Content-Type: application/json
Authorization: Basic {application-password}

{"title":"High Street, Birmingham","status":"publish","on_market":"yes","department":"residential-sales","address_country":"GB","price":123000,"features":["poolside","fireplace"],"virtual_tours":[{"url":"https:\/\/youtube.com","label":"VT1"},{"url":"https:\/\/vimeo.com","label":"VT2"}],"images":[{"url":"https:\/\/imageurl.com\/image1.jpg"},{"url":"https:\/\/imageurl.com\/image2.jpg"}]}
```

## Retrieving Offices

To query offices you can make a HTTP GET request to the following URL:

```
https://{your-site.com}/wp-json/wp/v2/office
```

This will return all offices.

## Retrieving Enquiries

To query enquiries you can make a HTTP GET request to the following URL:

```
https://{your-site.com}/wp-json/wp/v2/enquiry
```

Note that due to the sensitive nature of enquiries these are not publicly available by default. As a result you will need to make an [authenticated request](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/) by also passing in authentication details as part of your request.

## Creating and Updating Enquiries

You can also create and update enquiries using Property Hive and making HTTP POST requests to WordPress REST API.

You'll need to authenticate to perform such actions. Read more about [authentication here](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/) in the WP REST API docs.

A simple example of a POST request to update an existing enquiry would look something like so:

```
POST https://{your-site.com}/wp-json/wp/v2/enquiry/13212 HTTP/1.1
Content-Type: application/json
Authorization: Basic {application-password}

{"title":"Enquiry about High Street, Birmingham from Mr Smith","status":"publish","office_id":"123","source":"website","name":"Mr Smith","email_address":"mrsmith@gmail.com","telephone_number":"0123456789","message":"I would like to know more about this property","property_id":["1324","4323"]}
```

Last updated on November 25, 2025

No results found