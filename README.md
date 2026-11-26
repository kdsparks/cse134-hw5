# CSE 134 HW 5

## SSG Exercise
`/ssg-exercise`

Preview `about` and `contact` pages:

`ssg-exercise/src/pages/about.astro` and `ssg-exercise/src/pages/contact.astro`

## Design Note

A visitor may wish to view a new fun fact. The visitor will view the home page, scroll to the fun fact component if it is below the fold, and press the button labeled with "Tell me a fun fact" to view a new fun fact. The click event listener for the fun fact control button will attempt to load a random fact, fetching a fact from the useless facts API. While waiting, the fun fact status element will display "Loading fun fact..." and the "Tell me a fun fact" will be temporarily disabled. On success, the visitor will see the random fun fact returned by the API and the button will be re-enabled. If the request fails, the visitor will see "Oops! We couldn't a fun enough fact, please try again" in the status, and be able to click the button again as it has been re-enabled.