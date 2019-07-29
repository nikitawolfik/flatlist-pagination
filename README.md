# flatlist-pagination

Implementation based on this article - https://medium.com/p/149a5aab111d.

Hooks added since it's faster. Some logic made simpler and changed to automatically bounce back and forth while changing viewability. Hence with 
```
const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 50,
};
```
Flatlist automatically scrolls to item whoch covers 50%+ of the view.
