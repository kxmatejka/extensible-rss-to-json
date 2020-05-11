# Extensible rss to json

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

- zero dependencies for web (based on DOMParser)
- full customizable

## Validation of feed

https://validator.w3.org/feed/
