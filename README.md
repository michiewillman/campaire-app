# Air Quality Camping Application

## User Story

```
AS someone who likes to camp in the pacific northwest,
I WANT an application that measures the air quality of a location and suggests nearby campsites if the air quality is good enough
SO THAT I can plan to camp in an area with clean air.
```

## Acceptance Criteria

```
GIVEN an air quality dashboard with a form input
WHEN I input a zip code,
THEN I am given the zip codes's current air quality.
WHEN there is good enough air quality in the area,
THEN I am presented with a list of 5 nearby campgrounds within a given distance.
WHEN The air quality is not good enough in my own zip code,
THEN I am presented with a list of the next-closest campgrounds in other zip codes.
WHEN I click on a listed campground,
THEN I am directed to its Google-listed website for more information.
WHEN There are not any zip codes within the set distance with good enough air quality,
THEN I am presented with a message telling me that I should not go camping at all.
```
