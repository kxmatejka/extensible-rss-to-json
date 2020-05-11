# Extensible rss to json

- Zero dependencies in web environment (based on DOMParser)
- Fully customizable

## How it works

It will create a json structure from rss feed.

This will be converted
```xml
<rss>
    <channel>
        <title>My rss</title>
        <item>
            <title>Lorem ipsum</title>
            <link>https://my-domain.com/lorem-ipsum</link>
            <enclosure url="https://my-domain.com/lorem-ipsum-small.jpg" length="12210" type="image/jpg"/>
            <enclosure url="https://my-domain.com/lorem-ipsum-big.jpg" length="67797135" type="image/jpg"/>
        </item>
        <item>
            <title>Obscure Latin words</title>
            <link>https://my-domain.com/obscure-latin-words</link>
        </item>
    </channel>
</rss>
```

To this
```json
{
  "title": [
    {
      "textContent": "Lorem ipsum"
    }
  ],
  "item": [
    {
      "title": [
        {
          "textContent": "Lorem ipsum"
        }
      ],
      "link": [
        {
          "textContent": "https://my-domain.com/lorem-ipsum"
        }
      ],
      "enclosure": [
        {
          "url": "https://my-domain.com/lorem-ipsum-small.jpg",
          "length": "12210",
          "type": "image/jpg"
        },
        {
          "url": "https://my-domain.com/lorem-ipsum-big.jpg",
          "length": "67797135",
          "type": "image/jpg"
        }
      ]
    },
    {
      "title": [
        {
          "textContent": "Obscure Latin words"
        }
      ],
      "link": [
        {
          "textContent": "https://my-domain.com/obscure-latin-words"
        }
      ]
    }
  ]
}
```

Then combination of standard parser based on [specification](https://validator.w3.org/feed/docs/rss2.html) and custom parser
transforms that json structure to more user friendly format

- Parser will travers of each his own key
- If key exists in rss then will call that function
- Result of function will be merged to the resulting structure

```
import parser from 'extensible-rss-to-json'

const parser = createParser()
const feed = parser(rss, {
    image: (nodes) => ({
        image: {
            title: nodes[0].title[0].textContent,
            url: nodes[0].url[0].textContent
        }
    })
})
```

And final structure can be for example
```json
{
  "title": "Lorem ipsum",
  "image": {
    "title": "Main image",
    "url": "https://my-domain.com/logo.jpg"
  },
  "items": [
    {
      "title": "Lorem ipsum",
      "url": "https://my-domain.com/lorem-ipsum",
      "images": [
        {
          "url": "https://my-domain.com/lorem-ipsum-small.jpg"
        },
        {
          "url": "https://my-domain.com/lorem-ipsum-big.jpg"
        }
      ]
    },
    {
      "title": "Obscure Latin words",
      "url": "https://my-domain.com/obscure-latin-words",
      "images": []
    }
  ]
}
```

## Validation of feed

https://validator.w3.org/feed/
