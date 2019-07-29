# flatlist-pagination

Implementation based on this article - https://medium.com/p/149a5aab111d.

Per some request I added the whole code to reproduce the component.

I changed quite a few things, though. First of all, `Paginator` component is now made on hooks, since it faster and I just like it better. Second important update - the component from article would only swipe if pull it fast enough, i.e. if `velocity.x` is greater than 0. In some cases, user might swipe really, though moving the element (almost) completely off the screen - for that purpose I added `viewabilityConfig` prop to handle cases where swipe is slow, but component is partially off-screen.
```
const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 50,
};
```
To not mess with the speed, I also included speed check, so if user actually swipes fast enough but on a small range - if a speed is larger that 1 (or smaller that -1*), then view centeres on next right (left) component.



*That's applicable to iOS, Android is the opposite (though Android case is still settled).
