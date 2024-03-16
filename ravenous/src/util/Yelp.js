require('dotenv').config()
const apiKey = process.env.API_KEY;

export let Yelp = {}

Yelp.search = function(term,location,sortBy){
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
    }).then((response) => {return response.json()}).then((jsonResponse) => {
        if(Array.isArray(jsonResponse?.businesses) && jsonResponse?.businesses?.length){
            const data = jsonResponse.businesses.map((business) => {
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count

                }
            })
            console.log(data,jsonResponse.businesses);
            return data
        }
        else{
            return []
        }
    }).catch((err) => {
        console.log(err,'any errors')
    })
}